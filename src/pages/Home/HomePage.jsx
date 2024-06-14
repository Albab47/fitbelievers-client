import { useQuery } from "@tanstack/react-query";
import AboutUs from "../../components/Home/AboutUs/AboutUs";
import Banner from "../../components/Home/Banner/Banner";
import FeaturesClasses from "../../components/Home/FeaturedClasses/FeaturesClasses";
import Features from "../../components/Home/Features/Features";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useTrainers from "../../hooks/useTrainers";
import Team from "../../components/Home/Team/Team";
import Loader from "../../components/Shared/Loader/Loader";
import Newsletter from "../../components/Home/Newsletter/Newsletter";
import RecentPosts from "../../components/Home/RecentPosts/RecentPosts";
import Footer from "../../components/Shared/Footer/Footer";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const HomePage = () => {
  const axiosCommon = useAxiosCommon();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["top-classes"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/top-classes`);
      return data;
    },
  });
  const { trainers, isLoading: isTrainersLoading } = useTrainers("team", 3);

  if (isLoading || isTrainersLoading) return <Loader />

  return (
    <div>
      <HelmetTitle title="FitBelievers | Home" />
      <Banner />
      <Features />
      <FeaturesClasses classes={classes} />
      <Team trainers={trainers} />
      <AboutUs />
      <RecentPosts />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
