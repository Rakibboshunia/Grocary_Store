import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import review1 from "../../assets/images/customer review1.png";
import review2 from "../../assets/images/customer review2.png";
import review3 from "../../assets/images/customer review3.png";
import review4 from "../../assets/images/customer review4.png";
import review5 from "../../assets/images/customer review5.png";

const testimonials = [
  { name: "Rakib Boshunia", text: "The groceries were incredibly fresh, and delivery was super quick! Highly recommend this premium service.", img: review1, rating: 5 },
  { name: "Mahmudul Hasan", text: "I love the variety and top-tier quality of the products. Definitely my go-to place for weekly groceries!", img: review2, rating: 5 },
  { name: "Ashikur Rahman", text: "Great service and hand-picked produce. I’m always highly satisfied with the seamless experience.", img: review3, rating: 4 },
  { name: "Muhit Haquqe", text: "The packaging is exceptional, and they always deliver on time. A true lifesaver for busy weeks.", img: review4, rating: 5 },
  { name: "Suraya Chayte", text: "Outstanding quality and very reasonable prices for the premium feel. Customer support is top-notch.", img: review5, rating: 5 },
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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pb-12"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full pb-16 pt-4 px-4"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-colors duration-300 relative group h-full flex flex-col mx-2 sm:mx-0">
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet {
          background-color: #fff;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #4ade80; /* Tailwind green-400 */
          opacity: 1;
        }
      `}} />
    </section>
  );
};

export default Testimonials;
