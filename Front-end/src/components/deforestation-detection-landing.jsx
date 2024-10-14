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

const EcoGuardDashboard = () => {
  // State management
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);
  const [userTreesPledge, setUserTreesPledge] = useState(0);
  const [deforestationDetected, setDeforestationDetected] = useState(false);
  const [deforestationPercentage, setDeforestationPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState({ message: "", deforestation_percentage: "", satellite_image: '' });
  const city = "Delhi"; // Use any default city for AQI and weather

  useEffect(() => {
    const fetchWeatherAndAQIData = async () => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_WEATHER_API_KEY`);
        const { lon, lat } = weatherResponse.data.coord;
        const aqiResponse = await axios.get(`https://api.waqi.info/feed/${city}/?token=YOUR_AQI_API_KEY`);

        setWeatherData(weatherResponse.data);
        setAqiData(aqiResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchWeatherAndAQIData();
  }, []);

  const sendDeforestationRequest = async (location) => {
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

  const getAQIColor = (aqi) => {
    if (aqi < 51) return 'text-green-500';
    if (aqi < 101) return 'text-yellow-500';
    if (aqi < 151) return 'text-orange-500';
    return 'text-red-500';
  };

  const getAQIDescription = (aqi) => {
    if (aqi < 51) return "Good";
    if (aqi < 101) return "Moderate";
    if (aqi < 151) return "Unhealthy for Sensitive Groups";
    return "Unhealthy";
  };

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (aqiData) {
      const treesNeeded = Math.floor(aqiData.aqi / 50);
      const data = [];
      let currentAQI = aqiData.aqi;
      const treesPerWeek = Math.floor(treesNeeded / 4);

      for (let week = 0; week <= 4; week++) {
        data.push({
          week: `Week ${week}`,
          aqi: currentAQI,
          trees: week * treesPerWeek,
        });
        currentAQI = Math.max(50, currentAQI - (treesPerWeek * 0.1));
      }

      setGraphData(data);
    }
  }, [aqiData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">EcoGuard Dashboard</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weather & AQI</CardTitle>
          </CardHeader>
          <CardContent>
            {weatherData && aqiData ? (
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-4xl font-bold">{`${weatherData.main.temp}°C`}</p>
                    <p className="text-gray-600">{weatherData.weather[0].main}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{`AQI: ${aqiData.aqi}`}</p>
                    <p className={`text-${getAQIColor(aqiData.aqi)}`}>
                      {getAQIDescription(aqiData.aqi)}
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
              <p>Loading...</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AQI Impact</CardTitle>
          </CardHeader>
          <CardContent>
            {aqiData ? (
              <div>
                <p className={`text-6xl font-bold ${getAQIColor(aqiData.aqi)}`}>{aqiData.aqi}</p>
                <p className="text-2xl mt-2">{getAQIDescription(aqiData.aqi)}</p>
                <Progress value={(aqiData.aqi / 500) * 100} className="mt-4" />
                <p className="mt-4">Predicted AQI after planting {userTreesPledge} trees: 
                  {Math.max(0, aqiData.aqi - (0.05 * userTreesPledge * 5) / 1000)}</p>
              </div>
            ) : (
              <p>Loading AQI data...</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              Live Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>No live alerts available.</p>
          </CardContent>
        </Card>
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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter location"
          className="p-2 border border-gray-300 rounded"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendDeforestationRequest(e.target.value);
            }
          }}
        />
        <Button onClick={() => sendDeforestationRequest('YourLocation')}>Check Deforestation</Button>
      </div>
      <div className="mb-6 mt-6 bg-gray-200 h-[40rem] flex items-center justify-center rounded-md overflow-hidden">
        {loading ? (
          <EcoGuardLoader duration={15000} />
        ) : (
          <Image
            src={resData.satellite_image || '/images/placeholder.png'}
            width={300}
            height={300}
            alt="Satellite view"
            className={resData.satellite_image ? 'w-full h-full object-cover' : 'w-300 h-300 object-contain'}
          />
        )}
      </div>
      <div className={`mb-6 p-4 rounded-md ${deforestationDetected ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        <div className="flex items-center">
          {deforestationDetected ? (
            <AlertTriangle className="h-6 w-6 mr-2" />
          ) : (
            <Leaf className="h-6 w-6 mr-2" />
          )}
          <p className="font-semibold">
            {deforestationDetected
              ? 'Warning: Deforestation detected in the specified area.'
              : 'Good news: No deforestation detected in the specified area.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoGuardDashboard;
