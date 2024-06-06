import { useQuery } from "@tanstack/react-query";
import AboutUs from "../../components/Home/AboutUs/AboutUs";
import Banner from "../../components/Home/Banner/Banner";
import FeaturesClasses from "../../components/Home/FeaturedClasses/FeaturesClasses";
import Features from "../../components/Home/Features/Features";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import useAxiosCommon from "../../hooks/useAxiosCommon";

import useTrainers from "../../hooks/useTrainers";
import Team from "../../components/Home/Team/Team";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";

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

  if (isLoading || isTrainersLoading) return <SecondaryLoader size={70} />

  return (
    <div>
      <Banner />
      <Features />
      <FeaturesClasses classes={classes} />
      <Team trainers={trainers} />
      <AboutUs />
      <Testimonials />
    </div>
  );
};

export default HomePage;
