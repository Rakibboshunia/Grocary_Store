import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const initialCustomers = [
  { id: 'C001', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234-567-8901', orders: 15, spent: 452.50, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 'C002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 234-567-8902', orders: 8, spent: 230.00, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'C003', name: 'Robert Johnson', email: 'robert.j@example.com', phone: '+1 234-567-8903', orders: 2, spent: 45.90, status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 'C004', name: 'Emily Davis', email: 'emily.d@example.com', phone: '+1 234-567-8904', orders: 24, spent: 890.20, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const initialOrders = [
  { id: 'ORD-9001', customerId: 'C001', customerName: 'John Doe', date: 'May 21, 2026', amount: 45.99, status: 'Delivered' },
  { id: 'ORD-9002', customerId: 'C002', customerName: 'Jane Smith', date: 'May 20, 2026', amount: 120.50, status: 'Pending' },
  { id: 'ORD-9003', customerId: 'C004', customerName: 'Emily Davis', date: 'May 19, 2026', amount: 15.20, status: 'Delivered' },
  { id: 'ORD-9004', customerId: 'C003', customerName: 'Robert Johnson', date: 'May 18, 2026', amount: 230.00, status: 'Delivered' },
];

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('store_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('store_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('store_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('store_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('store_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('store_orders', JSON.stringify(orders));
  }, [orders]);

  // Product Actions
  const addProduct = (product) => setProducts(prev => [product, ...prev]);
  const updateProduct = (id, updatedProduct) => setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  // Customer Actions
  const addCustomer = (customer) => setCustomers(prev => [customer, ...prev]);
  const updateCustomer = (id, updatedCustomer) => setCustomers(prev => prev.map(c => c.id === id ? updatedCustomer : c));
  const deleteCustomer = (id) => setCustomers(prev => prev.filter(c => c.id !== id));

  // Order Actions
  const addOrder = (order) => setOrders(prev => [order, ...prev]);
  const updateOrderStatus = (id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

  return (
    <StoreContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      customers, addCustomer, updateCustomer, deleteCustomer,
      orders, addOrder, updateOrderStatus
    }}>
      {children}
    </StoreContext.Provider>
  );
};
