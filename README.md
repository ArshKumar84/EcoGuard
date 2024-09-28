**EcoGuard**

**Overview:**
EcoGuard is an innovative application aimed at promoting environmental consciousness by monitoring deforestation and supporting reforestation efforts. It leverages satellite imagery analysis to provide users with insights into deforestation percentages, while also offering features such as real-time weather updates, air quality information, and a marketplace for eco-friendly products.

**Features:**
1. **Home Page:** 
   - Displays real-time weather data and the Air Quality Index (AQI).
   - Showcases live environmental alerts and the total number of trees planted through EcoGuard’s initiatives.
   - Users can access news, blogs, and donation options via a sidebar.

2. **Deforestation Detection:** 
   - Integrates interactive satellite maps to visualize deforested areas.
   - Users can search for specific locations to view deforestation statistics.
   - Utilizes the Sentinel Hub API alongside EcoGuard's AI model to analyze satellite images.

3. **Marketplace:** 
   - Provides a platform for purchasing eco-friendly products.
   - Features a nature-themed payment page with secure payment options, including UPI.

4. **Social Section:** 
   - Facilitates user connections for sharing stories and experiences related to reforestation and environmental protection.

5. **User Profile:** 
   - Displays user information including name, username, location (area, district, state, country), and the number of trees planted.

6. **News Section:** 
   - Offers updates on environmental news, reforestation efforts, and global sustainability projects.

7. **OTP Verification:** 
   - Ensures secure access for sensitive actions like payments and profile settings.

**Tech Stack:**
- **Frontend:** HTML, Tailwind CSS, JavaScript, Next.js framework.
- **Backend:** Java, Spring Boot framework.
- **Database:** MySQL.
- **AI Model:** A pre-trained model that analyzes satellite images to calculate deforestation percentages based on user-specified locations.
- **APIs:** 
  - **Sentinel Hub API:** For retrieving satellite data.
  - **NewsAPI:** For accessing environmental news.
  - **OpenWeatherMap API:** For current weather and AQI data.
  - **FastAPI:** To serve the AI model that predicts deforestation percentages.

**Installation Instructions:**
1. **Clone the Repository:**
   - Use the following command to clone the repository:
     ```
     git clone https://github.com/ArshKumar84/EcoGuard.git
     ```
   - Navigate into the project directory:
     ```
     cd EcoGuard
     ```

2. **Frontend Setup:**
   - Go to the frontend directory:
     ```
     cd Front-end
     ```
   - Ensure you have Node.js installed, then install dependencies:
     ```
     npm install
     ```
   - Start the frontend application:
     ```
     npm run dev
     ```

3. **Backend Setup:**
   - Navigate to the backend directory:
     ```
     cd Back-end
     ```
   - Ensure you have Java and Maven installed, then run the application:
     ```
     mvn spring-boot:run
     ```

4. **Accessing the Application:**
   - Open your web browser and go to `http://localhost:3000` to access the application.

**Running the AI Model:**
1. **Setting Up the AI Model:**
   - Ensure you have Python installed along with FastAPI and other required libraries. Install them using:
     ```
     pip install fastapi uvicorn joblib numpy opencv-python sentinelhub geopy
     ```

2. **Starting the FastAPI Server:**
   - Navigate to the directory containing the FastAPI script (`deforestation_percentage_image_api.py`):
     ```
     cd "Ai model"
     ```
   - Run the FastAPI server:
     ```
     uvicorn deforestation_percentage_image_api:app --reload
     ```

3. **Interacting with the API:**
   - The FastAPI server will be available at `http://127.0.0.1:8000`.
   - Send a POST request to the `/deforestation` endpoint to get the deforestation percentage and satellite image. You can use a tool like `curl` or Postman. Here’s how to use `curl`:
     ```
     curl -X POST "http://127.0.0.1:8000/deforestation" -H "Content-Type: application/json" -d '{"area_name": "<your_area_name>"}'
     ```
   - Replace `<your_area_name>` with the name of the area you want to analyze.

4. **Response from the API:**
   - The API will return a JSON response containing the deforestation percentage and the satellite image in base64 format. For example:
     ```json
     {
       "message": "Deforestation detected",
       "deforestation_percentage": "45.50",
       "satellite_image": "data:image/png;base64,<base64_encoded_image>"
     }
     ```
   - If no deforestation is detected, the response will look like this:
     ```json
     {
       "message": "No deforestation detected",
       "deforestation_percentage": "0",
       "satellite_image": "data:image/png;base64,<base64_encoded_image>"
     }
     ```

**Usage:**
- Utilize the EcoGuard application to monitor environmental changes and participate in reforestation efforts. Engage with community features to share experiences and access the marketplace for sustainable products. The FastAPI service allows for quick analysis of deforestation in specified locations.

**Contributing:**
Contributions to EcoGuard are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature.
3. Make changes and commit them.
4. Push to your branch.
5. Open a pull request.

**License:**
This project is licensed under the MIT License.
