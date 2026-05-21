import React, { useState } from 'react';
import { DollarSign, Users, ShoppingBag, ArrowUpRight, ArrowDownRight, Package, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, change, isPositive, icon: Icon, colorClass, gradientClass }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-100/50 p-6 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40 ${gradientClass}`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div>
        <p className="text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${colorClass}`}>
        <Icon size={26} />
      </div>
    </div>
    <div className="flex items-center gap-2.5 relative z-10">
      <span className={`flex items-center text-sm font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {isPositive ? <ArrowUpRight size={16} className="mr-0.5" /> : <ArrowDownRight size={16} className="mr-0.5" />}
        {change}
      </span>
      <span className="text-sm font-medium text-slate-400">vs last month</span>
    </div>
  </div>
);

const statusConfig = {
  Delivered: { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
  Pending:   { icon: Clock,        color: 'bg-amber-50 text-amber-600' },
  Cancelled: { icon: XCircle,      color: 'bg-rose-50 text-rose-600' },
};

const AdminDashboard = () => {
  const { products, customers, orders, updateOrderStatus } = useStore();
  const [dateFilter, setDateFilter] = useState('Last 7 days');

  // Derived stats
  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const activeProducts = products.filter(p => p.inStock).length;

  // Top products by mock sales rank (use array index as proxy)
  const topProducts = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-sm font-medium text-slate-500">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block p-3 outline-none shadow-sm cursor-pointer"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
          </select>
          <button className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md shadow-emerald-500/20 transition-all whitespace-nowrap">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(0)}`} change="+12.5%" isPositive={true} icon={DollarSign} colorClass="bg-emerald-50 text-emerald-600" gradientClass="bg-emerald-500" />
        <StatCard title="Total Orders"  value={totalOrders}  change="+8.2%"  isPositive={true} icon={ShoppingBag} colorClass="bg-blue-50 text-blue-600"    gradientClass="bg-blue-500" />
        <StatCard title="Customers"     value={totalCustomers} change="+2.4%" isPositive={true} icon={Users} colorClass="bg-indigo-50 text-indigo-600"  gradientClass="bg-indigo-500" />
        <StatCard title="In-Stock Products" value={activeProducts} change="-1.2%" isPositive={false} icon={Package} colorClass="bg-orange-50 text-orange-600" gradientClass="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-slate-100/80 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {orders.slice(0, 6).map(order => {
                  const cfg = statusConfig[order.status] || statusConfig.Pending;
                  return (
                    <tr key={order.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">#{order.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{order.customerName}</td>
                      <td className="px-6 py-4 font-black text-slate-800">${order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 w-max ${cfg.color}`}>
                          <cfg.icon size={12} /> {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white font-bold text-slate-700 cursor-pointer"
                        >
                          <option>Pending</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-slate-100/80 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Top Products</h2>
            <Link to="/admin/products" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl transition-colors">Manage</Link>
          </div>
          <div className="p-6 md:p-8 space-y-5 flex-1">
            {topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden border border-slate-100 group-hover:shadow-md transition-shadow">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">{product.name}</p>
                  <p className="text-xs font-medium text-slate-400 mt-1 truncate">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800">${product.price.toFixed(2)}</p>
                  <p className={`text-xs font-bold mt-1 ${product.inStock ? 'text-emerald-500' : 'text-rose-400'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
