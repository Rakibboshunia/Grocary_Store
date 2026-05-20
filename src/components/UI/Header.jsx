import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import logoImg from "../../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
          >
            <img src={logoImg} alt="DailyBasket" className="h-12 w-auto drop-shadow-sm" />
          </motion.div>
          
          <nav className="hidden md:flex gap-8 items-center bg-white/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/50 shadow-sm">
            {["Home", "Shop", "Deals", "Payment", "About"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-dark hover:text-primary font-semibold text-sm transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-4"
          >
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark hover:text-primary hover:shadow-md transition-all border border-gray-100">
              <Search size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark hover:text-primary hover:shadow-md transition-all border border-gray-100 relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">3</span>
            </button>
            <button className="hidden lg:flex items-center gap-2 bg-dark text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <User size={16} /> Sign In
            </button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark shadow-sm border border-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden shadow-2xl absolute w-full"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {["Home", "Shop", "Deals", "Payment", "About"].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex justify-between items-center pt-4">
                <button className="flex items-center justify-center gap-2 bg-dark text-white w-full py-3 rounded-xl font-bold">
                  <User size={18} /> Account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
