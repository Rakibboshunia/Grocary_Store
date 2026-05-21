import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  
  const tax = cartTotal * 0.05;
  const shipping = cartTotal > 0 ? 5.00 : 0;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
            <ShoppingBag size={64} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-max">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-gray-100 items-center">
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={20} />
                    </button>
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-50" />
                    <div>
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                      <div className="text-sm text-green-600 hidden md:block">In Stock</div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-sm text-gray-500">Price:</span>
                    <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-sm text-gray-500">Qty:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white h-10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-10 h-full flex items-center justify-center font-semibold text-sm text-gray-800 border-x border-gray-200">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                    <span className="md:hidden text-sm font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              {/* Actions */}
              <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <Link to="/shop" className="text-green-600 font-medium hover:text-green-700 transition-colors border border-green-600 hover:bg-green-50 px-6 py-2 rounded-lg flex items-center gap-2">
                   &larr; Continue Shopping
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cart Totals</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Have a coupon code?</p>
                  <div className="flex">
                    <input type="text" placeholder="Enter code" className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-green-500" />
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-900 transition-colors font-medium">Apply</button>
                  </div>
                </div>

                <Link to="/checkout" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
