'use client'

import React, { useState, useEffect } from 'react';
import { Leaf, Search, Facebook, Twitter, Instagram, ChevronRight } from 'lucide-react';

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const YOUR_API_KEY = "2a87b93a08e92e63b553b0d751762b2e";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://gnews.io/api/v4/search?q=aqi&token=${YOUR_API_KEY}&lang=en`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        // Filter articles that have images
        const filteredArticles = data.articles.filter(article => article.image);
        // Limit the number of displayed articles to 6
        setNewsItems(filteredArticles.slice(0, 6));
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4">
          <p className="text-center mb-4">Stay updated with the latest in environmental protection.</p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* News Feed */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Loading news...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            newsItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
                        Read More <ChevronRight className="ml-1" size={16} />
                      </button>
                    </a>
                    <div className="flex space-x-2">
                      <Facebook className="text-blue-600 cursor-pointer" size={20} />
                      <Twitter className="text-blue-400 cursor-pointer" size={20} />
                      <Instagram className="text-pink-600 cursor-pointer" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Personal Impact Section */}
        <section className="mt-12 bg-green-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Environmental Impact</h2>
          <p className="text-lg">
            Your efforts have planted 15 trees and helped improve the AQI by 5 points in your area.
          </p>
        </section>
      </main>
      <footer className="bg-green-600 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:underline">Reforestation</a>
            <a href="#" className="hover:underline">Air Quality</a>
            <a href="#" className="hover:underline">Eco-Friendly Technologies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;
