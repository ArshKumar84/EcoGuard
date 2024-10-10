'use client'

import React, { useState ,useEffect} from 'react'
import { MapPin, Camera, Leaf, MessageSquare, Share2, Award, Users, Calendar, TreePine, Wind } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import axios from 'axios';

const Map = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })




const SocialPage = () => {


   const [UserID, setUserID]=useState(null)
useEffect(() => {
  if (typeof window !== "undefined") { // Ensure this runs only on the client
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserID(storedUserId);
    }
  }
}, []);


  console.log(UserID);

  const [error, setError] = useState(null); // State to hold error message


 



const [user, setUser] = useState({
  username: '',
  location: '',// Initialize with expected structure
  numTrees: 45,
  
});

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


  const [posts, setPosts] = useState([
    { id: 1, user: 'John Doe', content: 'I just planted 5 trees today in EcoGuard\'s Tree Plantation Program!',  likes: 15 },
    { id: 2, user: 'Jane Smith',  content: 'Check out this deforested area I helped restore!', likes: 20 },
    { id: 3, user: 'Arsh ',  content: 'Check out this deforested area I helped restore!', likes: 20 },
  ])

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, user: 'Jane Smith', treeCount: 150 },
    { id: 2, user: 'David Green', treeCount: 120 },
    { id: 3, user: 'Amy Leaf', treeCount: 110 },
  ])

  const [events, setEvents] = useState([
    { id: 1, title: 'Community Tree Planting', date: '2023-07-15', location: 'Central Park', participants: 50, goal: 'Plant 500 trees' },
    { id: 2, title: 'AQI Awareness Rally', date: '2023-07-22', location: 'City Hall', participants: 100, goal: 'Educate 1000 people on AQI' },
  ])

  const [liked, setLiked] = useState(false); // To toggle like state
  const [likes, setLikes] = useState(0); 


  const [newPostContent, setNewPostContent] = useState(
    ); // State to hold the content of the new post
  
    // Function to handle the submission of a new post
  const handlePost = async () => {
  if (newPostContent.trim() === '') return; // Prevent empty posts

  const newPost = {
    id: posts.length + 1, // Generate a new ID for the post
    user: user.username, // Corrected the user reference
    content: newPostContent,
    likes: 0,
    liked: false
  };

  // Add the new post to the posts array
  setPosts([newPost, ...posts]);

  // Clear the textarea after posting
  setNewPostContent('');

  // If you need to save posts to the backend, do so here
  try {
    await axios.put(`https://ecoguard-522e.onrender.com/api/v1/users/${UserID}`, { posts: [...posts, newPost] });
    setError(null);
  } catch (error) {
    console.error('Error saving post data:', error);
    setError('Failed to save post data.');
  }
};

  
  const handleLikeClick = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedLikes = post.liked ? post.likes - 1 : post.likes + 1; // Increment or decrement likes
        return { ...post, likes: updatedLikes, liked: !post.liked }; // Toggle the 'liked' state for the specific post
      }
      return post; // Return the other posts unchanged
    }));
  };

  return (
    (<div className="bg-green-50 min-h-screen">
      <header className="bg-green-600 text-white p-4">
       
      </header>
      <main className="max-w-full px-0 py-0 flex flex-col md:flex-row gap-4">
        <aside className="md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Award className="mr-2" /> Top Eco-Warriors
            </h2>
            <ul>
              {leaderboard.map((leader, index) => (
                <li key={leader.id} className="flex items-center justify-between mb-2">
                  <span>{index + 1}. {leader.user}</span>
                  <span className="font-bold">{leader.treeCount} Trees</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Calendar className="mr-2" /> Upcoming Eco-Events
            </h2>
            {events.map(event => (
              <div key={event.id} className="mb-4">
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} at {event.location}</p>
                <p className="text-sm">Goal: {event.goal}</p>
                <Link href="/Event"
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
                  <Users className="mr-2" /> Join Now
                </Link>
              </div>
            ))}
          </div>
        </aside>

        <section className="md:w-1/2">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Create a Post</h2>
            <textarea
          className="w-full p-2 border rounded"
          placeholder="Share your eco-friendly activity..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)} // Update the state with the textarea's value
        ></textarea>
            <div className="flex justify-between mt-2">
             
            <button
          onClick={handlePost}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
        >
          Post
        </button>
            </div>
          </div>

          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-2">
                 
                  <span className="font-bold">{post.user}</span>
                </div>
                <p className="mb-2">{post.content}</p>
                
                <div className="flex justify-between text-gray-500">
                <button
            onClick={() => handleLikeClick(post.id)}
            className={`flex items-center px-4 py-2 rounded transition-colors ${
              post.liked ? 'text-green-500' : 'text-gray-700'
            } `}
          >
            <Leaf className="mr-1" /> {post.likes} Likes
          </button>
                  
                 
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Wind className="mr-2" /> Community AQI Tracker
            </h2>
            <p className="text-sm mb-2">Average AQI in reforested areas: 65 (Moderate)</p>
            <div className="h-40 bg-gray-200 rounded flex items-end">
              <div className="w-1/3 h-1/2 bg-yellow-400"></div>
              <div className="w-1/3 h-3/4 bg-green-400"></div>
              <div className="w-1/3 h-1/4 bg-red-400"></div>
            </div>
            <p className="text-sm mt-2">AQI reduction over time in reforested areas</p>
          </div>

          
        </aside>
      </main>
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
    </div>)
  );
}

export default SocialPage
