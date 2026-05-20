import Hero from "../components/Home/Hero";
import ValueProposition from "../components/Home/ValueProposition";
import ProductCategories from "../components/Home/ProductCategories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";
import AboutUs from "../components/Home/AboutUs";
import Payment from "../components/Home/Payment";

const Home = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ProductCategories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <AboutUs />
      <Payment />
    </>
  );
};

export default Home;
