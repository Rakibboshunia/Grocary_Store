import { motion } from "framer-motion";
import { Truck, Leaf, ShieldCheck, ThumbsUp } from "lucide-react";

const features = [
  {
    title: "Same-Day Delivery",
    desc: "Lightning-fast, eco-friendly delivery directly to your home within hours.",
    icon: Truck,
    gradient: "from-blue-500/10 to-blue-500/5",
    accent: "text-blue-500",
  },
  {
    title: "Farm-Fresh Produce",
    desc: "Hand-picked, organically sourced vegetables straight from local farms.",
    icon: Leaf,
    gradient: "from-green-500/10 to-green-500/5",
    accent: "text-green-500",
  },
  {
    title: "Secure Payments",
    desc: "Military-grade encryption ensures your transactions are completely safe.",
    icon: ShieldCheck,
    gradient: "from-purple-500/10 to-purple-500/5",
    accent: "text-purple-500",
  },
  {
    title: "Satisfaction Guarantee",
    desc: "Not happy? We offer a no-questions-asked hassle-free refund policy.",
    icon: ThumbsUp,
    gradient: "from-orange-500/10 to-orange-500/5",
    accent: "text-orange-500",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const ValueProposition = () => {
  return (
    <section className="py-24 bg-light relative" id="deals">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="container-custom">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-dark mb-6 tracking-tight"
          >
            The Premium Standard
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1.5 bg-gradient-to-r from-primary to-green-400 mx-auto rounded-full"
          ></motion.div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`relative rounded-[2rem] p-8 bg-gradient-to-b ${feature.gradient} border border-white/50 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white opacity-40 group-hover:opacity-70 transition-opacity duration-500 z-0"></div>
              
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-[1.5rem] bg-white p-5 mb-8 shadow-md group-hover:scale-110 transition-transform duration-500 rotate-3 group-hover:rotate-0 flex items-center justify-center ${feature.accent}`}>
                  <feature.icon size={40} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${feature.accent}`}>{feature.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
