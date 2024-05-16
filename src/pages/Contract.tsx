import { useStoreContext } from "@/Context";
import { Container } from "@/components/Container";
import { useAPIServices } from "@/services";

export function Contract() {
  const { USER } = useStoreContext();
  const { useGetContract } = useAPIServices();

  const { data } = useGetContract((USER?.id as number)?.toString());

  const columns = [
    "Registration Number",
    "Model",
    "Bidder",
    "Ownership",
    "Date",
    "Auction House",
    "Actions",
  ];

  return (
    <Container>
      <div className="text-center">
        <p className="text-5xl sm:text-6xl text-primary my-4">CONTRACTS</p>
        <p className="my-8 text-xl">List of Contracts</p>
      </div>
      <div className="sm:w-full overflow-x-auto text-center py-2 sm:px-5 custom-scrollbar">
        <div className="inline-block min-w-full">
          <table className="min-w-full divide-y">
            <thead className="bg-secondary">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-lg font-medium uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y text-center text-xs sm:text-sm">
              {data?.map((item, i) => (
                <tr key={i}>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {item.registration_no}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {item.model}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {item.bidder}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {item.ownership}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {item.auction_house}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {item.actions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
