// components/Layout.jsx
'use client'; 
import React, { useState ,useEffect} from 'react';
import { XIcon, MenuIcon, User ,Leaf,TreePine} from 'lucide-react';
import Link from 'next/link';


const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div
    className={`fixed left-0 top-0 h-full bg-green-600 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0'} overflow-hidden z-50`}>
    <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
      <XIcon size={24} />
    </button>

    <nav className="mt-16 p-4">
      <ul className="space-y-4">
        <li><Link href="/Home" className="block px-4 py-2 hover:bg-green-700 rounded">Home</Link></li>
        <li><Link href="/Deforestation" className="block  px-4  py-2 hover:bg-green-700 rounded">Deforestation Detection</Link></li>
        <li><Link href="/Community" className="block px-4 py-2 hover:bg-green-700 rounded">Community Forum</Link></li>
        <li><Link href="/News" className="block  px-4 py-2 hover:bg-green-700 rounded">News</Link></li>
      </ul>
    </nav>
  </div>
);


const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set the current path from window.location.pathname
    const path = window.location.pathname; 
    setCurrentPath(path);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-green-600 text-white p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-white">
            <MenuIcon size={24} />
          </button>

{
        currentPath === '/Deforestation' ? (
          <h1 className="text-3xl font-bold flex items-center justify-center mb-2">
          <Leaf className="mr-2" /> Deforestation Detection
        </h1>
        ) : currentPath === '/News' ? (
          <h1 className="text-3xl font-bold flex items-center justify-center mb-4">
          <Leaf className="mr-2" /> Eco News
        </h1>
        ) : currentPath === '/Community' ? (
          <h1 className="text-2xl font-bold flex items-center justify-center">
          <TreePine className="mr-2" /> Community Impact – Together, We Can Reforest the World
        </h1>
        ) :(
          <h1 className="text-3xl font-bold flex items-center justify-center mb-2">Eco Guard</h1>  // Default text
        )
      }
        
          
          
          <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-white hover:text-green-200 transition-colors"
      >
        <User size={24} />
      </button>

      {isOpen && (

<div className="absolute right-0 mt-36 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Link href="/Profile"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
             
            </Link>
            <Link href="/"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
             
            >
              Logout
            </Link>

            </div>
            </div>   )}

         
        </header>
        <main className="container mx-auto px-0 py-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
