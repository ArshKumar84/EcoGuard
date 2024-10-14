'use client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Leaf, User, Lock, Mail, Shield } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserId } from '../store/useSlice';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const username = e.target['username'].value;
    const email = isSignUp ? e.target['email']?.value : null;
    const password = e.target['password'].value;
    const confirmPassword = isSignUp ? e.target['confirm-password']?.value : null;
    const location = isSignUp ? e.target['location']?.value : null;

    if (isSignUp && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (isSignUp) {
        // Sign up logic
        response = await axios.post("https://ecoguard-522e.onrender.com/api/v1/users", {
          username,
          location,
          email,
          password,
        });
        setUserData(response.data);
        setShowOTP(true);
        toast.info("Please enter the OTP sent to your email.");
      } else {
        // Log in logic
        response = await axios.post("https://ecoguard-522e.onrender.com/api/v1/users/login", {
          username,
          password,
        });
        dispatch(setUserId(response.data)); 
        localStorage.setItem('userId', response.data);
        toast.success("Successfully logged in! Redirecting to home page...");
        // setTimeout(() => {
        //   window.location.href = '/Home';
        // }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${isSignUp ? "sign up" : "log in"}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    const enteredOTP = otp.join('');
    try {
      // Replace this with your actual OTP verification API call
      const response = await axios.post("https://ecoguard-522e.onrender.com/api/v1/users/verify-otp", {
        userId: userData.id,
        otp: enteredOTP
      });
      
      if (response.data) {
        console.log
        dispatch(setUserId(userData.id));
        localStorage.setItem('userId', userData.id);
        toast.success("OTP verified successfully! Redirecting to home page...");
        setTimeout(() => {
          window.location.href = '/Home';
        }, 2000);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {showOTP ? "Verify OTP" : (isSignUp ? "Join EcoGuard" : "Welcome back")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {showOTP ? "Enter the OTP sent to your email" : (isSignUp ? "Be part of the global reforestation movement" : "Let's continue protecting the environment")}
          </p>
        </div>

        {!showOTP && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsSignUp(true)}
              className={`px-4 py-2 rounded-full ${isSignUp ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`px-4 py-2 rounded-full ${!isSignUp ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Log In
            </button>
          </div>
        )}

        {showOTP ? (
          <div className="mt-8 space-y-5">
            <div className="flex justify-center space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOTPChange(e.target, index)}
                  className="w-12 h-12 border-2 rounded-lg text-center text-xl focus:border-green-500 focus:outline-none"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading && 'opacity-50'}`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <InputField
              id="username"
              name="username"
              type="text"
              icon={<User className="h-5 w-5 text-gray-400 absolute ml-3" />}
              placeholder="Username"
              required
            />
            {isSignUp && (
              <>
                <InputField
                  id="location"
                  name="location"
                  type="text"
                  icon={<User className="h-5 w-5 text-gray-400 absolute ml-3" />}
                  placeholder="Location"
                  required
                />
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  icon={<Mail className="h-5 w-5 text-gray-400 absolute ml-3" />}
                  placeholder="Email address"
                  required
                />
              </>
            )}
            <InputField
              id="password"
              name="password"
              type="password"
              icon={<Lock className="h-5 w-5 text-gray-400 absolute ml-3" />}
              placeholder="Password"
              required
            />
            {isSignUp && (
              <InputField
                id="confirm-password"
                name="confirm-password"
                type="password"
                icon={<Lock className="h-5 w-5 text-gray-400 absolute ml-3" />}
                placeholder="Confirm Password"
                required
              />
            )}

            {isSignUp && (
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="font-medium text-green-600 hover:text-green-500">Terms and Conditions</a>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading && 'opacity-50'}`}
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ id, name, type, icon, placeholder, required }) => (
  <div>
    <label htmlFor={id} className="sr-only">{placeholder}</label>
    <div className="flex items-center">
      {icon}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default AuthPage; 
