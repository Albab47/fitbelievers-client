import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const RecentPosts = () => {
  const axiosCommon = useAxiosCommon();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["recentPosts"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/posts?sort=recentPost&size=${6}`);
      return data;
    },
  });

  return (
    <section className="bg-white dark:bg-gray-900 my-28">
      <div className="container 2xl:px-36">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            Latest Articles{" "}
          </h1>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="py-8 md:py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <div key={post._id}>
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src={post?.image}
                alt=""
              />

              <div className="mt-8">

                <h1 className="mt-4 font-display text-2xl text-gray-800 dark:text-white">
                  {post?.title}
                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {post?.content.slice(0, 150)}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <a
                      href="#"
                      className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                    >
                      {post?.postedBy.name}
                    </a>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                     {post?.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
