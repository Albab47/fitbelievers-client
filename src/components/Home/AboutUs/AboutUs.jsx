import DottedBox from "../DottedBox/DottedBox";
import aboutUsImg1 from '../../../assets/aboutUs-1.jpg';
import aboutUsImg2 from '../../../assets/aboutUs-2.jpg';
import aboutUsImg3 from '../../../assets/aboutUs-3.jpg';

const AboutUs = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark">
        <div className="container 2xl:px-36 mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                {/* image container */}
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src={aboutUsImg1}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src={aboutUsImg2}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src={aboutUsImg3}
                      alt=""
                      className="w-full rounded-2xl"
                    />
                    <DottedBox />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-primary">
                  About Us
                </span>
                <h2 className="mb-5 text-4xl font-display text-dark dark:text-white md:text-6xl">
                More Than Just A Workout Space
                </h2>
                <p className="mb-5 text-base text-body-color dark:text-dark-6 text-gray-500 dark:text-gray-300">
                  At StrongBeliever Gym, we believe in more than just physical
                  fitness. Our mission is to create a holistic environment where
                  you can train your body, mind, and spirit. We offer a diverse
                  range of training programs including body-building,
                  calisthenics, and boxing, tailored to meet the needs of all
                  fitness levels.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6 text-gray-500 dark:text-gray-300">
                  We are committed to fostering a supportive and inclusive
                  community that upholds strong moral values. Our facilities
                  include a dedicated prayer room, ensuring that your spiritual
                  practices are respected and accommodated.
                </p>
                <a
                  href="javascript:void(0)"
                  className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
