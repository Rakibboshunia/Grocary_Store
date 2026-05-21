import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import appImg from "../../assets/images/pexels-kezia-rhesa-arman-11926079-7552225.jpg";

const AppDownload = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="bg-dark rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col lg:flex-row items-center justify-between">
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

          <div className="lg:w-1/2 p-12 lg:p-20 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              Get the <span className="text-primary">DailyBasket</span> App
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-lg mb-10 leading-relaxed font-light max-w-md"
            >
              Order your favorite groceries on the go! Enjoy app-exclusive discounts, real-time order tracking, and ultra-fast 30-minute delivery.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#" className="flex items-center gap-3 bg-white text-dark px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-lg group">
                <Apple size={28} className="group-hover:-translate-y-1 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-gray-500 leading-none">Download on the</p>
                  <p className="text-lg font-bold leading-none mt-1">App Store</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3.5 rounded-xl hover:bg-white/20 transition-colors shadow-lg group">
                <Play size={28} className="text-primary group-hover:-translate-y-1 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-gray-300 leading-none">GET IT ON</p>
                  <p className="text-lg font-bold leading-none mt-1">Google Play</p>
                </div>
              </a>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full h-[400px] lg:h-auto relative flex justify-end">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[120%]"
            >
              <img 
                src={appImg} 
                alt="Grocery Delivery App" 
                className="w-full h-full object-cover object-left rounded-tl-[3rem] lg:rounded-tl-none lg:rounded-l-[4rem]"
                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/50 to-transparent lg:w-1/2"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
