import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "We offer express delivery within 2 hours for standard orders. For bulk orders, please allow up to 4 hours. You can also schedule your delivery for a specific time slot during checkout."
  },
  {
    question: "What is your return policy for fresh produce?",
    answer: "We have a 100% freshness guarantee. If you are not satisfied with the quality of any fresh produce, simply notify us within 24 hours of delivery, and we will issue a full refund or replacement, no questions asked."
  },
  {
    question: "Is there a minimum order amount for free delivery?",
    answer: "Yes, standard delivery is free for all orders above $50. For orders below $50, a nominal delivery fee of $4.99 applies."
  },
  {
    question: "How are cold items packed to stay fresh?",
    answer: "All temperature-sensitive items like meat, dairy, and frozen foods are packed in insulated cooling bags with dry ice to ensure they remain at the perfect temperature until they reach your doorstep."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-light relative" id="faq">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-dark mb-6 tracking-tight"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-1.5 bg-primary rounded-full mb-8"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg mb-8"
            >
              Have a different question and can’t find the answer you’re looking for? Reach out to our support team!
            </motion.p>
            <a href="#" className="inline-block text-primary font-bold hover:text-green-700 transition-colors border-b-2 border-primary pb-1">
              Contact Customer Support
            </a>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-lg text-dark pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
                      size={24} 
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-6 text-gray-500 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
