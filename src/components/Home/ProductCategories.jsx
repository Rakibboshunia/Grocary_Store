import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import fruitsImg from "../../assets/images/Fruits & Vegetables.png";
import dairyImg from "../../assets/images/Dairy & Eggs.png";
import meatImg from "../../assets/images/Meat & Seafood.jpg";
import snacksImg from "../../assets/images/Snacks & Beverages.jpeg";
import householdImg from "../../assets/images/Household Essentials.png";
import bakeryImg from "../../assets/images/pexels-jack-sparrow-4199191.jpg";
import beveragesImg from "../../assets/images/pexels-cokfotokandulu-7420502.jpg";
import careImg from "../../assets/images/pexels-kampus-8422693.jpg";
import frozenImg from "../../assets/images/pexels-pixabay-264636.jpg";

const categories = [
  { name: "Fruits & Veggies", img: fruitsImg, color: "bg-green-100", items: "120+ Items" },
  { name: "Dairy & Eggs", img: dairyImg, color: "bg-orange-100", items: "50+ Items" },
  { name: "Meat & Seafood", img: meatImg, color: "bg-red-100", items: "85+ Items" },
  { name: "Snacks & Drinks", img: snacksImg, color: "bg-yellow-100", items: "200+ Items" },
  { name: "Household", img: householdImg, color: "bg-blue-100", items: "95+ Items" },
  { name: "Bakery & Bread", img: bakeryImg, color: "bg-amber-100", items: "60+ Items" },
  { name: "Coffee & Tea", img: beveragesImg, color: "bg-orange-50", items: "110+ Items" },
  { name: "Personal Care", img: careImg, color: "bg-purple-100", items: "150+ Items" },
  { name: "Frozen Foods", img: frozenImg, color: "bg-cyan-100", items: "80+ Items" },
];

const ProductCategories = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="shop">
      {/* Decorative Blob */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight"
            >
              Shop by Categories
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-1.5 bg-primary rounded-full"
            ></motion.div>
          </div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#" 
            className="group hidden sm:inline-flex items-center text-dark font-bold hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary"
          >
            Explore All 
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pb-12">
          {categories.map((category, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full group cursor-pointer"
            >
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-5 transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(46,125,50,0.2)] group-hover:border-primary/20 h-full relative overflow-hidden">
                
                {/* Hover Reveal Gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${category.color}`}></div>

                <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center overflow-hidden p-0 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 relative z-10 shadow-lg border-4 border-white`}>
                  <img 
                    src={category.img} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center relative z-10">
                  <h3 className="font-bold text-dark text-lg md:text-xl group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 font-medium">{category.items}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
