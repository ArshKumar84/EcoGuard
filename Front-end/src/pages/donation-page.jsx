'use client'

import React, { useState, useEffect } from 'react';
import { Leaf, CreditCard, Smartphone, Facebook, Instagram, Twitter } from 'lucide-react';

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDonationComplete, setIsDonationComplete] = useState(false);
  const [leafCount, setLeafCount] = useState(0);

  useEffect(() => {
    // Simulating leaf growth animation
    if (donationAmount > 0) {
      const leavesToGrow = Math.floor(donationAmount / 50);
      let count = 0;
      const interval = setInterval(() => {
        if (count < leavesToGrow) {
          setLeafCount(prevCount => prevCount + 1);
          count++;
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [donationAmount]);

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Simulating donation processing
    setTimeout(() => {
      setIsDonationComplete(true);
    }, 1500);
  };

  const renderPaymentForm = () => {
    if (paymentMethod === 'upi') {
      return (
        (<div>
          <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
          <input
            type="text"
            id="upiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your UPI ID" />
        </div>)
      );
    } else if (paymentMethod === 'card') {
      return (
        (<div className="space-y-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="1234 5678 9012 3456" />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="MM/YY" />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="123" />
            </div>
          </div>
        </div>)
      );
    }
  };

  return (
    (<div
      className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-800">Contribute to a Greener Future</h1>
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Every donation helps restore forests and protect the planet.</p>
          <div className="bg-green-100 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">You've planted 25 trees so far!</p>
          </div>

          {!isDonationComplete ? (
            <form onSubmit={handleDonationSubmit}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Select Donation Amount</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[50, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`py-2 px-4 rounded-md ${
                        donationAmount === amount
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}>
                      ₹{amount} ({amount / 50} {amount / 50 === 1 ? 'Tree' : 'Trees'})
                    </button>
                  ))}
                  <div>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonationAmount(parseInt(e.target.value) || 0);
                      }}
                      placeholder="Custom Amount"
                      className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Impact</h2>
                <p className="text-gray-600 mb-2">
                  Your donation of ₹{donationAmount} will plant {Math.floor(donationAmount / 50)} trees.
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(10, Math.floor(donationAmount / 50)))].map((_, index) => (
                    <Leaf
                      key={index}
                      className={`h-6 w-6 text-green-600 ${index < leafCount ? 'opacity-100' : 'opacity-30'}`} />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                      paymentMethod === 'upi' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
                    }`}>
                    <Smartphone className="mr-2 h-5 w-5" />
                    UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                      paymentMethod === 'card' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
                    }`}>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Card
                  </button>
                </div>
                {renderPaymentForm()}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                Donate ₹{donationAmount}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You for Your Donation!</h2>
              <p className="text-gray-600 mb-4">
                You've planted {Math.floor(donationAmount / 50)} trees today and helped protect the environment.
              </p>
              <p className="text-sm text-gray-500 mb-6">A receipt has been sent to your email.</p>
              <div className="flex justify-center space-x-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Facebook className="h-6 w-6" />
                </button>
                <button className="text-pink-600 hover:text-pink-800">
                  <Instagram className="h-6 w-6" />
                </button>
                <button className="text-blue-400 hover:text-blue-600">
                  <Twitter className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>)
  );
};

export default DonationPage;