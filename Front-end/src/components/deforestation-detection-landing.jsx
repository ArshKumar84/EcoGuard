'use client'

import React, { useState, useEffect } from 'react'
import { Search, AlertTriangle, Leaf, Wind } from 'lucide-react';
import axios from "axios";
import Image from 'next/image';
import EcoGuardLoader from '../components/EcoGuardLoader';

export function DeforestationDetectionLandingJsx() {
  const [location, setLocation] = useState('')
  const [deforestationDetected, setDeforestationDetected] = useState(false)
  const [deforestationPercentage, setDeforestationPercentage] = useState('')
  const [treesToPlant, setTreesToPlant] = useState(0)
  const [loading, setLoading] = useState(false)

  const [resData, setResData] = useState({ 
    message: "", 
    deforestation_percentage: "", 
    satellite_image: ''
  })  
 
  const Line = () => (
    <footer className="bg-green-600 text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
        <p className="text-sm">Together, we can plant more trees and improve the world's air quality.</p>
      </div>
    </footer>
  )
 
  const [aqi, setAqi] = useState({
    score: 0,
    level: '',
    pm25: 0,
    pm10: 0,
    co2: 0,
    no2: 0,
    o3: 0,
    so2: 0,
  });

  const getAqiLevel = (score) => {
    if (score <= 50) return 'Good';
    if (score <= 100) return 'Moderate';
    if (score <= 150) return 'Unhealthy for Sensitive Groups';
    if (score <= 200) return 'Unhealthy';
    if (score <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getAqiColor = (score) => {
    if (score <= 50) return 'bg-green-500';
    if (score <= 100) return 'bg-yellow-500';
    if (score <= 150) return 'bg-orange-500';
    if (score <= 200) return 'bg-red-500';
    return 'bg-purple-500';
  };

  const token = "f14bf78e017b9a66a8b0e26cde560505aee32fc2"; // Replace with your actual token

  const [error, setError] = useState(null); // State for error handling

  const sendDeforestationRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://ecoguard-522e.onrender.com/deforestation', {
        area_name: location // Use the location input value here
      });

      const rData = await response.data
      setResData(rData)

      const percent = response.data.deforestation_percentage

      setDeforestationPercentage(percent)

      console.log(response.data.deforestation_percentage)

      // Update the UI based on the response
      if (response.deforestation_percentage) {
        setDeforestationDetected(true);
        setDeforestationPercentage(response.deforestation_percentage);
        setTreesToPlant(response.data.trees_to_plant || 0); // Default to 0 if not provided
      } else {
        setDeforestationDetected(false);
        setDeforestationPercentage(null); // Clear percentage if no deforestation
        setTreesToPlant(null); // Clear trees to plant if no deforestation
      }
    } catch (error) {
      console.error('Error occurred:', error.response ? error.response.data : error.message);
      setError('An error occurred while fetching the data.'); // Set error state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAqiData = async () => {
      if (!location) {
        console.warn("Location is empty, skipping AQI fetch.");
        return;
      }
      try {
        console.log(`Fetching AQI data for location: ${location}`);
        const response = await axios.get(`https://api.waqi.info/feed/${location}/?token=${token}`);
        const data = response.data.data;
  
        if (data) {
          const aqiData = {
            score: data.aqi,
            level: getAqiLevel(data.aqi),
            pm25: data.iaqi.pm25?.v, // Use optional chaining
            pm10: data.iaqi.pm10?.v,
            co2: data.iaqi.co?.v,
            no2: data.iaqi.no2?.v,
            o3: data.iaqi.o3?.v,
            so2: data.iaqi.so2?.v,
          };
  
          // Only set the AQI state if there are valid pollutant values
          const hasValidData = Object.values(aqiData).some(value => value !== undefined);
          
          if (hasValidData) {
            setAqi(aqiData);
          } else {
            console.warn("No valid AQI data found for the provided location.");
          }
        } else {
          console.error("No data found for the provided location.");
        }
      } catch (error) {
        console.error("Error fetching AQI data:", error);
      }
    };
  
    fetchAqiData();
  }, [location]);

  return (
    <div className="container  px-0 py-0">
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
        </div>
      </header>
      <br/>
     
      <div className="flex mb-6">
        <div>{deforestationPercentage}</div>
        <input
          type="text"
          placeholder="Enter location (city, address, or GPS coordinates)"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button
        onClick={sendDeforestationRequest}
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
      >
        <Search className="mr-2" /> Search for Deforestation
      </button>

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

      <div
        className={`mb-6 p-4 rounded-md ${resData.message === "Deforestation detected" ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
      >
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
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Deforestation Percentage</h2>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${resData.deforestation_percentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
              >
              </div>
            </div>
            <h3 className='text-center font-bold text-2xl'>{resData.deforestation_percentage}</h3>
            <p className="text-center font-bold text-2xl"></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Trees to be Planted</h2>
          <p className="text-center font-bold text-3xl text-green-600">{treesToPlant}</p>
          <p className="text-center text-gray-600">trees needed to restore forest cover</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-md shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Wind className="h-6 w-6 mr-2" />
          Air Quality Index (AQI)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-md ${getAqiColor(aqi.score)} text-white`}>
            <p className="text-2xl font-bold">{aqi.score}</p>
            <p className="text-sm">{aqi.level}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-semibold">PM2.5</p>
            <p className="text-lg">{aqi.pm25} µg/m³</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-semibold">PM10</p>
            <p className="text-lg">{aqi.pm10} µg/m³</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-semibold">CO2</p>
            <p className="text-lg">{aqi.co2} ppm</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-semibold">NO2</p>
            <p className="text-lg">{aqi.no2} ppb</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-semibold">O3</p>
            <p className="text-lg">{aqi.o3} ppb</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-semibold">SO2</p>
            <p className="text-lg">{aqi.so2} ppb</p>
          </div>
        </div>
      </div>
      <Line/>
    </div>
  );
}
