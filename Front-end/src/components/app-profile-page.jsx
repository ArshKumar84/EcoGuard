'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MapPin, Leaf, Edit2, Settings } from 'lucide-react';
import axios from 'axios';

const ProfilePage = () => {

  const [UserID, setUserID]=useState(null)
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserID(storedUserId);
    }
  }, []);

  console.log(UserID);


  const [user, setUser] = useState({
    username: '',
    location: '',// Initialize with expected structure
    numTrees: 45,
    
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null); // State to hold error message

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
  }, [UserID]);// Dependency on userId

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://ecoguard-522e.onrender.com/api/v1/users/${UserID}`, user);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Error saving user data:', error);
      setError('Failed to save user data.');
    }
  };


  const handleChange = (e, field) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: e.target.value,
    }));
  };

  const handleLocationChange = (e, field) => {
    setUser((prevUser) => ({
      ...prevUser,
      location: {
        ...prevUser.location,
        [field]: e.target.value,
      },
    }));
  };

  return (
 <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex  justify-center">
  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
              {error}
            </div>
          )}

          {/* Header Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative"></div>
            {isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleChange(e, 'name')}
                className="mt-4 text-2xl font-bold text-center border-b-2 border-green-500 focus:outline-none"
              />
            ) : (
              <h1 className="text-2xl font-semibold mb-2 flex items-center">@{user.username}</h1>
            )}
            {/* {isEditing ? (
              <input
                type="text"
                value={user.username}
                onChange={(e) => handleChange(e, 'username')}
                className="mt-2 text-gray-600 text-center border-b-2 border-green-500 focus:outline-none"
              />
            ) : (
              <p className="mt-2 text-gray-600">{user.username}</p>
            )} */}
          </div>

          {/* Location Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <MapPin className="mr-2 text-green-500" /> District
            </h2>
            <div className="grid">
              
                <div className="flex items-center mx-8">
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.location}
                      onChange={(e) => handleLocationChange()}
                      className="border-b-2 border-green-500 focus:outline-none"
                    />
                  ) : (
                    <span>{user.location}</span>
                  )}
                </div>
            
            </div>
          </div>

          {/* Trees Planted Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Leaf className="mr-2 text-green-500" /> Trees Planted
            </h2>
            <div className="bg-green-100 rounded-lg p-4 text-center">
              <p className="text-4xl font-bold text-green-600">{user.numTrees}</p>
              <p className="mt-2 text-sm text-gray-600">
                Your contribution has helped improve the air quality by reducing CO2 emissions in your area.
              </p>
            </div>
          </div>

          {/* Tree Contribution Tracker */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Progress</h2>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{ width: `${(user.numTrees / 100) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600 text-center">
              {user.numTrees}/100 trees planted to reach the next milestone
            </p>
          </div>

          {/* Navigation Section */}
          <div className="flex justify-between">
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Edit2 className="mr-2" size={16} />
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Settings className="mr-2" size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
