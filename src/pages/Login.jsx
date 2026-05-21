import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/images/logo.png';
import coverImg from '../assets/images/cover2.jpg';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for Login
    setTimeout(() => {
      // Basic mock check
      if (password.length < 6) {
        toast.error('Invalid email or password');
        setIsLoading(false);
        return;
      }

      const isAdmin = email === 'admin@admin.com';
      const userData = {
        id: isAdmin ? 'admin_1' : 'user_123',
        name: isAdmin ? 'Admin' : 'Demo User',
        email: email,
        role: isAdmin ? 'admin' : 'user',
        avatar: isAdmin ? 'https://i.pravatar.cc/150?u=admin' : 'https://i.pravatar.cc/150?img=33'
      };
      
      login(userData);
      setIsLoading(false);
      toast.success('Successfully logged in!');
      navigate('/admin'); // Or wherever
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
              <h2 className="text-4xl font-bold mb-4 leading-tight">Welcome Back to <br/> Freshness.</h2>
              <p className="text-green-100 text-lg">Sign in to reorder your favorites and manage your account.</p>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-green-600 hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" 
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

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">Remember me for 30 days</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-200 hover:shadow-lg mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 mb-6 relative text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <span className="relative bg-white px-4 text-sm text-gray-500">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 text-sm">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
               Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 text-sm">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px" fill="#1877F2"><path d="M24,12.073c0-6.627-5.373-12-12-12s-12,5.373-12,12c0,5.99,4.388,10.954,10.125,11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007,1.792-4.669,4.533-4.669c1.312,0,2.686,0.235,2.686,0.235v2.953H15.83c-1.491,0-1.956,0.925-1.956,1.874v2.25h3.328l-0.532,3.469h-2.796v8.385C19.612,23.027,24,18.062,24,12.073z"/></svg>
               Facebook
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account? {' '}
            <Link to="/register" className="text-green-600 font-bold hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
