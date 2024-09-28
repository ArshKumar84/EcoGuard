from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
from sentinelhub import SHConfig, SentinelHubRequest, BBox, CRS, DataCollection, MimeType
import cv2
import base64
from geopy.geocoders import Nominatim
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

origins = [
    "http://localhost:3000",
    # Allow your Next.js app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load the trained machine learning model for deforestation percentage
clf = joblib.load('./deforestation_percentage_model.joblib')

# Configure Sentinel Hub API
config = SHConfig()
config.sh_client_id = 'a14c2ad8-e87d-42c4-be03-44d993bd8729'  # Replace with your client ID
config.sh_client_secret = 'JGnPUfQwhncd95KeDtEfy3a1rzXVGK3u'  # Replace with your client secret

# Input data structure for the API
class DeforestationRequest(BaseModel):
    area_name: str  # Changed from country_name to area_name to make it more flexible

# Function to geocode area and get latitude and longitude
def geocode_area(area_name):
    geolocator = Nominatim(user_agent="deforestation_app")
    location = geolocator.geocode(area_name)
    if location:
        return location.latitude, location.longitude
    else:
        raise HTTPException(status_code=400, detail="Area not found")

# Function to fetch satellite image
def fetch_satellite_image(latitude, longitude):
    # Define bounding box coordinates (latitude, longitude)
    # Adjust the bounding box to cover a larger area for a zoomed-out effect
    bbox = BBox([longitude - 0.1, latitude - 0.1, longitude + 0.1, latitude + 0.1], CRS.WGS84)

    # Define request parameters
    evalscript = """
        // Returns true color image (RGB) from Sentinel-2
        return [B04, B03, B02];
    """
    request = SentinelHubRequest(
        evalscript=evalscript,
        input_data=[SentinelHubRequest.input_data(
            data_collection=DataCollection.SENTINEL2_L1C,
            time_interval=('2024-01-01', '2024-01-10'),  # Adjust time interval as needed
        )],
        responses=[SentinelHubRequest.output_response('default', MimeType.PNG)],
        bbox=bbox,
        size=[1024, 1024],  # Increase image size for better resolution
        config=config
    )
    # Execute the request
    image = request.get_data()[0]  # Extract the first image from the list
    return image

# Function to normalize the image
def normalize_image(image_array):
    min_val = np.min(image_array)
    max_val = np.max(image_array)
    normalized_image = (image_array - min_val) * (255.0 / (max_val - min_val))
    return normalized_image.astype(np.uint8)

# Function to extract green density from the satellite image
def extract_green_density(image_array):
    hsv = cv2.cvtColor(image_array, cv2.COLOR_RGB2HSV)
    green_channel = hsv[:, :, 0]
    green_channel = green_channel[(green_channel >= 40) & (green_channel <= 80)]
    green_density = np.mean(green_channel) if green_channel.size > 0 else 0
    return green_density

# Function to calculate the percentage of deforestation
def calculate_deforestation_percentage(image_array):
    # Extract green density feature
    green_density = extract_green_density(image_array)
    
    # Predict deforestation percentage using the trained model
    prediction = clf.predict(np.array([[green_density]]))[0]
    
    # Ensure the result is a valid percentage
    return max(0, prediction)

# Helper function to convert image to base64
def encode_image(image_array):
    _, buffer = cv2.imencode('.png', image_array)
    return base64.b64encode(buffer).decode('utf-8')

# POST endpoint to detect deforestation and calculate the percentage
@app.post("/deforestation")
def predict_deforestation(request: DeforestationRequest):
    try:
        # Fetch latitude and longitude from the area name
        latitude, longitude = geocode_area(request.area_name)
        
        # Fetch the satellite image for the area
        satellite_image = fetch_satellite_image(latitude, longitude)
        
        # Normalize the image
        satellite_image = normalize_image(satellite_image)
        
        # Predict deforestation percentage using the model
        deforestation_percentage = calculate_deforestation_percentage(satellite_image)
        
        # Encode the satellite image to base64 for the response
        encoded_image = encode_image(satellite_image)
        
        # Return the result
        if deforestation_percentage > 40:
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

# Run the application using Uvicorn
# Use the following command in the terminal to run the server:
# uvicorn main:app --reload

