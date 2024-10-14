'use client'

import React, { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Leaf, AlertTriangle, Wind, Sun, Newspaper, Heart, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import EcoGuardLoader from '../components/EcoGuardLoader';

const WeatherAQI = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);

  const city = "Pinjore";
  const apiKey = "cc47ca49c652020e0b96409835d4ba58";
  const aqi = "f14bf78e017b9a66a8b0e26cde560505aee32fc2";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        setWeatherData(weatherResponse.data);

        const { lon, lat } = weatherResponse.data.coord;
        const aqiResponse = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqi}`);
        setAqiData(aqiResponse.data.data);
      } catch (error) {
        console.error("Error fetching weather or AQI data:", error);
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather & AQI</CardTitle>
      </CardHeader>
      <CardContent>
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
                <Sun className="mr-2" />
                <span>UV Index: {weatherData.main.feels_like} (Moderate)</span>
              </div>
              <div className="flex items-center">
                <Wind className="mr-2" />
                <span>{`Wind: ${weatherData.wind.speed} km/h`}</span>
              </div>
            </div>
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}

const LiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const aqi = "f14bf78e017b9a66a8b0e26cde560505aee32fc2";
  const city = "Delhi";

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqi}`);

        if (response.data.status === "ok") {
          const aqiData = response.data.data;
          const pm25Value = aqiData.iaqi?.pm25?.v || "N/A";

          setAlerts([
            `AQI Level: ${aqiData.aqi} - ${aqiData.dominentpol}`,
            `PM2.5: ${pm25Value}`,
            `PM10: ${aqiData.iaqi?.pm10?.v || "N/A"}`,
          ]);
        } else {
          throw new Error("Data fetch unsuccessful");
        }
      } catch (error) {
        setError("Error fetching alerts");
        console.error("Fetch error:", error);
      }
    }

    fetchAlerts();
  }, []);

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
}

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
)

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
)

const DeforestationDetection = ({ location, setLocation, sendDeforestationRequest, resData, loading }) => (
  <div className="flex mb-6">
    <input
      type="text"
      placeholder="Enter location (city, address, or GPS coordinates)"
      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <button
      onClick={sendDeforestationRequest}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
    >
      <Search className="mr-2" /> Search for Deforestation
    </button>
  </div>
);

const HomePage = () => {
  const [aqi, setAqi] = useState(null);
  const [treesNeeded, setTreesNeeded] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [userTreesPledge, setUserTreesPledge] = useState(0);
  const [location, setLocation] = useState('');
  const [deforestationDetected, setDeforestationDetected] = useState(false);
  const [deforestationPercentage, setDeforestationPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState({ message: "", deforestation_percentage: "", satellite_image: '' });
  const [error, setError] = useState(null);

  const fetchAQI = async () => {
    try {
      const response = await axios.get(`https://api.waqi.info/feed/Delhi/?token=f14bf78e017b9a66a8b0e26cde560505aee32fc2`);
      const fetchedAQI = response.data.data.aqi;
      setAqi(fetchedAQI);
      setTreesNeeded(Math.floor(fetchedAQI / 50));
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      setError("Error fetching AQI data");
    }
  };

  useEffect(() => {
    fetchAQI();
  }, []);

  const sendDeforestationRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/deforestation?location=${location}`);
      setResData(response.data);
      setDeforestationDetected(response.data.message === "Deforestation detected");
      setDeforestationPercentage(response.data.deforestation_percentage);
    } catch (error) {
      console.error("Error fetching deforestation data:", error);
      setError("Error fetching deforestation data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (treesNeeded > 0) {
      const data = [];
      let currentAQI = aqi;
      const treesPerWeek = Math.floor(treesNeeded / 4);
      
      for (let week = 0; week <= 4; week++) {
        data.push({
          week: `Week ${week}`,
          aqi: currentAQI,
          trees: week * treesPerWeek
        });
        currentAQI = Math.max(50, currentAQI - (treesPerWeek * 0.1));
      }

      setGraphData(data);
    }
  }, [treesNeeded, aqi]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">EcoGuard Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherAQI />
        <Card>
          <CardHeader>
            <CardTitle>AQI Impact</CardTitle>
          </CardHeader>
          <CardContent>
            {aqi !== null ? (
              <div>
                <p className={`text-6xl font-bold ${getAQIColor(aqi)}`}>{aqi}</p>
                <p className="text-2xl mt-2">{getAQIDescription(aqi)}</p>
                <Progress value={(aqi / 500) * 100} className="mt-4" />
                <p className="mt-4">Trees needed to plant this month: {treesNeeded}</p>
                <p>Predicted AQI after planting {userTreesPledge} trees: 
                  {Math.max(0, aqi - (0.05 * userTreesPledge * 5) / 1000)}</p>
              </div>
            ) : (
              <p>Loading AQI data...</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <LiveAlerts />
        <TreePlantationStats />
      </div>
      <Tabs defaultValue="graph" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="graph">AQI Reduction Graph</TabsTrigger>
          <TabsTrigger value="pledge">Tree Pledge</TabsTrigger>
        </TabsList>
        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>AQI Reduction Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="aqi"
                    yAxisId="left"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3} />
                  <Area
                    type="monotone"
                    dataKey="trees"
                    yAxisId="right"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pledge">
          <Card>
            <CardHeader>
              <CardTitle>Make Your Tree Pledge</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Slider
                  value={[userTreesPledge]}
                  onValueChange={(value) => setUserTreesPledge(value[0])}
                  min={0}
                  max={1000}
                  step={1}
                />
                <p className="mt-2">You have pledged to plant {userTreesPledge} trees.</p>
                <Button className="mt-4" onClick={() => console.log("Pledge submitted!")}>
                  Submit Pledge
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <DeforestationDetection 
        location={location}
        setLocation={setLocation}
        sendDeforestationRequest={sendDeforestationRequest}
        resData={resData}
        loading={loading}
      />
      <div className="mb-6 mt-6 bg-gray-200 h-[40rem] flex items-center justify-center rounded-md overflow-hidden">
        {loading ? (
          <EcoGuardLoader duration={15000} />
        ) : (
          <Image
            src={resData.satellite_image ? resData.satellite_image : '/images/placeholder.png'}
            width={300} 
            height={300}
            alt="Satellite view"
            className={resData.satellite_image ? 'w-full h-full object-cover' : 'w-300 h-300 object-contain'}
          />
        )}
      </div>
      <div className={`mb-6 p-4 rounded-md ${resData.message === "Deforestation detected" ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        <div className="flex items-center">
          {resData.message === "Deforestation detected" ? (
            <AlertTriangle className="h-6 w-6 mr-2" />
          ) : (
            <Leaf className="h-6 w-6 mr-2" />
          )}
          <p className="font-semibold">
            {resData.message === "Deforestation detected"
              ? 'Warning: Deforestation detected in the specified area.'
              : 'Good news: No deforestation detected in the specified area.'}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
