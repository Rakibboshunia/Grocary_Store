import Header from "../UI/Header";
import Footer from "../UI/Footer";
import ScrollToTop from "../UI/ScrollToTop";
import FloatingSupport from "../UI/FloatingSupport";
import { Outlet } from "react-router-dom";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children || <Outlet />}</main>
      <Footer />
      <FloatingSupport />
      <ScrollToTop />
    </div>
  );
};

export default AppLayout;
