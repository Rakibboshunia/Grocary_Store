import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={44} className="text-pink-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8">Save your favourite products here to buy them later.</p>
        <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist <span className="text-green-600">({wishlistItems.length})</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            <Link to={`/product/${product.id}`} className="block h-48 overflow-hidden group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs text-green-600 font-semibold uppercase tracking-wider">{product.category}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3">{product.name}</h3>
              <p className="text-xl font-black text-gray-900 mb-4">${product.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => { addToCart(product); removeFromWishlist(product.id); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-11 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
