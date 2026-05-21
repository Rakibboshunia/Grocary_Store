import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Zap } from "lucide-react";
import coverImg from "../../assets/images/cover2.jpg";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[95vh] bg-dark"
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src={coverImg} 
          alt="Fresh Groceries" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        {/* Animated glowing orb */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
      </div>
      
      <div className="container-custom relative z-10 text-left w-full">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 text-green-300 font-semibold text-sm mb-6 border border-white/20 backdrop-blur-md"
          >
            <Leaf size={16} className="text-green-400" />
            <span>100% Organic Products Delivered Daily</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
          >
            Fresh, Fast, and at Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Doorstep</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed"
          >
            Experience the finest quality farm-fresh groceries delivered in minutes. Taste the true difference of organic and hand-picked essentials.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-5"
          >
            <a href="#shop" className="group relative inline-flex items-center justify-center bg-gradient-to-r from-primary to-green-600 text-white py-4 px-9 rounded-full font-bold overflow-hidden shadow-[0_0_20px_rgba(46,125,50,0.4)] hover:shadow-[0_0_30px_rgba(46,125,50,0.6)] transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a href="#deals" className="group inline-flex items-center justify-center bg-white/5 text-white backdrop-blur-md py-4 px-9 rounded-full font-bold border border-white/10 hover:bg-white/15 transition-all duration-300">
              <span className="flex items-center gap-2">
                <Zap size={18} className="text-yellow-400" /> View Weekly Deals
              </span>
            </a>
          </motion.div>

          {/* Premium trust badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex items-center gap-6 text-sm text-gray-400 font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-400" /> Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
              <span>Hassle-free Returns</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
