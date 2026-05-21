import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import coverImg from '../assets/images/cover2.jpg';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      <img 
        src={coverImg} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-10"
      />
      
      <div className="max-w-xl w-full text-center relative z-10">
        <h1 className="text-9xl font-black text-green-600 drop-shadow-md mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 text-lg">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-200 hover:shadow-lg"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link 
            to="/shop"
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm border border-gray-200 hover:shadow-md"
          >
            <Search size={18} />
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
