import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Package, Home, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {
  const { state } = useLocation();
  const orderId = state?.orderId || "ORD-XXXXXXX";
  const total = state?.total || "0.00";

  const today = new Date();
  const delivery = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  const deliveryDate = delivery.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle size={52} className="text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Package size={18} />
              <span className="font-medium">Order ID</span>
            </div>
            
            <span className="font-bold text-green-600 font-mono text-sm">{orderId}</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="text-gray-600 font-medium">Total Paid</span>
            <span className="font-black text-gray-900 text-lg">${total}</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="text-gray-600 font-medium">Estimated Delivery</span>
            <span className="font-semibold text-gray-800 text-sm">{deliveryDate}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all"
          >
            <Home size={18} /> Go Home
          </Link>
          <Link
            to="/products"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <ShoppingBag size={18} /> Shop More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
