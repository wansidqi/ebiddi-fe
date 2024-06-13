import { Container } from "@/components/Container";
import { getDate } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";

export function AuctContract() {
  const { eventId } = useParams();
  const { useGetContractByEvent } = useAPIServices();

  const { data } = useGetContractByEvent(eventId);

  const columns = [
    "Registration Number",
    "Model",
    "Previous Ownership",
    "Current Ownership",
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
              {data?.map((contract, i) => (
                <tr key={i}>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract.item.registration_number}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract.item.model}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract.contract_owner.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract.bidder_company?.name ?? "n/a"}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {getDate(contract.event.event_timestamp)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    {contract.event.auction_house.auctionhouse_name}
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
        </div>
      </div>
    </Container>
  );
}
