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
import { FaSearch } from "react-icons/fa";

const ClassesPage = () => {
  const axiosCommon = useAxiosCommon();
  const [searchTxt, setSearchTxt] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0)
  // const { count } = useDataCount("classesCount", "classes");
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const { data: classes, isLoading } = useQuery({
    queryKey: ["allClasses", currentPage, searchTxt],
    queryFn: async () => {
      const { data } = await axiosCommon(
        `/classes?size=${itemsPerPage}&page=${currentPage}&search=${searchTxt}`
      );
      console.log(data);
      setCount(data.count)
      return data.classes;
    },
  });

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearchTxt(search);
  }

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
        {/* search bar */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSearch}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FaSearch />
              </div>
              <input
                type="search"
                name="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-3xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search By Class Names i.e boxing"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/40 font-medium rounded-full text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>

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
