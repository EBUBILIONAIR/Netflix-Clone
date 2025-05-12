import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "../firebase";
import logo from '../assets/logo.png';
import bell_icon from '../assets/bell_icon.png';
import profile_img from '../assets/profile_img.png';
import caret_icon from '../assets/caret_icon.png';
import search_icon from '../assets/search_icon.png';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv' },
    { name: 'Movies', path: '/movies' },
    { name: 'New & Popular', path: '/latest' },
    { name: 'My List', path: '/mylist' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="w-full px-6 py-5 flex justify-between items-center fixed top-0 z-50 bg-black backdrop-blur-sm transition-all duration-300">
      {/* Left section - Logo and Navigation */}
      <div className="flex items-center gap-12">
        <img
          src={logo}
          alt="Netflix Logo"
          className="w-24 h-auto object-contain md:w-28 lg:w-32 cursor-pointer"
          onClick={() => navigate('/')}
        />

        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <button 
                onClick={() => navigate(item.path)}
                className="text-gray-200 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section - Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Icon and Input */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex items-center gap-2">
            <img 
              src={search_icon} 
              alt="Search" 
              className="w-5 h-5 cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
            {showSearch && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white px-3 py-1 text-sm rounded focus:outline-none transition-all duration-200 w-40 md:w-56"
                placeholder="Search..."
              />
            )}
          </div>
        </form>

        {/* Notifications */}
        <button className="p-1 rounded-full hover:bg-gray-800/50 transition-colors duration-200">
          <img 
            src={bell_icon} 
            alt="Notifications" 
            className="w-6 h-6" 
          />
        </button>

        {/* Profile with Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-800/50"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src={profile_img} 
              alt="Profile" 
              className="w-8 h-8 rounded-md object-cover" 
            />
            <img 
              src={caret_icon} 
              alt="Dropdown" 
              className={`w-3 h-3 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#191919] rounded-md shadow-lg py-1 z-50 border border-gray-700">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50 transition-colors duration-150"
              >
                Sign Out of Netflix
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
