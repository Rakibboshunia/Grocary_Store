import { motion } from "framer-motion";
import { CheckCircle2, Leaf, Clock } from "lucide-react";
import storyImg from "../../assets/images/shop story3.png";

const AboutUs = () => {
  return (
    <section className="py-24 bg-white overflow-hidden" id="about">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative group"
          >
            {/* Premium background styling for image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-green-200/20 rounded-[3rem] transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-in-out"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-700 ease-in-out"></div>
            
            <img 
              src={storyImg} 
              alt="Our Story" 
              className="relative z-10 w-full h-[500px] rounded-[3rem] shadow-2xl object-cover border-8 border-white"
            />
            
            {/* Floating badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 z-20 bg-white p-6 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-primary">
                  <span className="text-xl font-bold">4+</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Years of Service</h4>
                  <p className="text-sm text-gray-500">Trusted locally</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-widest text-xs mb-6">
              <Leaf size={14} /> Our Story
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark mb-8 leading-tight tracking-tight">
              Bringing Farm-Fresh <span className="text-primary">Goodness</span> to Your Table
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed mb-10">
              <p>
                At <strong className="text-dark font-bold">DailyBasket</strong>, we are passionate about bringing fresh, organic groceries right to your doorstep. Our mission is to provide the highest quality products while supporting local farmers and sustainable practices.
              </p>
              <p>
                Founded in 2020, we have quickly become a trusted source for healthy and affordable food options. From farm-fresh produce to premium meats and dairy, we are committed to offering our customers only the best.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg mb-1">100% Organic</h4>
                  <p className="text-sm text-gray-500">Certified organic products from trusted farms.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg mb-1">Fast Delivery</h4>
                  <p className="text-sm text-gray-500">Same-day delivery directly to your door.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
