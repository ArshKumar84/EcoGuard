
import pandas as pd
import numpy as np
import cv2
import joblib

# Import Intel oneDAL optimized versions of sklearn
from sklearnex.ensemble import RandomForestRegressor  # Optimized RandomForest
from sklearnex import patch_sklearn  # oneDAL patch for sklearn
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Patch scikit-learn to use oneDAL optimized algorithms
patch_sklearn()

# Load dataset
df = pd.read_csv('dataset.csv')

# Function to extract green density from image using OpenCV
def extract_green_density(image_path):
    img = cv2.imread(image_path)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    green_channel = hsv[:, :, 0]
    green_channel = green_channel[(green_channel >= 40) & (green_channel <= 80)]
    green_density = np.mean(green_channel) if green_channel.size > 0 else 0
    return green_density

# Function to calculate deforestation percentage based on green density
def calculate_deforestation_percentage(green_density):
    max_green_density = 100  
    return max(0, 100 - (green_density / max_green_density * 100))

# Apply green density extraction function to the dataset
df['green_density'] = df['filename'].apply(lambda x: extract_green_density(x.replace('train\\', 'train/')))

# Apply deforestation percentage calculation to the dataset
df['deforestation_percentage'] = df['green_density'].apply(calculate_deforestation_percentage)

# Split data into features (X) and labels (y)
X = df[['green_density']]  
y = df['deforestation_percentage']

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Data preprocessing (optional): Scaling (recommended with oneDAL for efficiency)
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Initialize and train the RandomForestRegressor using oneDAL optimizations
regressor = RandomForestRegressor(n_estimators=100, random_state=42)
regressor.fit(X_train_scaled, y_train)

# Predict on the test set
y_pred = regressor.predict(X_test_scaled)

# Calculate Mean Squared Error (MSE)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse:.3f}')

# Save the trained model
joblib.dump(regressor, 'deforestation_percentage_model_intel_1.joblib')

