import ReviewSlider from "./ReviewSlider";

const Testimonials = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container 2xl:px-36 px-6 py-10 mx-auto">
        {/* heading */}
        <div className="mt-6 flex justify-center">
          <div>
            <span className="block mb-4 text-lg text-center font-semibold text-primary">
              Testimonials
            </span>
            <h1 className="text-4xl font-display text-center text-gray-800 capitalize lg:text-6xl dark:text-white">
              What Our <span className="text-primary ">Members</span> Say
            </h1>

            <div className="flex justify-center mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-primary rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-primary rounded-full"></span>
            </div>
          </div>
        </div>

        <ReviewSlider />
      </div>
    </section>
  );
};

export default Testimonials;
