import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', detectSize);
      clearTimeout(timer);
    }
  }, []);

  // Generate a random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
      {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} recycle={false} numberOfPieces={500} />}
      
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Order Successful!</h1>
          <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
            Thank you for shopping with us. Your order has been placed and is currently being processed.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100 inline-block text-left min-w-[250px]">
            <div className="text-sm text-gray-500 mb-1">Order Number</div>
            <div className="text-2xl font-bold text-dark mb-4">#{orderNumber}</div>
            <div className="text-sm text-gray-500 mb-1">Estimated Delivery</div>
            <div className="text-lg font-semibold text-green-600">Tomorrow, 10:00 AM - 12:00 PM</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/shop')}
              className="inline-flex items-center justify-center bg-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl group"
            >
              <ShoppingBag size={20} className="mr-2" />
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center bg-green-50 text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-green-100 transition-all group"
            >
              Back to Home
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
