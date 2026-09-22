import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { User, ShoppingBag, Heart, LogOut, ShoppingCart, Settings } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const { cartItems, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">You are not logged in</h2>
        <p className="text-gray-500 mb-8">Please login to view your profile.</p>
        <Link to="/login" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-md">
          Go to Login
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Card */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-4xl font-black text-white mx-auto mb-4 shadow-lg">
              {initials}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            <div className="mt-6 border-t border-gray-100 pt-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-all"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats & Quick Links */}
        <div className="md:w-2/3 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: ShoppingCart, label: "Items in Cart", value: cartCount, color: "bg-blue-50 text-blue-600", link: "/cart" },
              { icon: Heart, label: "Wishlist Items", value: "—", color: "bg-pink-50 text-pink-600", link: "/wishlist" },
            ].map(({ icon: Icon, label, value, color, link }) => (
              <Link to={link} key={label} className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-all group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                  <Icon size={26} />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500">{label}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-2">
              {[
                { icon: ShoppingBag, label: "Browse Products", link: "/products" },
                { icon: ShoppingCart, label: "View Cart", link: "/cart" },
                { icon: Heart, label: "My Wishlist", link: "/wishlist" },
              ].map(({ icon: Icon, label, link }) => (
                <Link to={link} key={label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-green-600">
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
