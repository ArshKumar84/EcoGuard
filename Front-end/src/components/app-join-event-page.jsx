'use client'

import React, { useState } from 'react'
import { Leaf, Calendar, Clock, MapPin, Mail, Phone, User, ChevronRight, ChevronLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

const JoinEventForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    fullName: '',
    username: '',
    email: '',
    phone: '',
    motivation: '',
    treeCount: 10,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log(formData)
    setStep(4) // Move to summary page
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          (<div className="space-y-6">
            <h2 className="text-2xl font-semibold text-green-700">Event Details</h2>
            <div className="relative">
              <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="relative">
              <Clock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500">
                <option value="">Select Time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={formData.location}
                onChange={handleChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
            </div>
            <div
              className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Interactive Map Placeholder</span>
            </div>
          </div>)
        );
      case 2:
        return (
          (<div className="space-y-6">
            <h2 className="text-2xl font-semibold text-green-700">Personal Information</h2>
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="relative">
              <Phone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
            </div>
            <textarea
              name="motivation"
              placeholder="Why do you want to join? (Optional)"
              value={formData.motivation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              rows="3" />
          </div>)
        );
      case 3:
        return (
          (<div className="space-y-6">
            <h2 className="text-2xl font-semibold text-green-700">Goal Setting</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many trees would you like to plant?
              </label>
              <input
                type="range"
                name="treeCount"
                min="1"
                max="100"
                value={formData.treeCount}
                onChange={handleChange}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-green-700">{formData.treeCount}</span> trees
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Event Progress</h3>
              <div className="w-full bg-green-200 rounded-full h-2.5 mb-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-green-700">75,000 / 100,000 Trees Planted</p>
            </div>
          </div>)
        );
      case 4:
        return (
          (<div className="space-y-6 text-center">
            <Leaf className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-semibold text-green-700">Thank you, {formData.fullName}!</h2>
            <p className="text-gray-600">You're helping us make the world greener.</p>
            <div className="bg-green-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Your Event Details</h3>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Your Goal:</strong> {formData.treeCount} trees</p>
            </div>
            <Link href="/Community"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center mx-auto">
              
              OK
            </Link>
          </div>)
        );
      default:
        return null
    }
  }

  return (
    (<div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div
            className="uppercase tracking-wide text-sm text-green-500 font-semibold mb-1">EcoGuard</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join the Community Tree Planting Event</h1>
          <p className="text-gray-600 mb-6">Be part of our initiative to plant 100,000 trees worldwide!</p>

          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {['Event Info', 'Personal Info', 'Goal Setting'].map((label, index) => (
                  <div
                    key={label}
                    className={`text-sm ${step === index + 1 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                    {label}
                  </div>
                ))}
              </div>
              <div className="w-full bg-green-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${(step / 3) * 100}%` }}></div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            {step < 4 && (
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 flex items-center">
                    <ChevronLeft className="mr-2" />
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center ml-auto">
                    Next
                    <ChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center ml-auto">
                    Join the Event
                    <Leaf className="ml-2" />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>)
  );
}

export default JoinEventForm