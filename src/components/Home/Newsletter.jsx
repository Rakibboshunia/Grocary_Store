import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-900/40 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20"
        >
          <Mail size={32} className="text-white" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md"
        >
          Stay Fresh, Stay Updated
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-green-50 mb-12 text-lg md:text-xl font-light max-w-2xl mx-auto"
        >
          Subscribe to our newsletter to get the latest updates on fresh products, weekly discounts, and exclusive offers straight to your inbox!
        </motion.p>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" 
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full pl-14 pr-6 py-5 rounded-full text-dark bg-white focus:outline-none focus:ring-4 focus:ring-green-400/50 transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] font-medium text-lg"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="group bg-dark hover:bg-gray-900 text-white py-5 px-10 rounded-full font-bold transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center whitespace-nowrap"
          >
            Subscribe Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-green-100 mt-6 opacity-80"
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;
