import React, { useState } from 'react';
import { Save, Store, Globe, CreditCard, Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const SETTINGS_KEY = 'store_settings';

const defaultSettings = {
  storeName: 'DailyBasket Grocery',
  contactEmail: 'support@dailybasket.com',
  description: 'Fresh groceries delivered directly to your doorstep.',
  currency: 'USD ($)',
  timezone: '(GMT-05:00) Eastern Time',
  freeDeliveryMin: '50',
  taxRate: '8',
  emailNewOrder: true,
  emailLowStock: true,
  emailNewCustomer: false,
};

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch { return defaultSettings; }
  });

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general',       label: 'General',       icon: Store      },
    { id: 'payments',      label: 'Payments',      icon: CreditCard },
    { id: 'shipping',      label: 'Shipping',      icon: Globe      },
    { id: 'notifications', label: 'Notifications', icon: Mail       },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">Store Settings</h1>
          <p className="text-sm font-medium text-slate-500">Configure your store's behaviour and preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md shadow-emerald-500/20 transition-all w-full md:w-auto"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible w-full lg:w-56 shrink-0 pb-1 lg:pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm whitespace-nowrap w-max lg:w-full text-left
                ${activeTab === tab.id
                  ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                  : 'text-slate-500 hover:bg-white hover:text-slate-800 border border-transparent'}`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-emerald-500' : 'text-slate-400'} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100/60 p-6 md:p-10 space-y-8">

            {/* ─── General ─── */}
            {activeTab === 'general' && (
              <>
                <section>
                  <h2 className="text-base font-black text-slate-800 border-b border-slate-100 pb-4 mb-6 tracking-tight">Store Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Store Name</label>
                      <input type="text" value={settings.storeName} onChange={e => update('storeName', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:outline-none shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Contact Email</label>
                      <input type="email" value={settings.contactEmail} onChange={e => update('contactEmail', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:outline-none shadow-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Store Description</label>
                      <textarea rows="3" value={settings.description} onChange={e => update('description', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:outline-none shadow-sm resize-none" />
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-base font-black text-slate-800 border-b border-slate-100 pb-4 mb-6 tracking-tight">Regional & Currency</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Currency</label>
                      <select value={settings.currency} onChange={e => update('currency', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white cursor-pointer shadow-sm">
                        <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option><option>BDT (৳)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Timezone</label>
                      <select value={settings.timezone} onChange={e => update('timezone', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white cursor-pointer shadow-sm">
                        <option>(GMT-05:00) Eastern Time</option>
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT+06:00) Bangladesh Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Tax Rate (%)</label>
                      <input type="number" min="0" max="100" value={settings.taxRate} onChange={e => update('taxRate', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none shadow-sm" />
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* ─── Shipping ─── */}
            {activeTab === 'shipping' && (
              <section>
                <h2 className="text-base font-black text-slate-800 border-b border-slate-100 pb-4 mb-6 tracking-tight">Shipping Rules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Free Delivery Minimum Order ($)</label>
                    <input type="number" min="0" value={settings.freeDeliveryMin} onChange={e => update('freeDeliveryMin', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none shadow-sm" />
                    <p className="text-xs text-slate-400 mt-1.5">Orders above this amount get free delivery.</p>
                  </div>
                </div>
              </section>
            )}

            {/* ─── Payments ─── */}
            {activeTab === 'payments' && (
              <section>
                <h2 className="text-base font-black text-slate-800 border-b border-slate-100 pb-4 mb-6 tracking-tight">Payment Methods</h2>
                <div className="space-y-4">
                  {['Cash on Delivery', 'Credit / Debit Card', 'Mobile Banking (bKash)'].map(method => (
                    <label key={method} className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-300 transition-colors group">
                      <span className="font-bold text-slate-700 text-sm">{method}</span>
                      <div className="relative">
                        <input type="checkbox" defaultChecked={method === 'Cash on Delivery'}
                          className="peer w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer" />
                        <svg className="absolute w-3.5 h-3.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                          <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            )}

            {/* ─── Notifications ─── */}
            {activeTab === 'notifications' && (
              <section>
                <h2 className="text-base font-black text-slate-800 border-b border-slate-100 pb-4 mb-6 tracking-tight">Email Notifications</h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailNewOrder',    label: 'New Order Placed',        sub: 'Receive an email every time a new order is placed.' },
                    { key: 'emailLowStock',    label: 'Low Stock Alert',          sub: 'Be notified when a product is running out of stock.' },
                    { key: 'emailNewCustomer', label: 'New Customer Registered',  sub: 'Get notified when a new user signs up.' },
                  ].map(({ key, label, sub }) => (
                    <div key={key} className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-emerald-300 transition-colors">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                      </div>
                      <div className="relative ml-4 shrink-0">
                        <input type="checkbox" checked={settings[key]} onChange={e => update(key, e.target.checked)}
                          className="peer w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer" />
                        <svg className="absolute w-3.5 h-3.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                          <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
