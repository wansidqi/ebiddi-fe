import { useStoreContext } from "@/Context";
import { Container, Pagination, SearchFilter } from "@/components";
import { useAPIServices } from "@/services";
import { Search } from "lucide-react";

export function Contract() {
  const { USER } = useStoreContext();
  const { useGetContract } = useAPIServices();

  const { data } = useGetContract((USER?.id as number)?.toString());

  const { SearchFilterUI, dataList } = SearchFilter(data, [
    "item.registration_number",
    "item.model",
    "contract_owner.name",
    "bidder_company",
    "event.event_timestamp",
    "event.auction_house.auctionhouse_name",
    "contract_owner.name",
  ]);
  const { PaginationUI, currData } = Pagination(dataList, 10);

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
        <div className="realtive flexcenter">
          <p className="my-8 text-xl">List of Contracts</p>
          <div className="absolute right-20">{SearchFilterUI}</div>
        </div>
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
              {currData?.map((contract, i) => (
                <tr key={i}>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract?.item?.registration_number}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract?.item?.model}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract?.contract_owner?.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract?.bidder_company}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract?.event?.event_timestamp}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract?.event?.auction_house.auctionhouse_name}
                  </td>
                  <td className="px-0 flexcenter sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    <a
                      href={contract.url}
                      target="_blank"
                      className="bg-blue-600 rounded-lg flexcenter aspect-square w-10"
                    >
                      <Search size={"18px"} strokeWidth={4} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {PaginationUI}
        </div>
      </div>
    </Container>
  );
}
