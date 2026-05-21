import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/Layout/AppLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminRoute from "./components/Auth/AdminRoute";

// Admin
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCustomers from "./pages/admin/Customers";
import AdminSettings from "./pages/admin/Settings";
import AdminOrders from "./pages/admin/Orders";

const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          // Adjust scroll position considering fixed header height
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            borderRadius: '1rem',
            padding: '12px 20px',
            fontWeight: 'bold',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#10B981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          },
        }}
      />
      <ScrollHandler />
      <Routes>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="products"  element={<AdminProducts />} />
          <Route path="orders"    element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="settings"  element={<AdminSettings />} />
        </Route>

        {/* Public & Customer Routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
