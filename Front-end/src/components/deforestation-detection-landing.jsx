'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, AlertTriangle, Leaf, Wind, Sun, Newspaper, Heart } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const WeatherAQI = ({ city, aqi }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        setWeatherData(response.data);
      } catch (error) {
        setError("Error fetching weather data.");
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  if (error) return <p className="text-red-600">{error}</p>;

  if (!weatherData) return <p>Loading weather data...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather & AQI</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">{`${weatherData.main.temp.toFixed(1)}°C`}</p>
            <p className="text-gray-600">{weatherData.weather[0].main}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{`AQI: ${aqi}`}</p>
            <p className={`text-${aqi <= 50 ? "green" : "red"}-600`}>
              {aqi <= 50 ? "Good" : "Unhealthy"}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center">
            <Sun className="mr-2" />
            <span>Feels like: {weatherData.main.feels_like.toFixed(1)}°C</span>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2" />
            <span>{`Wind: ${weatherData.wind.speed.toFixed(1)} m/s`}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LiveAlerts = ({ city }) => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const aqiToken = "YOUR_AQI_TOKEN";

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!city) return;

      try {
        const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqiToken}`);
        if (response.data.status === "ok") {
          const aqiData = response.data.data;
          const pm25Value = aqiData.iaqi?.pm25?.v || "N/A";
          const pm10Value = aqiData.iaqi?.pm10?.v || "N/A";
          setAlerts([
            `AQI Level: ${aqiData.aqi} - ${aqiData.dominentpol}`,
            `PM2.5: ${pm25Value}`,
            `PM10: ${pm10Value}`,
          ]);
        } else {
          setError("Data fetch unsuccessful.");
        }
      } catch {
        setError("Error fetching alerts.");
      }
    };

    fetchAlerts();
  }, [city, aqiToken]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 text-red-500" />
          Live Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-700">{error}</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((alert, index) => (
              <li key={index} className="text-red-700">{alert}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

const TreePlantationStats = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Leaf className="mr-2 text-green-500" />
        Trees Planted
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-4xl font-bold text-green-700">1,234,567</p>
      <p className="text-gray-600">Trees planted through our initiatives</p>
    </CardContent>
  </Card>
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

const EcoGuardDashboard = () => {
  const [location, setLocation] = useState('');
  const [aqi, setAqi] = useState(null);
  const [treesNeeded, setTreesNeeded] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [userTreesPledge, setUserTreesPledge] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState({
    message: "",
    deforestation_percentage: "",
    satellite_image: ''
  });

  const aqiToken = "YOUR_AQI_TOKEN";

  const calculateAqiImpact = useCallback((currentAQI, treeCount) => {
    const k = 0.05; // Efficiency constant
    const T = 1; // Average age of trees (1 year)
    const A = 10000; // Assuming 10,000 sq meters for simplicity
    const P = 1000; // Assuming 1000 people per sq km for simplicity
    const N = treeCount; // Number of trees planted

    return Math.max(0, currentAQI - (k * N * T) / (A * P)); // Ensure AQI doesn't go negative
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!location) return;

      const deforestationResponse = await axios.post('https://ecoguard-model.onrender.com/deforestation', { area_name: location });
      setResData(deforestationResponse.data);

      const aqiResponse = await axios.get(`https://api.waqi.info/feed/${location}/?token=${aqiToken}`);
      const aqiData = aqiResponse.data.data;
      setAqi(aqiData.aqi);

      const calculatedTreesNeeded = Math.floor(aqiData.aqi * 10);
      setTreesNeeded(calculatedTreesNeeded);

      setGraphData([{ time: new Date().toLocaleTimeString(), aqi: aqiData.aqi }]);
    } catch {
      console.error('Error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (aqi !== null) {
      const interval = setInterval(() => {
        setGraphData(prevData => {
          const newAqi = calculateAqiImpact(aqi, userTreesPledge);
          const newData = [...prevData, { time: new Date().toLocaleTimeString(), aqi: newAqi }];
          return newData.slice(-10); // Keep last 10 entries
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [aqi, userTreesPledge, calculateAqiImpact]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">EcoGuard Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
          className="border p-2 rounded"
        />
        <Button onClick={fetchData} className="ml-2" disabled={loading}>
          {loading ? "Fetching..." : "Fetch Data"}
        </Button>
      </div>

      <WeatherAQI city={location} aqi={aqi} />
      <LiveAlerts city={location} />
      <TreePlantationStats />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Graph of AQI Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="aqi" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
};

export default EcoGuardDashboard;
