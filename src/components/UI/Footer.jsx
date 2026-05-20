import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logoImg from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-24 pb-8 relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:pr-8">
            <div className="mb-6">
              <img src={logoImg} alt="DailyBasket" className="h-16 w-auto drop-shadow-md brightness-0 invert" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 font-light">
              We bring the freshest, premium quality groceries right to your doorstep. Experience modern grocery shopping with absolute convenience and trust.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {["Home", "Shop Catalog", "Special Deals", "About Us", "Contact Info"].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                    <ArrowRight size={14} className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Customer Service</h4>
            <ul className="space-y-4 text-gray-400">
              {["My Account", "Order Tracking", "Wishlist", "Returns Policy", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                    <ArrowRight size={14} className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <span>123 Fresh Valley Road, Organic City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span>hello@mrmstore.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} MRM Store. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
