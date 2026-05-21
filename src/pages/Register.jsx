import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/images/logo.png';
import coverImg from '../assets/images/cover2.jpg';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for Registration
    setTimeout(() => {
      const userData = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        avatar: 'https://i.pravatar.cc/150?img=11'
      };
      
      login(userData);
      setIsLoading(false);
      toast.success('Account created successfully!');
      navigate('/'); // Redirect to home after signup
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex max-w-4xl w-full mx-4 border border-gray-100">
        
        {/* Left Side - Image/Branding */}
        <div className="hidden md:block md:w-1/2 bg-green-600 relative overflow-hidden">
           <img 
              src={coverImg} 
              alt="Grocery" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
           <div className="absolute top-8 left-8">
             <img src={logoImg} alt="DailyBasket" className="h-10 w-auto brightness-0 invert drop-shadow-sm" />
           </div>
           <div className="absolute bottom-12 left-12 right-12 text-white">
              <h2 className="text-4xl font-bold mb-4 leading-tight">Join the Fresh <br/> Revolution.</h2>
              <p className="text-green-100 text-lg">Create an account to track your orders, save your favorites, and get exclusive deals.</p>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
            <p className="text-gray-500">Sign up to get started with your fresh grocery journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400" size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" 
                  placeholder="John Doe" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={18} />
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-200 hover:shadow-lg mt-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account? {' '}
            <Link to="/login" className="text-green-600 font-bold hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
