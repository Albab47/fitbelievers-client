
const BeATrainer = () => {
  return (
    <section className="max-w-6xl mx-auto rounded-lg overflow-hidden trainerCTABg bg-cover bg-top bg-no-repeat">
      <div className="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-16">
        <div className="text-center grid place-content-center">
          <h2 className="text-2xl text-white sm:text-3xl md:text-6xl font-display">
            Join Our Elite Team of Trainers
          </h2>

          <p className="hidden max-w-xl text-white/90 md:mt-3 md:block md:text-lg md:leading-relaxed">
            Passionate about fitness? Become a trainer at our gym and inspire
            others to reach their goals. Enjoy state-of-the-art facilities,
            professional development, and a supportive community.
          </p>

          <p className="hidden max-w-xl text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
            Specialize in bodybuilding, callisthenics, or boxing? We offer the
            perfect platform to grow your career.
          </p>

          <div className="mt-4 sm:mt-8">
            <a
              href="#"
              className="inline-block rounded-full bg-primary px-12 py-3 text-sm font-medium text-dark drop-shadow-md transition hover:scale-105 hover:bg-lime-500 focus:outline-none focus:ring focus:ring-lime-300"
            >
              Become a Trainer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeATrainer;
