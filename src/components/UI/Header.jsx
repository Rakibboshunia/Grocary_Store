import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

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
            <Link to="/">
              <img src={logoImg} alt="DailyBasket" className="h-12 w-auto drop-shadow-sm" />
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex gap-8 items-center bg-white/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/50 shadow-sm">
            <Link to="/" className="text-dark hover:text-primary font-semibold text-sm transition-colors relative group">Home<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span></Link>
            <Link to="/shop" className="text-dark hover:text-primary font-semibold text-sm transition-colors relative group">Shop<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span></Link>
            <Link to="/#deals" className="text-dark hover:text-primary font-semibold text-sm transition-colors relative group">Deals<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span></Link>
            <Link to="/#about" className="text-dark hover:text-primary font-semibold text-sm transition-colors relative group">About<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span></Link>
            <Link to="/#contact" className="text-dark hover:text-primary font-semibold text-sm transition-colors relative group">Contact<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span></Link>
          </nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-4"
          >
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark hover:text-primary hover:shadow-md transition-all border border-gray-100">
              <Search size={18} />
            </button>
            <Link to="/cart" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark hover:text-primary hover:shadow-md transition-all border border-gray-100 relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">{cartCount}</span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-bold text-gray-500 hover:text-green-600 transition-colors hidden xl:block" title="Admin Panel">
                    Admin Panel
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity" title="My Profile">
                  <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-green-500 shadow-sm" />
                </Link>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
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
              <Link to="/shop" className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/#deals" className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Deals</Link>
              <Link to="/#about" className="block text-lg font-bold text-dark hover:text-primary transition-colors py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>About</Link>
              
              <div className="flex justify-between items-center pt-4">
                {user ? (
                  <div className="w-full">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 mb-4 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-green-500" />
                      <div>
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">View Profile</div>
                      </div>
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 w-full py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors mb-3">
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-red-50 text-red-600 w-full py-3 rounded-xl font-bold hover:bg-red-100 transition-colors">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="w-full space-y-3">
                    <Link to="/login" className="flex items-center justify-center gap-2 bg-dark text-white w-full py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>
                      <User size={18} /> Sign In
                    </Link>
                    <Link to="/register" className="flex items-center justify-center gap-2 bg-green-50 text-green-700 w-full py-3 rounded-xl font-bold hover:bg-green-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
                      Create Account
                    </Link>
                  </div>
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
