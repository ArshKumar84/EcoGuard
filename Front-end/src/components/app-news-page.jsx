'use client'

import React, { useState, useEffect } from 'react'
import { Leaf, Search, Facebook, Twitter, Instagram, ChevronRight } from 'lucide-react'

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // Error state

  // Function to fetch news based on search term or default query
  const fetchNews = async (query = 'environment') => {
    setLoading(true)
    setError(null) // Reset error
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=f9480aa86ed74aa0887d99d64c602bf7`, {
        headers: {
          'Upgrade': 'h2', // Ensure HTTP/2 upgrade if needed
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Filter articles that have images
      const filteredArticles = data.articles?.filter(article => article.urlToImage) || [];
      setNewsItems(filteredArticles.slice(0, 6)); // Limit to 6 articles
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch default news on initial load
  useEffect(() => {
    fetchNews();
  }, []);

  // Search handler to fetch news based on search term
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(searchTerm || 'environment'); // Default to 'environment' if empty
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4">
          <p className="text-center mb-4">Stay updated with the latest in environmental protection.</p>
          <div className="max-w-md mx-auto relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400" />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
                <Search />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Error handling */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* News Feed */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Loading news...</p>
          ) : (
            newsItems.length > 0 ? (
              newsItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={item.urlToImage} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
                        Read More <ChevronRight className="ml-1" size={16} />
                      </button>
                    </a>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Facebook className="text-blue-600 cursor-pointer" size={20} />
                      <Twitter className="text-blue-400 cursor-pointer" size={20} />
                      <Instagram className="text-pink-600 cursor-pointer" size={20} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No news articles found.</p>
            )
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
}

export default NewsPage;
