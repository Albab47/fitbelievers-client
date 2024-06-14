import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import useDataCount from "../../hooks/useDataCount";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import ClassCard from "../../components/Shared/ClassCard/ClassCard";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const ClassesPage = () => {
  const axiosCommon = useAxiosCommon();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const { count } = useDataCount("classesCount", "classes");
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const { data: classes, isLoading } = useQuery({
    queryKey: ["allClasses", currentPage],
    queryFn: async () => {
      const { data } = await axiosCommon(
        `/classes?size=${itemsPerPage}&page=${currentPage}`
      );
      return data;
    },
  });

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <SecondaryLoader />;
  }

  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((elem) => elem + 1),
  ];

  return (
    <div>
      <HelmetTitle title="FitBelievers | Classes" />
      <PageHeader heading="All Classes" />

      <div className="container 2xl:px-36 my-12">
        {/* grid container */}
        <div className="py-8 md:py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes?.map((classData) => (
            <ClassCard key={classData._id} classData={classData} />
          ))}
        </div>

        {/* pagination */}
        <ol className="flex justify-center gap-1 text-xs font-medium">
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePagination(currentPage - 1)}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <FaChevronLeft />
            </button>
          </li>

          {pages?.map((page, idx) => (
            <li key={idx}>
              <button
                disabled={currentPage === page}
                onClick={() => handlePagination(page)}
                className={`block size-8 rounded ${
                  currentPage === page
                    ? "bg-primary drop-shadow-lg"
                    : "border border-gray-100 bg-white"
                } text-center leading-8 text-gray-900`}
              >
                {page}
              </button>
            </li>
          ))}

          <li>
            <button
              disabled={currentPage === numberOfPages}
              onClick={() => handlePagination(currentPage + 1)}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <FaChevronRight />
            </button>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ClassesPage;
