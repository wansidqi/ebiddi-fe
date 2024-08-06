import { convertDateTime, numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";

export const BiddiTransactions = () => {
  const { useGetTx } = useAPIServices();
  const { data: txs } = useGetTx();

  const columns = [
    "Timestamp",
    "Description",
    "Type",
    "Amount",
    "Available Balance",
    "	Deposited Account",
  ];
  return (
    <div className="">
      <div className="w-screen md:w-full overflow-auto max-h-[800px] custom-scrollbar text-center my-6 px-4 lg:px-10 sm:my-0">
      {/* <div className=""> */}
        <table className="w-full divide-y">
          <thead className="bg-secondary">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-3 left text-sm sm:text-lg font-medium uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-center text-xs lg:text-sm">
            {txs?.map((tx, i) => (
              <tr key={i}>
                <td className="px-6 py-4 ">{convertDateTime(tx.timestamp)}</td>
                <td className="text-left px-6 py-4 ">{tx.description}</td>
                <td className="px-6 py-4 ">{tx.type}</td>
                <td className="px-6 py-4 ">RM{numWithComma(tx.amount)}</td>
                <td className="px-6 py-4 ">RM{numWithComma(tx.balance)}</td>
                <td className="px-6 py-4 ">{tx.credit_account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
