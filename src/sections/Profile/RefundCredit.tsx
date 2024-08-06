import { Button } from "@/components/ui/button";
import { convertDateTime, numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { StepBack, StepForward } from "lucide-react";
import { useState } from "react";
import { Refund } from "..";
import { useStoreContext } from "@/Context";

export const RefundCredit = () => {
  const { useGetRefund } = useAPIServices();
  const { data } = useGetRefund();
  const { USER } = useStoreContext();

  const balance = USER?.credits.find((cr) => cr.credit_id === 0);

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

  const columns = [
    "Date",
    "Holder Name",
    "Bank Name",
    "Bank Acc No",
    "Refund Amount",
    "Attachment",
    "Status",
  ];

  return (
    <main className="w-screen md:w-full">
      <div className="mx-4 my-6 xl:my-0">
        <div className="text-center sm:mx-10 overflow-y-hidden">
          <p className="text-lg">
            Available Amount: RM ${numWithComma(balance?.amount ?? 0)}
          </p>
          <div className="flex md:justify-end mb-5">
            <div className="flex">
              <Refund />
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
                    {item.holder_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.bank_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.bank_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    RM{numWithComma(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {item.ssm && (
                        <a href={item.ssm} target="_blank">
                          <Button variant="link">View SSM</Button>
                        </a>
                      )}
                      {item.ic_front && (
                        <a href={item.ic_front} target="_blank">
                          <Button variant="link">View IC Front</Button>
                        </a>
                      )}
                      {item.ic_back && (
                        <a href={item.ic_back} target="_blank">
                          <Button variant="link">View IC Back</Button>
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p
                      className={`${item.status ? "text-green-500" : "text-yellow-500"}`}
                    >
                      {item.status ? "Completed" : "Pending"}
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
