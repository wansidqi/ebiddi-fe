import { Button } from "@/components/ui/button";
import { EventsInterface } from "@/interfaces";
import { ItemDetail } from "..";

export function ItemsList({ events }: { events: undefined | EventsInterface }) {
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
        <tbody className="divide-y text-center text-xs sm:text-sm">
          {events?.inventories.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.lot_no}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.legal_owner}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.registration_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.model}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ItemDetail {...item} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                RM {item.reserve_price.toLocaleString("en-IN")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button className="underline" variant="link">
                  <a
                    target="_blank"
                    href={`https://auction.e-biddi.com/auction/ireportcar/${item.vehicle_id}`}
                  >
                    Report
                  </a>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
