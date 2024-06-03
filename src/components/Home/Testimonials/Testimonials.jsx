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

        {/* <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
          <div className="relative p-8 rounded-lg bg-gray-50">
            <p className="leading-loose text-gray-500 dark:text-gray-400">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a.”.
            </p>

            <div className="flex items-center mt-8 -mx-2">
              <img
                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
              />

              <div className="mx-2">
                <h1 className="font-semibold text-gray-800 dark:text-white">
                  Robert
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  CTO, Robert Consultency
                </span>
              </div>
            </div>

            <div className="absolute left-0 right-0 m-auto -bottom-5 drop-shadow-xl bg-white size-12 flex items-center justify-center rounded-full">
                <IoMdQuote className="text-primary size-8" />
            </div>
          </div>

          <div className="p-8 bg-primary border border-transparent rounded-lg dark:bg-blue-600">
            <p className="leading-loose text-white">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a.”.
            </p>

            <div className="flex items-center mt-8 -mx-2">
              <img
                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-200"
                src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt=""
              />

              <div className="mx-2">
                <h1 className="font-semibold text-white">Jeny Doe</h1>
                <span className="text-sm text-blue-200">
                  CEO, Jeny Consultency
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 border rounded-lg dark:border-gray-700">
            <p className="leading-loose text-gray-500 dark:text-gray-400">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a.”.
            </p>

            <div className="flex items-center mt-8 -mx-2">
              <img
                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />

              <div className="mx-2">
                <h1 className="font-semibold text-gray-800 dark:text-white">
                  Ema Watson{" "}
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Marketing Manager at Stech
                </span>
              </div>
            </div>
          </div>
        </section> */}

        <ReviewSlider />
      </div>
    </section>
  );
};

export default Testimonials;
