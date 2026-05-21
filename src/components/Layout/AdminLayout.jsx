import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, LogOut, Menu, X, Bell, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin',            icon: <LayoutDashboard size={20} /> },
    { name: 'Products',  path: '/admin/products',   icon: <Package size={20} /> },
    { name: 'Orders',    path: '/admin/orders',     icon: <ShoppingBag size={20} /> },
    { name: 'Customers', path: '/admin/customers',  icon: <Users size={20} /> },
    { name: 'Settings',  path: '/admin/settings',   icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 bg-gradient-to-b from-slate-900 to-slate-950 text-white transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col shadow-2xl shadow-slate-900/20
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-20 px-6 bg-transparent border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">DailyBasket<span className="text-emerald-400">.</span></span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm group
                    ${isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 shadow-sm' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-5 bg-transparent border-t border-white/5">
          <div className="flex items-center gap-3 mb-5 px-1">
            <div className="relative">
              <img src={user?.avatar || "https://i.pravatar.cc/150"} alt="Admin" className="w-10 h-10 rounded-full border border-white/20 shadow-md object-cover" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.name || "Admin User"}</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors group">
            <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        
        {/* Topbar */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 lg:px-10 z-10 sticky top-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-500 hover:bg-white rounded-xl shadow-sm border border-slate-100 lg:hidden transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center gap-5">
            <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full shadow-sm"></span>
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <Link to="/" className="text-sm font-bold text-slate-600 hover:text-emerald-600 hidden sm:flex items-center gap-2 transition-colors px-3 py-1.5 rounded-lg hover:bg-emerald-50">
              View Store
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-10 scroll-smooth">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
