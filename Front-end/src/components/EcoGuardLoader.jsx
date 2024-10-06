import React, { useState, useEffect } from 'react';
import { Globe, Leaf } from 'lucide-react';

const EcoGuardLoader = ({ duration = 10000 }) => {
  const [progress, setProgress] = useState(0);
  const [showExtendedMessage, setShowExtendedMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, duration / 100);

    const timeout = setTimeout(() => {
      setShowExtendedMessage(true);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-green-50 to-blue-50">
  <div className="relative">
    <svg className="w-32 h-32" viewBox="0 0 100 100">
      <circle
        className="text-green-200 stroke-current"
        strokeWidth="4"
        cx="50"
        cy="50"
        r="48"
        fill="none"
      />
      <circle
        className="text-green-500 stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        cx="50"
        cy="50"
        r="48"
        fill="none"
        style={{
          strokeDasharray: 302,
          strokeDashoffset: 302 - (progress / 100) * 302,
        }}
      />
    </svg>
    {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {progress % 2 === 0 ? (
        <Globe className="w-16 h-16 text-green-600 animate-spin-slow" />
      ) : (
        <Leaf className="w-16 h-16 text-green-600 animate-bounce" />
      )}
    </div> */}
  </div>
  <p className="mt-4 text-lg font-semibold text-green-800">
    Fetching satellite data..
  </p>
  <p className="mt-2 text-sm text-green-600 max-w-md text-center">
    Please wait while we analyze the deforested area for your selected location.
  </p>
  {/* {showExtendedMessage && (
    <p className="mt-4 text-sm text-orange-500 max-w-md text-center animate-fade-in">
      Satellite images are taking a moment... Hang tight!
    </p>
  )} */}
  {/* <div className="mt-8 flex items-center space-x-2 bg-blue-100 p-3 rounded-lg">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
    <p className="text-sm text-blue-700">
      Tracking environmental changes... Stay informed with AQI and real-time deforestation data.
    </p>
  </div>*/}
</div> 

  );
};

export default EcoGuardLoader;