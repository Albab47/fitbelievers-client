import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import SubscribersTable from "../../../components/Dashboard/Tables/SubscribersTable";

const NewsletterSubscribers = () => {
    const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/subscribers`);
      return data;
    },
  });

  console.log(data);

  if(isLoading) return <SecondaryLoader />

  return (
    <div className="container px-4">
      <PageTitle title={"Newsletter Subscribers List"} />

      {/* data table */}
      <SubscribersTable subscribers={data} />
    </div>
  );
};

export default NewsletterSubscribers;