import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { MapPin, CreditCard, Truck, ChevronRight } from "lucide-react";

const steps = ["Shipping", "Payment", "Review"];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "", city: "", zip: "",
    paymentMethod: "card", cardNumber: "", cardName: "", cardExpiry: "", cardCvv: "",
  });

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => setStep(s => Math.min(s + 1, 2));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handlePlaceOrder = () => {
    const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    clearCart();
    navigate("/order-success", { state: { orderId, total: (cartTotal * 1.05).toFixed(2) } });
  };

  const tax = cartTotal * 0.05;
  const total = (cartTotal + tax).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-6 md:mb-10">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-full font-semibold text-sm transition-all ${i === step ? "bg-green-600 text-white shadow-md" : i < step ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 ${i === step ? "border-white" : i < step ? "border-green-500 bg-green-500 text-white" : "border-gray-300"}`}>{i + 1}</span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight size={16} className="text-gray-300 mx-0.5 md:mx-1" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Form Area */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-8">

            {/* Step 1: Shipping */}
            {step === 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><MapPin className="text-green-600" size={20} /></div>
                  <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[["fullName", "Full Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"]].map(([name, label, type]) => (
                    <div key={name} className={name === "email" ? "sm:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={label} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="House no., Street, Area..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP Code" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><CreditCard className="text-green-600" size={20} /></div>
                  <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
                </div>
                <div className="space-y-4 mb-6">
                  {[["card", "Credit / Debit Card"], ["cod", "Cash on Delivery"]].map(([val, label]) => (
                    <label key={val} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.paymentMethod === val ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="paymentMethod" value={val} checked={form.paymentMethod === val} onChange={handleChange} className="accent-green-600 w-4 h-4" />
                      <span className="font-semibold text-gray-800">{label}</span>
                    </label>
                  ))}
                </div>
                {form.paymentMethod === "card" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" name="cardCvv" value={form.cardCvv} onChange={handleChange} placeholder="123" maxLength={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review */}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Truck className="text-green-600" size={20} /></div>
                  <h2 className="text-xl font-bold text-gray-800">Order Review</h2>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 mb-5">
                  <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wider">Delivery To</h3>
                  <p className="text-gray-800 font-semibold">{form.fullName}</p>
                  <p className="text-gray-600 text-sm">{form.address}, {form.city} {form.zip}</p>
                  <p className="text-gray-600 text-sm">{form.phone}</p>
                </div>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button onClick={handleBack} disabled={step === 0} className="px-6 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-600 hover:border-gray-300 disabled:opacity-40 transition-all">Back</button>
              {step < 2 ? (
                <button onClick={handleNext} className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all">Continue</button>
              ) : (
                <button onClick={handlePlaceOrder} className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all">Place Order</button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Shipping</span><span className="text-green-600 font-medium">Free</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Tax (5%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-black text-lg text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span><span className="text-green-600">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
