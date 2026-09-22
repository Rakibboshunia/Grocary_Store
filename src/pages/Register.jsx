import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = register(form.name, form.email, form.password);
    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={30} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">Join us and start shopping</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" required className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Re-enter password" required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" />
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
