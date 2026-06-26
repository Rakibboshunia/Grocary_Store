import React, { useState } from 'react';
import { CreditCard, Wallet, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useStore } from '../context/StoreContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const tax = cartTotal * 0.05;
  const shipping = cartTotal > 0 ? 5.00 : 0;
  const finalTotal = cartTotal + tax + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    
    // Create new order object
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: `C${Math.floor(100 + Math.random() * 900)}`, // Mock customer ID
      customerName: `${firstName} ${lastName}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: finalTotal,
      status: 'Pending'
    };
    
    // Simulate API call for order processing
    setTimeout(() => {
      addOrder(newOrder); // Add to admin dashboard!
      clearCart();
      setIsSubmitting(false);
      toast.success('Order placed successfully!');
      navigate('/success');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">You cannot checkout without items in your cart.</p>
            <Link to="/shop" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="lg:w-2/3 space-y-8">
              
              {/* Billing Details */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Billing & Shipping Details</h2>
                <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input name="firstName" required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input name="lastName" required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Optional)</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="House number and street name" />
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Apartment, suite, unit, etc. (optional)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Town / City *</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postcode / ZIP *</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input required type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border border-green-500 rounded-xl cursor-pointer bg-green-50/30">
                    <input type="radio" name="payment" className="w-5 h-5 text-green-600 focus:ring-green-500 accent-green-600" defaultChecked />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 block">Cash on Delivery</span>
                      <span className="text-sm text-gray-500">Pay with cash upon delivery.</span>
                    </div>
                    <Truck className="text-gray-400" />
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="payment" className="w-5 h-5 text-green-600 focus:ring-green-500 accent-green-600" />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 block">Credit Card</span>
                      <span className="text-sm text-gray-500">Visa, MasterCard, Amex</span>
                    </div>
                    <CreditCard className="text-gray-400" />
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="payment" className="w-5 h-5 text-green-600 focus:ring-green-500 accent-green-600" />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 block">Mobile Banking</span>
                      <span className="text-sm text-gray-500">bKash, Nagad, Rocket</span>
                    </div>
                    <Wallet className="text-gray-400" />
                  </label>
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24 border-t-4 border-t-green-500">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Order</h2>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between border-b pb-4">
                    <span className="font-semibold text-gray-700">Product</span>
                    <span className="font-semibold text-gray-700">Subtotal</span>
                  </div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-600 line-clamp-1 flex-1 pr-4">{item.name} <span className="font-semibold">x {item.quantity}</span></span>
                      <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6 pt-2">
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
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-green-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>

                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
