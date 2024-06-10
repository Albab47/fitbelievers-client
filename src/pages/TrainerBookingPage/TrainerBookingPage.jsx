import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import PackageTable from "../../components/Dashboard/Tables/PackageTable";
import { useState } from "react";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import { Button } from "flowbite-react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrainerBookingPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [packageSelection, setPackageSelection] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: slot, isLoading } = useQuery({
    queryKey: ["slot", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/slot/${id}`);
      return data;
    },
  });
  // console.log(slot);

  const handlePackageSelection = (selectedPackage) => {
    setPackageSelection(selectedPackage);
    console.log(selectedPackage);
    switch (selectedPackage) {
      case "Basic":
        setPackagePrice(10);
        break;
      case "Standard":
        setPackagePrice(20);
        break;
      case "Premium":
        setPackagePrice(50);
        break;
      default:
        break;
    }
  };

  const handleJoin = async () => {
    if (!packageSelection) {
      toast.error("Please Select a Package to join");
    }
    const bookingData = {
      trainerName: slot.trainer.name,
      slotName: slot.slotName,
      packageName: packageSelection,
      price: packagePrice,
      name: user?.displayName,
      email: user?.email,
      slotId: slot._id,
    };
    console.log(bookingData);

    try {
      const { data } = await axiosSecure.post("/bookings", bookingData);
      console.log(data);
      if (data.insertedId) {
        navigate("/payment");
        toast.success("Please Pay to Confirm booking");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isLoading) return <SecondaryLoader />;

  return (
    <div>
      <PageHeader heading="Booking Page" />

      <section className="container 2xl:px-36 my-16">
        <div className="bg-white  rounded shadow-md p-4 px-4 md:p-8 mb-6">
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Trainer name: </span>{" "}
              {slot?.trainer?.name}
            </p>
            <p>
              <span className="font-semibold">Selected slot:</span>{" "}
              {slot?.slotName} slot
            </p>
            <p className="font-semibold">Classes includes:</p>
            <ul className="list-disc list-inside pl-2">
              {slot.classesIncludes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* pricing table */}
          <PackageTable
            onPackageSelection={handlePackageSelection}
            packageSelection={packageSelection}
          />

          <Link className="flex mr-7 justify-end">
            <Button
              onClick={handleJoin}
              disabled={loading}
              gradientMonochrome="lime"
              className="shrink-0 rounded-xl"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TrainerBookingPage;
