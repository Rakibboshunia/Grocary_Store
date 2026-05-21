import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, Settings, MapPin, User, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/150'} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-green-100 shadow-sm mb-4"
              />
              <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 font-medium rounded-xl">
                  <User size={18} /> Personal Info
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
                  <Package size={18} /> My Orders
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
                  <Heart size={18} /> Wishlist
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
                  <MapPin size={18} /> Addresses
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
                  <Settings size={18} /> Settings
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            
            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <button className="text-green-600 text-sm font-medium hover:underline">Edit</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  <p className="text-gray-900 font-medium">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <p className="text-gray-900 font-medium">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  <p className="text-gray-900 font-medium">+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Account Created</label>
                  <p className="text-gray-900 font-medium">May 21, 2026</p>
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                <button className="text-green-600 text-sm font-medium hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {[1, 2].map(order => (
                  <div key={order} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Order #ORD-{Math.floor(Math.random() * 10000)}</p>
                      <p className="text-sm text-gray-500">Placed on May {20 - order}, 2026</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${(Math.random() * 100 + 20).toFixed(2)}</p>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded mt-1">Delivered</span>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
