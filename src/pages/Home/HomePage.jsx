import { useQuery } from "@tanstack/react-query";
import AboutUs from "../../components/Home/AboutUs/AboutUs";
import Banner from "../../components/Home/Banner/Banner";
import FeaturesClasses from "../../components/Home/FeaturedClasses/FeaturesClasses";
import Features from "../../components/Home/Features/Features";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { RingLoader } from "react-spinners";

const HomePage = () => {
  const axiosCommon = useAxiosCommon();

  const { data: classes, isLoading } = useQuery({
    queryKey: ["top-classes"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/top-classes`);
      return data;
    },
  });

  console.log(classes);

  if (isLoading) return <RingLoader />;
  
  return (
    <div>
      <Banner />
      <Features />
      <FeaturesClasses classes={classes} />
      <AboutUs />
      <Testimonials />
    </div>
  );
};

export default HomePage;
