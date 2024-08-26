import { Button } from "@/components/ui/button";
import { InventoryInterface } from "@/interfaces";
import { ItemDetail } from "..";
import { Link, useNavigate } from "react-router-dom";
import { VEHICLE_TYPE } from "@/enum";

export function ItemsList({
  inventories,
}: {
  inventories: undefined | InventoryInterface[];
}) {
  const navigate = useNavigate();
  const columns = [
    "Lot",
    "Legal Owner",
    "Registration Number",
    "Model",
    "Year Manufacture",
    "Reserved Price",
    "Report",
  ];

  if (inventories && inventories.length < 1)
    return (
      <div className="flexcenter-col mt-20">
        <p className="sm:text-5xl text-4xl">NO ITEM LISTED</p>
        <button
          className="sm:text-3xl text-2xl text-primary"
          onClick={() => navigate(-1)}
        >
          back
        </button>
      </div>
    );

  return (
    <div className="overflow-x-auto text-center sm:mx-10 overflow-y-hidden">
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
          {inventories?.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <ItemDetail {...item} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.legal_owner}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.registration_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.model}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.year}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                RM {item.reserve_price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button className="underline" variant="link">
                  <Link
                    target="_blank"
                    to={
                      item.vehicle_type === VEHICLE_TYPE.CAR
                        ? `/ireportcar/${item.vehicle_id}`
                        : `/ireportmotor/${item.vehicle_id}`
                    }
                  >
                    Report
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
