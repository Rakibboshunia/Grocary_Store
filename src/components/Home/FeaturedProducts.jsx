import { motion } from "framer-motion";
import { ShoppingBag, Star, Plus, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  
  // Get first 4 products for featured or filter by a 'featured' flag if we add one.
  const featuredProductsList = products.slice(0, 4);

  return (
    <section className="py-24 bg-[#FAFAFA] relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight"
            >
              Curated Selections
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg max-w-md"
            >
              Hand-picked premium quality products sourced for the best taste and health.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-gray-200 text-dark font-semibold hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
            >
              <ShoppingBag size={18} className="mr-2" /> View Full Catalog
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProductsList.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative flex flex-col"
            >
              {/* Floating Action Bar */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                </button>
              </div>
              
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3 py-1 bg-gray-100/80 backdrop-blur-md rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              
              <Link to={`/product/${product.id}`} className="block h-64 p-0 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </Link>
              
              <div className="p-6 pt-4 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 mb-3">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-dark">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-xl text-dark mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                
                <div className="flex justify-between items-end mt-auto pt-4">
                  <div>
                    <span className="text-sm text-gray-400 block mb-1">Price</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-extrabold text-dark">${product.price.toFixed(2)}</span>
                      {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-12 h-12 rounded-full bg-dark text-white flex items-center justify-center hover:bg-primary transition-colors shadow-lg group-hover:shadow-primary/30"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
