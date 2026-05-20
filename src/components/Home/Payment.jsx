import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, ShieldCheck, CheckCircle } from "lucide-react";

const Payment = () => {
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatus("");
    setTimeout(() => {
      setIsProcessing(false);
      setStatus("Payment successful! Thank you for your order.");
    }, 2000);
  };

  return (
    <section className="py-24 bg-gray-50 relative" id="payment">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-[100px] pointer-events-none hidden lg:block"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark mb-6 tracking-tight">
              Secure <span className="text-primary">Checkout</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-md">
              Complete your purchase securely. Your data is protected with industry-leading 256-bit encryption.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark">Data Protection</h4>
                  <p className="text-sm text-gray-500">PCI-DSS compliant payment processing</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Lock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark">Secure Connection</h4>
                  <p className="text-sm text-gray-500">256-bit SSL encryption on all transactions</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 relative">
              
              <div className="bg-dark p-8 flex justify-between items-center text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Payment Details</h3>
                  <p className="text-gray-400 text-sm">Fill in your card information below</p>
                </div>
                <CreditCard size={32} className="text-primary opacity-80" />
              </div>
              
              <form className="p-8 space-y-6" onSubmit={handlePayment}>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2" htmlFor="name">
                    Cardholder Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50/50"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-2" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="cardNumber" 
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                      className="w-full pl-5 pr-12 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all tracking-widest font-mono bg-gray-50/50"
                      required 
                    />
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <CreditCard size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2" htmlFor="expiry">
                      Expiry Date
                    </label>
                    <input 
                      type="text" 
                      id="expiry" 
                      placeholder="MM/YY" 
                      maxLength="5"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-center tracking-widest font-mono bg-gray-50/50"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2" htmlFor="cvv">
                      CVV
                    </label>
                    <input 
                      type="password" 
                      id="cvv" 
                      placeholder="•••" 
                      maxLength="4"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-center tracking-widest font-mono bg-gray-50/50"
                      required 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-green-700 disabled:bg-primary/50 text-white font-bold py-5 rounded-2xl shadow-[0_10px_30px_-10px_rgba(46,125,50,0.5)] hover:shadow-[0_15px_40px_-15px_rgba(46,125,50,0.6)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 mt-4"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Lock size={20} /> Complete Secure Payment
                    </>
                  )}
                </button>
                
                {status && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl font-medium ${status.includes("successful") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                  >
                    {status.includes("successful") && <CheckCircle size={20} />}
                    {status}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
