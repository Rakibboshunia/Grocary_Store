import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Mail, Phone, Edit, Trash2, Plus, X, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const statusOptions = ['Active', 'Inactive', 'New'];
const emptyForm = { name: '', email: '', phone: '', status: 'New', avatar: '' };

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':   return 'bg-emerald-50 text-emerald-600';
    case 'Inactive': return 'bg-slate-100 text-slate-600';
    case 'New':      return 'bg-indigo-50 text-indigo-600';
    default:         return 'bg-slate-100 text-slate-600';
  }
};

const AdminCustomers = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAdd = () => { setEditingId(null); setFormData(emptyForm); setIsModalOpen(true); };
  const openEdit = (c) => {
    setEditingId(c.id);
    setFormData({ name: c.name, email: c.email, phone: c.phone, status: c.status, avatar: c.avatar });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this customer?')) {
      deleteCustomer(id);
      toast.success('Customer deleted.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const existing = customers.find(c => c.id === editingId);
      updateCustomer(editingId, { ...existing, ...formData });
      toast.success('Customer updated.');
    } else {
      addCustomer({
        id: `C${Date.now()}`,
        ...formData,
        orders: 0,
        spent: 0,
        avatar: formData.avatar || `https://i.pravatar.cc/150?u=${Date.now()}`,
      });
      toast.success('Customer added.');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">Customers</h1>
          <p className="text-sm font-medium text-slate-500">{customers.length} registered customers.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md shadow-emerald-500/20 w-full sm:w-auto"
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100/60 overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-100/80 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm bg-white shadow-sm transition-all"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm w-full sm:w-auto text-center">
            {filtered.length} / {customers.length} Customers
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
              <tr>
                <th className="px-6 py-5">Customer</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5">Orders</th>
                <th className="px-6 py-5">Total Spent</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filtered.length > 0 ? (
                filtered.map(c => (
                  <tr key={c.id} className="bg-white hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" />
                        <div>
                          <div className="font-bold text-slate-800">{c.name}</div>
                          <div className="text-xs font-medium text-slate-400">ID: {c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 text-xs">
                        <span className="flex items-center gap-2 font-medium text-slate-600"><Mail size={13} className="text-slate-400" />{c.email}</span>
                        <span className="flex items-center gap-2 font-medium text-slate-600"><Phone size={13} className="text-slate-400" />{c.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-800">{c.orders}</td>
                    <td className="px-6 py-4 font-black text-slate-800">${Number(c.spent).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg inline-block w-max ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(c)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors" title="Edit"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(c.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300"><Users size={32} /></div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No customers found</h3>
                    <p className="text-slate-500 text-sm">Try a different search or add a new customer.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md my-8 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-800">{editingId ? 'Edit Customer' : 'Add Customer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:bg-slate-100 p-2 rounded-xl transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none shadow-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none shadow-sm" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none shadow-sm" placeholder="+1 234-567-890" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white cursor-pointer shadow-sm">
                    {statusOptions.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all">{editingId ? 'Save Changes' : 'Add Customer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
