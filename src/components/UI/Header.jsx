import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import logoImg from "../../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useContext(CartContext);
  const { user } = useAuth();

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
          <Link to="/" className="flex items-center cursor-pointer">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img src={logoImg} alt="DailyBasket" className="h-12 w-auto drop-shadow-sm" />
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex gap-8 items-center bg-white/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/50 shadow-sm">
            <NavLink to="/" end className={({isActive}) => `font-semibold text-sm transition-colors relative group ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}>
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/products" className={({isActive}) => `font-semibold text-sm transition-colors relative group ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}>
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/wishlist" className={({isActive}) => `font-semibold text-sm transition-colors relative group ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}>
              Wishlist
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-3"
          >
            <Link to="/wishlist" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark hover:text-red-500 hover:shadow-md transition-all border border-gray-100">
              <Heart size={18} />
            </Link>
            <Link to="/cart" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark hover:text-primary hover:shadow-md transition-all border border-gray-100 relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">{cartCount}</span>
              )}
            </Link>
            {user ? (
              <Link to="/profile" className="hidden lg:flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-full text-sm font-bold hover:bg-green-700 transition-colors shadow-lg">
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-[10px] font-black">{user.name[0].toUpperCase()}</div>
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link to="/login" className="hidden lg:flex items-center gap-2 bg-dark text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <User size={16} /> Sign In
              </Link>
            )}
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
              <Link to="/" className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/wishlist" className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
              <Link to="/cart" className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
              <div className="pt-4">
                {user ? (
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-green-600 text-white w-full py-3 rounded-xl font-bold">
                    <User size={18} /> {user.name.split(" ")[0]}'s Profile
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-dark text-white w-full py-3 rounded-xl font-bold">
                    <User size={18} /> Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
