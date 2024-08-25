import { numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";

export const DepositInformation = () => {
  const { useGetUserDetail } = useAPIServices();
  const { data } = useGetUserDetail();

  const depoInfo = data?.credits;

  return (
    <main className="w-full">
      <div className="m-4">
        <div className="text-center sm:mx-10 overflow-y-hidden">
          <table className="min-w-full divide-y">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 w-[70%] left text-sm sm:text-lg font-medium uppercase tracking-wider">
                  Auction House
                </th>
                <th className="px-6 py-3 left text-sm sm:text-lg font-medium uppercase tracking-wider">
                  Deposit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-center text-xs sm:text-sm">
              {depoInfo?.map((item, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.auction_house.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    RM{numWithComma(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
