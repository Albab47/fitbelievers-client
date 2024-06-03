import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative bg-[url(https://i.ibb.co/2t72FGM/banner-dark.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="relative container py-32 px-4 lg:flex lg:h-screen lg:items-center 2xl:px-36">
        <div className="max-w-xl text-center sm:text-left text-white">
          <p className="inline-block border-l-4 border-lime-500 pl-3 py-px mb-4 text-sm font-semibold tracking-wider text-primary">
            Welcome to FitBelievers gym
          </p>
          <h1 className="text-3xl font-extrabold sm:text-7xl font-display tracking-wide">
            Elevate Your {" "}
            <strong className="font-extrabold text-primary">Strength, </strong>
            Uphold Your Values
          </h1>

          <p className="mt-4 max-w-lg sm:text-lg text-gray-300">
            Discover a unique fitness community where physical prowess meets
            moral integrity. Join us to transform your body and spirit, and
            become the strongest version of yourself.
          </p>

          {/* CTA button */}
          <div className="mt-8 flex justify-center sm:justify-start text-center">
            <Link
              to="/classes"
              className="flex items-center rounded-full bg-primary text-dark px-5 py-2 text-sm font-semibold transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-lime-500"
            >
              See Classes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
