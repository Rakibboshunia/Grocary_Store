import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Star, Grid, List, X, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const Shop = () => {
  const { addToCart } = useCart();

  // View state
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Find max price to set range slider limit
  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map(p => p.price))), []);
  const [priceLimit, setPriceLimit] = useState(maxPrice);
  
  const [sortBy, setSortBy] = useState('default');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, priceLimit, inStockOnly, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const removeCategory = (categoryToRemove) => {
    setSelectedCategories(prev => prev.filter(c => c !== categoryToRemove));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceLimit(maxPrice);
    setSearchTerm('');
    setSortBy('default');
    setInStockOnly(false);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Search Filter
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.description.toLowerCase().includes(lowerSearch) ||
        p.category.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    
    // Price Filter
    result = result.filter(p => p.price <= priceLimit);
    
    // In Stock Filter
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return result;
  }, [searchTerm, selectedCategories, priceLimit, inStockOnly, sortBy, maxPrice]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters = selectedCategories.length > 0 || priceLimit < maxPrice || searchTerm || inStockOnly;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Our Products</h1>
            <p className="text-gray-500">Fresh and high-quality groceries delivered to your door.</p>
          </div>
          <button 
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar for Filters (Desktop & Mobile drawer) */}
          <div className={`
            fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:static lg:z-auto transition-opacity duration-300
            ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}
          `}>
            <div className={`
              fixed lg:static top-0 right-0 h-full w-80 lg:w-64 bg-white lg:bg-transparent shadow-2xl lg:shadow-none p-6 lg:p-0 overflow-y-auto lg:overflow-visible transition-transform duration-300 ease-in-out
              ${showMobileFilters ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}>
              <div className="flex justify-between items-center lg:hidden mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Search Bar */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Search</h3>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2.5">
                    {categories.map((cat, idx) => (
                      <li key={idx}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input 
                              type="checkbox" 
                              className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-1 checked:bg-green-500 checked:border-green-500 transition-all cursor-pointer"
                              checked={selectedCategories.includes(cat)}
                              onChange={() => handleCategoryChange(cat)}
                            />
                            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                              <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Range */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max={maxPrice} 
                      step="0.5"
                      value={priceLimit}
                      onChange={(e) => setPriceLimit(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500" 
                    />
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">$0</span>
                      <span className="text-gray-400">-</span>
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded">${priceLimit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Availability</h3>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">In Stock Only</span>
                  </label>
                </div>
                
                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <button 
                    onClick={clearAllFilters}
                    className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 font-medium">
                Showing <span className="text-gray-900 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span>-
                <span className="text-gray-900 font-bold">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="text-gray-900 font-bold">{filteredProducts.length}</span> results
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-sm text-gray-500 whitespace-nowrap hidden sm:block">Sort by:</label>
                  <select 
                    className="w-full sm:w-auto border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 bg-gray-50 cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Default Sorting</option>
                    <option value="rating">Top Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
                {selectedCategories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    {cat}
                    <button onClick={() => removeCategory(cat)} className="hover:text-green-900"><X size={12} /></button>
                  </span>
                ))}
                {priceLimit < maxPrice && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    Up to ${priceLimit}
                    <button onClick={() => setPriceLimit(maxPrice)} className="hover:text-blue-900"><X size={12} /></button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    In Stock
                    <button onClick={() => setInStockOnly(false)} className="hover:text-purple-900"><X size={12} /></button>
                  </span>
                )}
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-red-500 hover:text-red-700 underline font-medium ml-2"
                >
                  Clear All
                </button>
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md mb-6">We couldn't find any products matching your current filters. Try adjusting your search or category selection.</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }>
                {currentProducts.map(product => (
                  <div 
                    key={product.id} 
                    className={`
                      bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:border-green-200 transition-all duration-300
                      ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}
                    `}
                  >
                    {/* Image Section */}
                    <div className={`
                      bg-gray-50 relative p-4 flex items-center justify-center
                      ${viewMode === 'list' ? 'w-full sm:w-48 sm:h-auto h-56 shrink-0' : 'h-56'}
                    `}>
                      <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm" />
                      </Link>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.badges && product.badges.map((badge, idx) => (
                          <span key={idx} className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm tracking-wider uppercase inline-block w-max">
                            {badge}
                          </span>
                        ))}
                        {!product.inStock && (
                          <span className="bg-gray-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm tracking-wider uppercase inline-block w-max">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      
                      {viewMode === 'grid' && (
                        <button 
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="absolute bottom-4 right-4 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-700 transition-all transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                        >
                          <ShoppingCart size={20} />
                        </button>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className={`p-5 flex-1 flex flex-col ${viewMode === 'list' ? 'justify-center' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-xs text-green-600 font-bold uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-md inline-block">{product.category}</div>
                        
                        {viewMode === 'list' && (
                           <div className="flex items-center gap-2">
                             <span className="font-extrabold text-xl text-gray-900">${product.price.toFixed(2)}</span>
                             {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>}
                           </div>
                        )}
                      </div>
                      
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-green-600 transition-colors line-clamp-2">{product.name}</h3>
                      </Link>
                      
                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                      )}

                      <div className="flex items-center gap-1 mb-4">
                         {[1,2,3,4,5].map(s => (
                           <Star key={s} size={14} fill={s <= Math.round(product.rating) ? "#fbbf24" : "none"} stroke={s <= Math.round(product.rating) ? "#fbbf24" : "#d1d5db"} />
                         ))}
                         <span className="text-xs text-gray-500 ml-1.5 font-medium">({product.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        {viewMode === 'grid' && (
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xl text-gray-900">${product.price.toFixed(2)}</span>
                            {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>}
                          </div>
                        )}
                        
                        {viewMode === 'list' && (
                          <button 
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 transition-colors shadow-sm shadow-green-200"
                          >
                            <ShoppingCart size={18} />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Dynamic Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-green-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all shadow-sm
                      ${currentPage === i + 1 
                        ? 'bg-green-600 text-white shadow-md shadow-green-200 border-none' 
                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-green-600'
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-green-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
