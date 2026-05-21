import imgBroccoli from "../assets/images/Fresh Organic Apple.png"; // Placeholder for broccoli/apple
import imgBanana from "../assets/images/Farm-Fresh Produce.webp";
import imgEggs from "../assets/images/Free-Range Eggs.jpeg";
import imgBread from "../assets/images/pexels-muffin-1639930.jpg";
import imgBeef from "../assets/images/Grass-Fed Beef.avif";
import imgMilk from "../assets/images/Dairy & Eggs.png";
import imgSalmon from "../assets/images/Meat & Seafood.jpg";
import imgAvocado from "../assets/images/Organic Avocado.png";

export const categories = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Bakery",
  "Pantry",
  "Beverages"
];

export const products = [
  {
    id: "P001",
    name: "Fresh Organic Apple", // Renamed to match the image
    category: "Fruits & Vegetables",
    price: 4.99,
    oldPrice: 6.25,
    rating: 4.8,
    reviews: 128,
    image: imgBroccoli,
    description: "Experience the crisp, earthy flavor of our fresh organic apples. Hand-picked from local organic farms.",
    inStock: true,
    badges: ["Organic", "-20%"]
  },
  {
    id: "P002",
    name: "Farm-Fresh Produce", // Renamed to match the image
    category: "Fruits & Vegetables",
    price: 2.49,
    oldPrice: null,
    rating: 4.5,
    reviews: 85,
    image: imgBanana,
    description: "Naturally sweet and perfectly ripe farm-fresh produce.",
    inStock: true,
    badges: ["Fresh"]
  },
  {
    id: "P003",
    name: "Free-Range Brown Eggs",
    category: "Dairy & Eggs",
    price: 5.99,
    oldPrice: 7.50,
    rating: 4.9,
    reviews: 210,
    image: imgEggs,
    description: "Free-range, organic brown eggs from local family farms.",
    inStock: true,
    badges: ["Organic", "Local"]
  },
  {
    id: "P004",
    name: "Artisan Muffins", // Renamed to match image
    category: "Bakery",
    price: 6.49,
    oldPrice: null,
    rating: 4.7,
    reviews: 56,
    image: imgBread,
    description: "Artisan baked fresh muffins, crusty outside and soft inside.",
    inStock: true,
    badges: ["Fresh Baked"]
  },
  {
    id: "P005",
    name: "Grass-Fed Beef Ribeye",
    category: "Meat & Seafood",
    price: 18.99,
    oldPrice: 22.99,
    rating: 4.8,
    reviews: 142,
    image: imgBeef,
    description: "Premium cut, grass-fed beef ribeye, perfect for grilling.",
    inStock: true,
    badges: ["Premium", "Sale"]
  },
  {
    id: "P006",
    name: "Organic Whole Milk",
    category: "Dairy & Eggs",
    price: 4.29,
    oldPrice: null,
    rating: 4.6,
    reviews: 95,
    image: imgMilk,
    description: "Fresh, creamy organic whole milk from pasture-raised cows.",
    inStock: true,
    badges: []
  },
  {
    id: "P007",
    name: "Fresh Atlantic Seafood", // Renamed to match image
    category: "Meat & Seafood",
    price: 14.50,
    oldPrice: 16.00,
    rating: 4.7,
    reviews: 112,
    image: imgSalmon,
    description: "Wild-caught Atlantic seafood, rich in Omega-3.",
    inStock: true,
    badges: ["Wild Caught"]
  },
  {
    id: "P008",
    name: "Organic Avocados (Pack of 4)",
    category: "Fruits & Vegetables",
    price: 6.99,
    oldPrice: 8.50,
    rating: 4.9,
    reviews: 320,
    image: imgAvocado,
    description: "Perfectly ripe organic avocados, ideal for guacamole or toast.",
    inStock: true,
    badges: ["Best Seller"]
  }
];
