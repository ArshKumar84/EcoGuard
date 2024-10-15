
import pandas as pd
import numpy as np
import cv2
import joblib


from sklearnex.ensemble import RandomForestRegressor 
from sklearnex import patch_sklearn  
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler


patch_sklearn()

df = pd.read_csv('dataset.csv')


def extract_green_density(image_path):
    img = cv2.imread(image_path)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    green_channel = hsv[:, :, 0]
    green_channel = green_channel[(green_channel >= 40) & (green_channel <= 80)]
    green_density = np.mean(green_channel) if green_channel.size > 0 else 0
    return green_density


def calculate_deforestation_percentage(green_density):
    max_green_density = 100  
    return max(0, 100 - (green_density / max_green_density * 100))

df['green_density'] = df['filename'].apply(lambda x: extract_green_density(x.replace('train\\', 'train/')))


df['deforestation_percentage'] = df['green_density'].apply(calculate_deforestation_percentage)


X = df[['green_density']]  
y = df['deforestation_percentage']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)



scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


regressor = RandomForestRegressor(n_estimators=100, random_state=42)
regressor.fit(X_train_scaled, y_train)


y_pred = regressor.predict(X_test_scaled)


mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse:.3f}')


joblib.dump(regressor, 'deforestation_percentage_model_intel_1.joblib')

