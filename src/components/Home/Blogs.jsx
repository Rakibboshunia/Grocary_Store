import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import blog1 from "../../assets/images/pexels-cenali-2733918.jpg";
import blog2 from "../../assets/images/pexels-eduschadesoares-5498219.jpg";
import blog3 from "../../assets/images/pexels-gustavo-fring-4971911.jpg";

const blogs = [
  {
    title: "10 Benefits of Eating Organic Foods Daily",
    excerpt: "Discover how switching to organic produce can boost your immune system and overall health.",
    date: "Oct 15, 2026",
    author: "Admin",
    img: blog1,
    category: "Health"
  },
  {
    title: "How to Keep Your Vegetables Fresh Longer",
    excerpt: "Simple and effective storage hacks to prevent your fresh greens from spoiling quickly.",
    date: "Oct 12, 2026",
    author: "Admin",
    img: blog2,
    category: "Tips"
  },
  {
    title: "The Ultimate Guide to Sustainable Grocery Shopping",
    excerpt: "Learn how to make eco-friendly choices while stocking up your pantry for the week.",
    date: "Oct 08, 2026",
    author: "Admin",
    img: blog3,
    category: "Lifestyle"
  }
];

const Blogs = () => {
  return (
    <section className="py-24 bg-gray-50 relative" id="blog">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight"
            >
              Latest from the Blog
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-1.5 bg-primary rounded-full"
            ></motion.div>
          </div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#" 
            className="group hidden sm:inline-flex items-center text-dark font-bold hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary"
          >
            View All Posts
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden">
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </span>
                </div>
                <img 
                  src={blog.img} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={16} className="text-primary"/> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><User size={16} className="text-primary"/> {blog.author}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-dark mb-3 leading-snug group-hover:text-primary transition-colors cursor-pointer">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed mb-6 font-light line-clamp-2">
                  {blog.excerpt}
                </p>
                
                <a href="#" className="inline-flex items-center font-bold text-primary hover:text-green-700 transition-colors">
                  Read More <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-10 text-center sm:hidden">
          <a href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-gray-200 text-dark font-bold shadow-sm">
            View All Posts <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
