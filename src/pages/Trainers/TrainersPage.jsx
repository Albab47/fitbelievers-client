import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import TrainerCard from "../../components/Trainers/TrainerCard";
import useTrainers from "../../hooks/useTrainers";

const TrainersPage = () => {
  const { trainers, isLoading } = useTrainers();
  console.log(trainers);

  if(isLoading) return <SecondaryLoader />

  return (
    <section>
      <HelmetTitle title="FitBelievers | Trainers" />
      
      <div className="container 2xl:px-36">
        <SectionTitle heading={"Our Expert Trainers"} />

        <div className="py-8 md:py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers?.map((trainer) => (
            <TrainerCard key={trainer._id} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersPage;
