import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-gray-300 mb-6">
          <ShoppingBag size={80} className="mx-auto" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-sm md:text-base">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-colors shadow-md hover:shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-base md:text-xl font-semibold text-gray-800">Cart Items ({cartItems.length})</h2>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-xs md:text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4 md:p-6 flex items-center gap-3 md:gap-6 hover:bg-gray-50 transition-colors">
                  {/* Image */}
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-lg font-bold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs md:text-sm text-green-600 font-medium">{item.category}</p>
                    <p className="text-sm md:text-base font-bold text-gray-800 mt-1">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 md:p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 md:w-10 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 md:p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900 text-sm md:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-5 md:mb-6">Order Summary</h2>

            <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Tax (5%)</span>
                <span className="font-medium">${(cartTotal * 0.05).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6 md:mb-8">
              <div className="flex justify-between items-center">
                <span className="text-base md:text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl md:text-2xl font-black text-green-600">${(cartTotal * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
              Proceed to Checkout <ArrowRight size={20} />
            </Link>

            <div className="mt-4 text-center">
              <Link to="/products" className="text-green-600 hover:text-green-800 font-medium text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
