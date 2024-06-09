import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useDataCount = (key, api) => {
  const axiosCommon = useAxiosCommon();

  const { data: count, isLoading: countLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axiosCommon(`/${api}-count`);
      return data.count;
    },
  });

  return { count, countLoading };
};

export default useDataCount;
