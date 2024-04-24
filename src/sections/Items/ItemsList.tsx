import { Button } from "@/components/ui/button";
import { EventsInterface } from "@/interfaces";
import { ItemDetail } from "..";

export function ItemsList({ events }: { events: null | EventsInterface }) {
  const columns = [
    "Lot",
    "Legal Owner",
    "Registration Number",
    "Model",
    "Year Manufacture",
    "Reserved Price",
    "Report",
  ];

  return (
    <div className="overflow-x-auto text-center sm:mx-10">
      <table className="min-w-full divide-y">
        <thead className="bg-secondary">
          <tr>
            {columns.map((item, i) => (
              <th
                key={i}
                scope="col"
                className="px-6 py-3 left text-sm sm:text-lg font-medium uppercase tracking-wider"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center text-xs sm:text-sm">
          {events?.auctionItems.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.lot}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.legalOwner}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.registrationNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.model}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ItemDetail {...item} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.reservedPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button className="underline" variant="link">
                  Report
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
