import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import NotFound from './NotFound';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useStore();
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID (do not fallback to [0] so we can show 404)
  const product = products.find(p => p.id === id);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: show toast or feedback
  };

  if (!product) return <NotFound />;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex gap-2">
          <span className="cursor-pointer hover:text-green-600" onClick={() => navigate('/')}>Home</span> &gt; 
          <span className="cursor-pointer hover:text-green-600" onClick={() => navigate('/shop')}>Shop</span> &gt; 
          <span>{product.category}</span> &gt; 
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center items-center">
              <div className="w-full max-w-md aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden relative group">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                {product.badges && product.badges.map((badge, idx) => (
                  <div key={idx} className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {badge}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 w-full max-w-md justify-center">
                 {[1,2,3].map(i => (
                    <button key={i} className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${i === 1 ? 'border-green-500' : 'border-gray-200'} hover:border-green-400 transition-colors`}>
                        <img src={product.image} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                 ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-2 text-sm text-green-600 font-semibold tracking-wider uppercase">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[1,2,3,4,5].map(s => <Star key={s} size={18} fill={s <= Math.round(product.rating) ? "#fbbf24" : "none"} stroke="#fbbf24" />)}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
                <span className={`text-sm font-medium px-2 py-1 rounded ${product.inStock ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && <span className="text-xl text-gray-400 line-through mb-1">${product.oldPrice.toFixed(2)}</span>}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg bg-white h-14 w-full sm:w-auto">
                  <button onClick={decrease} className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-l-lg transition-colors">
                    <Minus size={20} />
                  </button>
                  <div className="w-16 h-full flex items-center justify-center font-semibold text-lg text-gray-800 border-x border-gray-200">
                    {quantity}
                  </div>
                  <button onClick={increase} className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-r-lg transition-colors">
                    <Plus size={20} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 w-full h-14 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300"
                >
                  <ShoppingCart size={22} />
                  Add to Cart
                </button>

                {/* Action Buttons */}
                <button className="h-14 w-14 border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-colors">
                  <Heart size={22} />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-24">SKU:</span>
                  <span className="font-medium text-gray-900">{product.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-24">Category:</span>
                  <span className="font-medium text-gray-900">{product.category}</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-gray-500 w-24">Share:</span>
                  <div className="flex gap-3">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><Share2 size={18} /></button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Tabs for Details & Reviews */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="flex border-b border-gray-100">
             <button className="flex-1 py-4 text-center font-semibold text-green-600 border-b-2 border-green-600 bg-green-50/30">Description</button>
             <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">Additional Info</button>
             <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">Reviews ({product.reviews})</button>
           </div>
           <div className="p-8 text-gray-600 leading-relaxed space-y-4">
             <p>{product.description} We ensure that all our products meet the highest standards of quality and freshness.</p>
             <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Key Benefits:</h3>
             <ul className="list-disc pl-5 space-y-2">
               <li>100% natural and high quality.</li>
               <li>Sourced directly from verified suppliers.</li>
               <li>Carefully packaged to maintain freshness.</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
