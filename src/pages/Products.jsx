import { useContext, useState, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import { productsData } from "../data/products";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = ["All", ...new Set(productsData.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const FilterContent = () => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <button
                onClick={() => { setSelectedCategory(category); setSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category ? "bg-green-100 text-green-700 font-medium" : "hover:bg-gray-100 text-gray-600"}`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Our Products</h1>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm font-medium text-sm"
        >
          <SlidersHorizontal size={16} />
          Filters {selectedCategory !== "All" && <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
            <FilterContent />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {/* Active filter badge on mobile */}
          {selectedCategory !== "All" && (
            <div className="flex items-center gap-2 mb-4 md:hidden">
              <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}><X size={14} /></button>
              </span>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm md:text-base">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-4 text-green-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <Link to={`/product/${product.id}`} className="block overflow-hidden h-36 sm:h-48 group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-3 md:p-5 flex flex-col flex-grow">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="text-[10px] md:text-xs text-green-600 font-semibold uppercase tracking-wider mb-1">{product.category}</div>
                      <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 hover:text-green-600 transition-colors leading-tight">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mt-auto pt-2 md:pt-4">
                      <span className="text-sm md:text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white p-1.5 md:p-2 rounded-full transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart size={16} className="md:hidden" />
                        <ShoppingCart size={20} className="hidden md:block" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
