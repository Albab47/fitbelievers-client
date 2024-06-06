import PropTypes from "prop-types";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import TrainerCard from "../../Trainers/TrainerCard";

const Team = ({ trainers }) => {
  //   console.log(trainers);

  return (
    <section>
      <div className="container 2xl:px-36">
        <SectionTitle heading={"Meet Our Trainers"} subHeading={"Team"} />

        <div className="py-8 md:py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers?.map((trainer) => (
            <TrainerCard key={trainer._id} trainer={trainer} isHome={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

Team.propTypes = {
  trainers: PropTypes.array,
};

export default Team;
