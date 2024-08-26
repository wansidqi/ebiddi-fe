import { Button } from "@/components/ui/button";
import { convertDateTime, numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { Refund } from "..";
import { useStoreContext } from "@/Context";
import { Pagination } from "@/components";

export const RefundCredit = () => {
  const { useGetRefund, useGetCredit } = useAPIServices();
  const { data } = useGetRefund();
  const { USER } = useStoreContext();

  const { data: balance } = useGetCredit(USER?.id);

  const columns = [
    "Date",
    "Holder Name",
    "Bank Name",
    "Bank Acc No",
    "Refund Amount",
    "Attachment",
    "Status",
  ];

  const { PaginationUI, currData } = Pagination(data);

  return (
    <main className="w-[90vw] md:w-full">
      <div className="mx-4 my-6 xl:my-0">
        <div className="text-center sm:mx-10 overflow-y-hidden">
          <p className="text-lg">
            Available Amount: RM $
            {numWithComma(balance ? balance[0]?.amount : 0)}
          </p>
          <div className="flex md:justify-end mb-5">
            <div className="flex">
              <Refund />
            </div>
          </div>
          <table className="min-w-full divide-y lg:w-full">
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
              {currData?.map((item, i) => (
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
                      className={`${item.status === 1 ? "text-green-500" : item.status === 2 ? "text-red-500" : "text-yellow-500"}`}
                    >
                      {`${item.status === 1 ? "Success" : item.status === 2 ? "Failed" : "Pending"}`}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <>{PaginationUI}</>
    </main>
  );
};
