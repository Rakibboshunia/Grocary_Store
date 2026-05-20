import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Rakib Boshunia", text: "The groceries were incredibly fresh, and delivery was super quick! Highly recommend this premium service.", img: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5 },
  { name: "Mahmudul Hasan", text: "I love the variety and top-tier quality of the products. Definitely my go-to place for weekly groceries!", img: "https://randomuser.me/api/portraits/men/46.jpg", rating: 5 },
  { name: "Ashikur Rahman", text: "Great service and hand-picked produce. I’m always highly satisfied with the seamless experience.", img: "https://randomuser.me/api/portraits/men/85.jpg", rating: 4 },
  { name: "Muhit Haquqe", text: "The packaging is exceptional, and they always deliver on time. A true lifesaver for busy weeks.", img: "https://randomuser.me/api/portraits/men/22.jpg", rating: 5 },
  { name: "Suraya Chayte", text: "Outstanding quality and very reasonable prices for the premium feel. Customer support is top-notch.", img: "https://randomuser.me/api/portraits/women/65.jpg", rating: 5 },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Loved by Our Customers
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1.5 bg-primary mx-auto rounded-full"
          ></motion.div>
        </div>
        
        <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-12 px-4 sm:px-0 snap-x hide-scrollbar">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[320px] sm:min-w-[420px] flex-shrink-0 snap-center bg-white/5 backdrop-blur-xl rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-colors duration-300 relative group"
            >
              <Quote className="absolute top-8 right-8 text-white/10 w-16 h-16 transform -scale-x-100 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg mb-10 relative z-10 leading-relaxed font-light">"{t.text}"</p>
              
              <div className="flex items-center gap-5 mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full blur group-hover:scale-110 transition-transform"></div>
                  <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover relative z-10 border-2 border-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{t.name}</h3>
                  <p className="text-sm text-primary font-medium">Verified Buyer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default Testimonials;
