import { motion } from "framer-motion";
import { ArrowRight, Tag, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import offer1Img from "../../assets/images/pexels-holmboe-14349176.jpg";
import offer2Img from "../../assets/images/pexels-michael-burrows-7129160.jpg";

const SpecialOffers = () => {
  return (
    <section className="py-24 bg-white relative" id="deals">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight flex items-center gap-3"
            >
              Special <span className="text-primary">Offers</span> <Tag className="text-orange-500" size={40} />
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg max-w-md"
            >
              Grab these exclusive deals before they run out! Freshness guaranteed at unbeatable prices.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Offer Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden group shadow-lg h-[350px] sm:h-[400px]"
          >
            <img src={offer1Img} alt="Fresh Fruits Offer" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center text-white w-full sm:w-[70%]">
              <span className="inline-block px-4 py-1.5 bg-orange-500 text-white font-bold rounded-full text-xs uppercase tracking-wider mb-4 w-max shadow-lg animate-[pulse_2s_ease-in-out_infinite]">
                Limited Time
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                Get <span className="text-orange-400">50% Off</span> on Fresh Fruits
              </h3>
              <p className="text-gray-200 mb-8 leading-relaxed font-light text-lg">
                Start your day healthy. Use code <strong className="text-white border-b border-dashed border-white pb-0.5">FRESH50</strong> at checkout.
              </p>
              <Link to="/shop" className="inline-flex items-center justify-center bg-white text-dark py-4 px-8 rounded-full font-bold hover:bg-primary hover:text-white transition-colors w-max shadow-xl">
                Shop Now <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </motion.div>

          {/* Offer Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[2.5rem] overflow-hidden group shadow-lg h-[350px] sm:h-[400px]"
          >
            <img src={offer2Img} alt="Weekly Grocery Deal" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-800/60 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center text-white w-full sm:w-[70%]">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md text-white font-bold rounded-full text-xs uppercase tracking-wider mb-4 w-max border border-white/30">
                <Clock size={14} /> Ends in 2 Days
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                Buy 1 Get 1 <span className="text-yellow-400">Free</span> Everyday Items
              </h3>
              <p className="text-green-50 mb-8 leading-relaxed font-light text-lg">
                Stock up your pantry with our weekly essentials mega sale.
              </p>
              <Link to="/shop" className="inline-flex items-center justify-center bg-primary text-white py-4 px-8 rounded-full font-bold hover:bg-green-700 transition-colors w-max shadow-xl border border-green-400/50">
                Claim Offer <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
