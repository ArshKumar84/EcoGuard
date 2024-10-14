'use client'

import React, { useState, useEffect } from 'react'
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
import { Leaf, AlertTriangle, Wind, Sun, Newspaper, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import axios from 'axios'




const WeatherAQI = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [aqiData, setAqiData] = useState(null)
  const [error, setError] = useState(null)

  const city = user.location
  const apiKey = "cc47ca49c652020e0b96409835d4ba58"
  const aqi = "f14bf78e017b9a66a8b0e26cde560505aee32fc2"

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        )
        setWeatherData(weatherResponse.data)

        const { lon, lat } = weatherResponse.data.coord
        const aqiResponse = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqi}`)
        setAqiData(aqiResponse.data.data)
      } catch (error) {
        console.error("Error fetching weather or AQI data:", error)
        setError(error.response ? error.response.data.message : error.message)
      }
    }

    fetchWeatherData()
  }, [])

  return (
    (<Card  className='border-4 '>
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
    </Card>)
  );
}



const bgColor = (aqi) => {
  if (aqi <= 50) return 'bg-green-200'
  if (aqi <= 100) return 'bg-yellow-200'
  if (aqi <= 150) return 'bg-orange-200'
  if (aqi <= 200) return 'bg-red-200'
  if (aqi <= 300) return 'bg-purple-200'
  return 'bg-rose-200'
}




const LiveAlerts = () => {
  const [alerts, setAlerts] = useState([])
  const [error, setError] = useState(null)
  const aqi = "f14bf78e017b9a66a8b0e26cde560505aee32fc2"
  const city = "Delhi"


  
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqi}`)
    
        if (response.data.status === "ok") {
          const aqiData = response.data.data
    
          const pm25Value = aqiData.iaqi?.pm25?.v || "N/A"
          const pm10Value = aqiData.iaqi?.pm10?.v || "N/A"
    
          setAlerts([
            `AQI Level: ${aqiData.aqi} - ${aqiData.dominentpol}`,
            `PM2.5: ${pm25Value}`,
            `PM10: ${pm10Value}`,
          ])
        } else {
          throw new Error("Data fetch unsuccessful")
        }
      } catch (error) {
        setError("Error fetching alerts")
        console.error("Fetch error:", error)
      }
    }
    
    fetchAlerts()
  }, [])


  return (
    (<Card className={`${bgColor(aqi)} border-4 `}>
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
    </Card>)
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
    <div
      className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <Link
        href="/Community"
        className="flex items-center text-green-700 hover:text-green-900">
        <Leaf className="mr-2" />
        <span>Join Tree Plantation Drive</span>
      </Link>
      <Link
        href="/News"
        className="flex items-center text-blue-700 hover:text-blue-900">
        <Newspaper className="mr-2" />
        Environmental News & Blogs
      </Link>
      <Link
        href="/donation-page"
        className="flex items-center text-red-700 hover:text-red-900">
        <Heart className="mr-2" />
        Donate
      </Link>
    </div>
  </footer>
)

const HomePage = () => {
  const [aqi, setAqi] = useState(null)
  const [treesNeeded, setTreesNeeded] = useState(0)
  const [graphData, setGraphData] = useState([])
  const [userTreesPledge, setUserTreesPledge] = useState(0)




  const [UserID, setUserID]=useState(null)
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserID(storedUserId);
    }
  }, []);



  useEffect(() => {
    if (UserID) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://ecoguard-522e.onrender.com/api/v1/users/${UserID}`);
          setUser(response.data);
          setError(null);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data.');
        }
      };

      fetchUserData();
    }
  }, [UserID]);

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/${city}/?token=f14bf78e017b9a66a8b0e26cde560505aee32fc2`
        )
        const fetchedAQI = response.data.data.aqi
        setAqi(fetchedAQI)
        setTreesNeeded(Math.floor(fetchedAQI * 10))
      } catch (error) {
        console.error("Error fetching AQI:", error)
        // Fallback to simulated data
        const simulatedAQI = Math.floor(Math.random() * 300) + 50
        setAqi(simulatedAQI)
        setTreesNeeded(Math.floor(simulatedAQI * 10))
      }
    }

    fetchAQI()
  }, [])

  useEffect(() => {
    if (treesNeeded > 0) {
      const data = []
      let currentAQI = aqi
      const treesPerWeek = Math.floor(treesNeeded / 4)
      
      for (let week = 0; week <= 4; week++) {
        data.push({
          week: `Week ${week}`,
          aqi: currentAQI,
          trees: week * treesPerWeek
        })
        currentAQI = Math.max(50, currentAQI - (treesPerWeek * 0.1))
      }

      setGraphData(data)
    }
  }, [treesNeeded, aqi])

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-500'
    if (aqi <= 100) return 'text-yellow-500'
    if (aqi <= 150) return 'text-orange-500'
    if (aqi <= 200) return 'text-red-500'
    if (aqi <= 300) return 'text-purple-500'
    return 'text-rose-700'
  }

 
  const getAQIDescription = (aqi) => {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
    if (aqi <= 200) return 'Unhealthy'
    if (aqi <= 300) return 'Very Unhealthy'
    return 'Hazardous'
  }

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">EcoGuard Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherAQI />
        <Card className={`${bgColor(aqi)} border-4  `} >
          <CardHeader>
            <CardTitle>AQI Impact</CardTitle>
          </CardHeader>
          <CardContent>
            {aqi !== null ? (
              <div >
                <p className={`text-6xl font-bold ${getAQIColor(aqi)}`}>{aqi}</p>
                <p className="text-2xl mt-2">{getAQIDescription(aqi)}</p>
                <Progress value={(aqi / 500) * 100} className="mt-4" />
                <p className="mt-4">Trees needed to plant this month: {treesNeeded}</p>
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
        <TabsList className="grid w-full grid-cols-2 border-2">
          <TabsTrigger  className="border-2" value="graph">AQI Reduction Graph</TabsTrigger>
          <TabsTrigger  className=" border-2" value="pledge">Tree Pledge</TabsTrigger>
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
              <div className="space-y-4">
                <p>How many trees will you plant this month?</p>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[userTreesPledge]}
                  onValueChange={(value) => setUserTreesPledge(value[0])} />
                <p className="text-2xl font-bold">Your pledge: {userTreesPledge} trees</p>
                <Progress value={(userTreesPledge / treesNeeded) * 100} className="mt-4" />
                <p>You're contributing {((userTreesPledge / treesNeeded) * 100).toFixed(2)}% of the needed trees!</p>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Confirm Pledge
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Footer />
    </div>)
  );
}

export default HomePage
