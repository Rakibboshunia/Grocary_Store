import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "../data/products";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, ArrowLeft, Star, Plus, Minus, Check, Heart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, name: "John Doe", rating: 5, comment: "Great quality, highly recommended!" },
    { id: 2, name: "Jane Smith", rating: 4, comment: "Very fresh but a bit pricey." }
  ]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  const inWishlist = isInWishlist(parseInt(id));

  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you are looking for does not exist.</p>
        <Link to="/products" className="text-green-600 font-medium hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add multiple quantities by calling addToCart multiple times (simplified for this demo)
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, { id: Date.now(), ...newReview }]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  const averageRating = reviews.length ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-8 font-medium">
        <ArrowLeft size={18} /> Back to Products
      </Link>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 h-96 md:h-auto bg-gray-100 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.inStock && (
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                In Stock
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2 p-5 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="text-sm text-green-600 font-bold uppercase tracking-widest mb-2">{product.category}</div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.round(averageRating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="font-bold text-gray-700">{averageRating}</span>
              <span className="text-gray-500 text-sm">({reviews.length} Reviews)</span>
            </div>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5 md:mb-8 border-b border-gray-100 pb-5 md:pb-8">
              {product.description}
            </p>

            <div className="text-3xl md:text-4xl font-black text-gray-900 mb-5 md:mb-8">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-xl h-14 w-full sm:w-auto">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-gray-600 hover:text-green-600 transition-colors h-full flex items-center justify-center"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-gray-600 hover:text-green-600 transition-colors h-full flex items-center justify-center"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <button
                onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                  inWishlist ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
                }`}
                title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={22} fill={inWishlist ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${
                  added 
                    ? 'bg-green-500 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white hover:-translate-y-1'
                }`}
              >
                {added ? (
                  <><Check size={24} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={24} /> Add to Cart</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-6">Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            ) : (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{review.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Poor</option>
                  <option value={1}>1 Star - Terrible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors w-full md:w-auto"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
