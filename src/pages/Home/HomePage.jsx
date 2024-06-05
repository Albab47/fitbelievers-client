import AboutUs from "../../components/Home/AboutUs/AboutUs";
import Banner from "../../components/Home/Banner/Banner";
import FeaturesClasses from "../../components/Home/FeaturedClasses/FeaturesClasses";
import Features from "../../components/Home/Features/Features";
import Testimonials from "../../components/Home/Testimonials/Testimonials";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Features />
      <FeaturesClasses />
      <AboutUs />
      <Testimonials />
    </div>
  );
};

export default HomePage;
