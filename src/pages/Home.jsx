
import Hero from "../components/Home/Hero";
import ValueProposition from "../components/Home/ValueProposition";
import ProductCategories from "../components/Home/ProductCategories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";
import AboutUs from "../components/Home/AboutUs";
import Payment from "../components/Home/Payment";
import Blogs from "../components/Home/Blogs";
import SpecialOffers from "../components/Home/SpecialOffers";
import AppDownload from "../components/Home/AppDownload";
import FAQ from "../components/Home/FAQ";

const Home = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <SpecialOffers />
      <AboutUs />
      <ProductCategories />
      <FeaturedProducts />
      <Testimonials />
      <AppDownload />
      <Blogs />
      <FAQ />
      <Payment />
      <Newsletter />
    </>
  );
};

export default Home;
