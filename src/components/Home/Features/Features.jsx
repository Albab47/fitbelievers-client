import { FaDumbbell, FaUsers } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaMosque } from "react-icons/fa6";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const features = [
  {
    title: "Personalized Training",
    description:
      "Get customized workout plans tailored to your fitness goals by our expert trainers.",
    icon: FaDumbbell,
  },
  {
    title: "Diverse Programs",
    description:
      "Choose from body-building, calisthenics, and boxing to suit your interests and fitness level.",
    icon: GiWeightLiftingUp,
  },
  {
    title: "Community Support",
    description:
      "Join a supportive community that shares your commitment to fitness and moral values.",
    icon: FaUsers,
  },
  {
    title: "Prayer Room",
    description:
      "Maintain your spiritual practices with our dedicated prayer room available at the gym.",
    icon: FaMosque,
  },
];

const Features = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container 2xl:px-36 py-24 mx-auto">
        <SectionTitle heading="Why Chose Us" subHeading="Features" />

        {/* flex container */}
        <div className="mt-8 xl:mt-16 space-y-8 lg:space-y-0 lg:flex lg:gap-16 lg:items-center lg:justify-between">
          {/* image */}
          <div className="w-full lg:w-2/5 lg:justify-center">
            <img
              className="w-full h-[20rem] flex-shrink-0 object-cover xl:w-[30rem] xl:h-[30rem] rounded-xl"
              src="https://i.ibb.co/wpdRvMV/features-section.jpg"
              alt="feature section image"
            />
          </div>
          {/* content */}
          <div className="grid w-full mt-0 gap-6 lg:w-3/5 xl:gap-10 sm:grid-cols-2">
            {features.map(({icon: Icon, title, description}, idx) => (
              <div key={idx} className="space-y-3 bg-primary/5 border border-lime-200 rounded-xl p-4">
                <span className="inline-block p-3 text-primary bg-lime-100 rounded-xl dark:text-white dark:bg-lime-500">
                  {/* icon here */}
                  <Icon className="size-5" />
                </span>

                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  {title}
                </h1>

                <p className="text-gray-500 dark:text-gray-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
