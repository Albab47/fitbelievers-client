import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useTrainers = (sort="", limit=0) => {
  const axiosCommon = useAxiosCommon();

  const { data: trainers, isLoading, refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/trainers?sort=${sort}&limit=${limit}`);
      return data;
    },
  });

  return {trainers, isLoading, refetch};
};

export default useTrainers;
