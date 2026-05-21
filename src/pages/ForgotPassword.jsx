import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for Password Reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full mx-4 border border-gray-100 p-8">
        
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-500 mb-8">
              We've sent a password reset link to <br/>
              <span className="font-semibold text-gray-800">{email}</span>
            </p>
            <Link 
              to="/login" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-200 hover:shadow-lg"
            >
              <ArrowLeft size={18} /> Back to Login
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
              <p className="text-gray-500 text-sm">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your email" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading || !email}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center transition-all shadow-md shadow-green-200 hover:shadow-lg"
              >
                {isLoading ? 'Sending...' : 'Reset Password'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-green-600 flex items-center justify-center gap-2">
                <ArrowLeft size={16} /> Back to log in
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
