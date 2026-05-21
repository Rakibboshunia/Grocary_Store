import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, CheckCircle, Clock, XCircle, ShoppingBag } from 'lucide-react';

const statusConfig = {
  Delivered: { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
  Pending:   { icon: Clock,        color: 'bg-amber-50  text-amber-600'  },
  Cancelled: { icon: XCircle,      color: 'bg-rose-50   text-rose-600'   },
};

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount, 0);
  const pending = orders.filter(o => o.status === 'Pending').length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold text-white bg-emerald-600 flex items-center gap-2">
          <CheckCircle size={18} /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">Orders</h1>
          <p className="text-sm font-medium text-slate-500">{orders.length} total orders in your store.</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'text-emerald-600' },
          { label: 'Delivered',     value: delivered,                     color: 'text-blue-600'    },
          { label: 'Pending',       value: pending,                       color: 'text-amber-600'   },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100/60 shadow-sm p-5 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">{s.label}</span>
            <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100/60 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 md:p-6 border-b border-slate-100/80 flex flex-col sm:flex-row gap-4 items-center bg-slate-50/30">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm bg-white shadow-sm"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Pending', 'Delivered', 'Cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                  statusFilter === s
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="ml-auto text-sm font-bold text-slate-400 hidden sm:block">
            {filtered.length} orders
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
              <tr>
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Customer</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filtered.length > 0 ? (
                filtered.map(order => {
                  const cfg = statusConfig[order.status] || statusConfig.Pending;
                  return (
                    <tr key={order.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">#{order.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{order.customerName}</td>
                      <td className="px-6 py-4 text-slate-500">{order.date}</td>
                      <td className="px-6 py-4 font-black text-slate-800">${order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 w-max ${cfg.color}`}>
                          <cfg.icon size={12} /> {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={e => {
                            updateOrderStatus(order.id, e.target.value);
                            showToast(`Order #${order.id} marked as ${e.target.value}.`);
                          }}
                          className="text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white font-bold text-slate-700 cursor-pointer shadow-sm"
                        >
                          <option>Pending</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <ShoppingBag size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No orders found</h3>
                    <p className="text-slate-500 text-sm">Try changing your filter or search term.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
