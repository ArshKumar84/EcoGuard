from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
from sentinelhub import SHConfig, SentinelHubRequest, BBox, CRS, DataCollection, MimeType
import cv2
import base64
from geopy.geocoders import Nominatim
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

origins = [
    "http://ecoguard-522e.onrender.com",
    "https://ecoguard-522e.onrender.com",
    "http://localhost:3000",
     "https://localhost:3000",
    "https://eco-guard-ten.vercel.app",
    "http://eco-guard-ten.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)


clf = joblib.load('./deforestation_percentage_model_intel_1.joblib')


config = SHConfig()
config.sh_client_id =os.getenv('SENTINENTAL_ID')
config.sh_client_secret =os.getenv('SENTINENTAL_PASS')


class DeforestationRequest(BaseModel):
    area_name: str  


def geocode_area(area_name):
    geolocator = Nominatim(user_agent="deforestation_app")
    location = geolocator.geocode(area_name)
    if location:
        return location.latitude, location.longitude
    else:
        raise HTTPException(status_code=400, detail="Area not found")


def fetch_satellite_image(latitude, longitude):
    bbox = BBox([longitude - 0.1, latitude - 0.1, longitude + 0.1, latitude + 0.1], CRS.WGS84)

    evalscript = """
        // Returns true color image (RGB) from Sentinel-2
        return [B04, B03, B02];
    """
    request = SentinelHubRequest(
        evalscript=evalscript,
        input_data=[SentinelHubRequest.input_data(
            data_collection=DataCollection.SENTINEL2_L1C,
            time_interval=('2024-01-01', '2024-01-10'),  
        )],
        responses=[SentinelHubRequest.output_response('default', MimeType.PNG)],
        bbox=bbox,
        size=[1024, 1024],  
        config=config
    )
    
    image = request.get_data()[0]  
    return image


def normalize_image(image_array):
    min_val = np.min(image_array)
    max_val = np.max(image_array)
    normalized_image = (image_array - min_val) * (255.0 / (max_val - min_val))
    return normalized_image.astype(np.uint8)


def extract_green_density(image_array):
    hsv = cv2.cvtColor(image_array, cv2.COLOR_RGB2HSV)
    green_channel = hsv[:, :, 0]
    green_channel = green_channel[(green_channel >= 40) & (green_channel <= 80)]
    green_density = np.mean(green_channel) if green_channel.size > 0 else 0
    return green_density


def calculate_deforestation_percentage(image_array):
    
    green_density = extract_green_density(image_array)
    
    
    prediction = clf.predict(np.array([[green_density]]))[0]
    
   
    return max(0, prediction)


def encode_image(image_array):
    _, buffer = cv2.imencode('.png', image_array)
    return base64.b64encode(buffer).decode('utf-8')


@app.post("/deforestation")
def predict_deforestation(request: DeforestationRequest):
    try:
        
        latitude, longitude = geocode_area(request.area_name)
        
        
        satellite_image = fetch_satellite_image(latitude, longitude)
        
        
        satellite_image = normalize_image(satellite_image)
        
        
        deforestation_percentage = calculate_deforestation_percentage(satellite_image)
        
        
        encoded_image = encode_image(satellite_image)
        
        
        if deforestation_percentage > 20:
            return {
                "message": "Deforestation detected",
                "deforestation_percentage": f"{deforestation_percentage:.2f}",
                "satellite_image": f"data:image/png;base64,{encoded_image}"
            }
        else:
            return {
                "message": "No deforestation detected",
                "deforestation_percentage": "0",
                "satellite_image": f"data:image/png;base64,{encoded_image}"
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

