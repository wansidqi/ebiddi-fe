import { StepBack, StepForward } from "lucide-react";
import { useState } from "react";

export function Pagination<T>(data: T[] | undefined, itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currData = data?.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const noData = (
    <div className="my-10 xl:mt-20 xl:mb-0 left-1/2 bottom-0 text-sm xl:text-lg">
      <p className="flexcenter text-center">No data listed</p>
    </div>
  );

  const render = (
    <div className="my-10 xl:mt-20 xl:mb-0 left-1/2 bottom-0 text-sm xl:text-lg">
      <div className="flexcenter gap-7">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <StepBack className="w-4 h-4 xl:w-6 xl:h-6" />
        </button>
        <div className="flexcenter gap-3">
          <span>Page</span>
          <span>{currentPage}</span>
          <span className="">of</span>
          <span>{Math.ceil((data?.length as number) / itemsPerPage)}</span>
        </div>
        <button
          onClick={nextPage}
          disabled={indexOfLastItem >= (data?.length as number)}
        >
          <StepForward className="w-4 h-4 xl:w-6 xl:h-6" />
        </button>
      </div>
    </div>
  );

  const PaginationUI = !data || data.length < 1 ? noData : render;

  return { currData, PaginationUI };
}
