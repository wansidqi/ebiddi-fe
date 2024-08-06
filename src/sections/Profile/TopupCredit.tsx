import { Button } from "@/components/ui/button";
import { convertDateTime, numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { StepBack, StepForward } from "lucide-react";
import { useState } from "react";
import { Receipt } from "..";

export const TopupCredit = () => {
  const { useGetReceipt } = useAPIServices();
  const { data } = useGetReceipt();
  
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const columns = ["Date", "Reference", "Amount", "Attachment", "Status"];

  return (
    <main className="w-screen md:w-full">
      <div className="mx-4 my-6 xl:my-0">
        <div className="text-center sm:mx-10 overflow-y-hidden">
          <div className="flex md:justify-end mb-5">
            <div>
              <Receipt />
            </div>
          </div>
          <table className="min-w-full divide-y">
            <thead className="bg-secondary">
              <tr>
                {columns.map((col, i) => {
                  return (
                    <th
                      key={i}
                      className="px-6 py-3 left text-sm sm:text-lg font-medium uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y text-center text-xs sm:text-sm">
              {currentItems?.map((item, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {convertDateTime(item.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.reference_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    RM{numWithComma(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={item.url} target="_blank">
                      <Button variant="link">View Receipt</Button>
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p
                      className={`${item.status === "completed" ? "text-green-500" : item.status === "failed" ? "text-red-500" : "text-yellow-500"}`}
                    >
                      {item.status ?? "Pending"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="absolute left-1/2 bottom-0">
        <div className="flexcenter gap-7">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <StepBack />
          </button>
          <div className="flexcenter gap-3">
            <span>Page</span>
            <span className="text-xl">{currentPage}</span>
            <span className="">of</span>
            <span className="text-xl">
              {Math.ceil((data?.length as number) / itemsPerPage)}
            </span>
          </div>
          <button
            onClick={nextPage}
            disabled={indexOfLastItem >= (data?.length as number)}
          >
            <StepForward />
          </button>
        </div>
      </div>
    </main>
  );
};
