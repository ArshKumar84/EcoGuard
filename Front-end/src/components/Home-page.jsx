'use client'


import {
  SunIcon,
  WindIcon,
  AlertTriangle,
  Leaf,
  Newspaper,
  Heart,
  User,
} from 'lucide-react';
import Link from 'next/link';





import { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed

const WeatherAQI = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);

  const city = "Delhi"; // Change the city as needed
  const apiKey = "cc47ca49c652020e0b96409835d4ba58"; // Replace with your OpenWeatherMap API key
  const aqi = "f14bf78e017b9a66a8b0e26cde560505aee32fc2";

  useEffect(() => {
    const fetchWeatherData = async () => {
      console.log(`API Key: ${apiKey}`); // Debug: Make sure the API key is correct

      try {
        // Fetch weather data
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeatherData(weatherResponse.data);

        // Fetch AQI data using the coordinates from the weather API
        const { lon, lat } = weatherResponse.data.coord;
        const aqiResponse = await axios.get(
          `https://api.waqi.info/feed/${city}/?token=${aqi}`
        );
        setAqiData(aqiResponse.data.data);
      } catch (error) {
        console.error("Error fetching weather or AQI data:", error);
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Weather & AQI</h2>
      {error && <p className="text-red-600">Error: {error}</p>}
      {weatherData && aqiData ? (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-4xl font-bold">{`${weatherData.main.temp}°C`}</p>
              <p className="text-gray-600">{weatherData.weather[0].main}</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{`AQI: ${aqiData.aqi}`}</p>
              <p className={`text-${aqiData.aqi < 51 ? "green" : "red"}-600`}>
                {aqiData.aqi < 51 ? "Good" : "Unhealthy"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex items-center">
              <span>UV Index: {weatherData.main.feels_like} (Moderate)</span>
            </div>
            <div className="flex items-center">
              <span>{`Wind: ${weatherData.wind.speed} km/h`}</span>
            </div>
          </div>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};


const LiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const aqi = "f14bf78e017b9a66a8b0e26cde560505aee32fc2";
  const city = "Delhi"; // Change the city as needed

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/${city}/?token=${aqi}`
        );
    
        // Log the entire response to see its structure
        console.log("API Response:", response.data);
    
        if (response.data.status === "ok") {
          const aqiData = response.data.data;
    
          // Check if 'iaqi' and its properties are defined before accessing them
          const pm25Value = aqiData.iaqi?.pm25?.v || "N/A";
          const pm10Value = aqiData.iaqi?.pm10?.v || "N/A";
    
          setAlerts([
            `AQI Level: ${aqiData.aqi} - ${aqiData.dominentpol}`,
            `PM2.5: ${pm25Value}`,
            `PM10: ${pm10Value}`,
          ]);
        } else {
          throw new Error("Data fetch unsuccessful");
        }
      } catch (error) {
        setError("Error fetching alerts");
        console.error("Fetch error:", error); // Log the error for debugging
      }
    };
    
    fetchAlerts();
  }, []);

  return (
    <div className="bg-red-100 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <AlertTriangle className="mr-2 text-red-500" />
        Live Alerts
      </h2>
      {error ? (
        <p className="text-red-700">{error}</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, index) => (
            <li key={index} className="text-red-700">{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};



const TreePlantationStats = () => (
  <div className="bg-green-100 rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-bold mb-4 flex items-center">
      <Leaf className="mr-2 text-green-500" />
      Trees Planted
    </h2>
    <p className="text-4xl font-bold text-green-700">1,234,567</p>
    <p className="text-gray-600">Trees planted through our initiatives</p>
  </div>
);



const Footer = () => (
  <footer className="bg-white rounded-lg shadow-md p-6 mt-6">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <Link href="/Community" className="flex items-center text-green-700 hover:text-green-900">
        <Leaf className="mr-2" />
        <span>Join Tree Plantation Drive</span>
      </Link>
      <Link href="/News" className="flex items-center text-blue-700 hover:text-blue-900">
        <Newspaper className="mr-2" />
        Environmental News & Blogs
      </Link>
      <Link href="/donation-page" className="flex items-center text-red-700 hover:text-red-900">
        <Heart className="mr-2" />
        Donate
      </Link>
    </div>
  </footer>
);




const HomePage = () => {
  useEffect(() => {
    // Simulating API calls for data fetching
    console.log('Fetching weather and AQI data...');
    console.log('Fetching live alerts...');
    console.log('Fetching tree plantation stats...');
  }, []);

  return (
   
      <main className="container mx-auto px-4 py-8">
        <WeatherAQI />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiveAlerts />
          <TreePlantationStats />
        </div>
        <Footer />
      </main>
   
  );
};

export default HomePage;
