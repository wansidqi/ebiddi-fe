import { Button } from "@/components/ui/button";
import { EventsInterface, InventoryInterface } from "@/interfaces";
import { StepBack, StepForward } from "lucide-react";
import { ItemDetail } from "./ItemDetail";

export const gridCSS = "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3";

export function ItemsGrid({ events }: { events: undefined | EventsInterface }) {
  return (
    <>
      <div className={gridCSS}>
        {events?.inventories.map((item: InventoryInterface, i: number) => (
          <div key={i} className="border-2 border-secondary rounded-sm pb-4">
            <div className="relative h-[280px] w-full">
              <img
                src={item.images[0]}
                className="w-full h-full card-img-top rounded-0 object-cover"
              />
              <div className="absolute top-1 bg-cyan-500 left-0 px-2 py-1 rounded-sm">
                {item.lot_no}
              </div>
              <div className="absolute bottom-1 bg-green-600 left-0 px-2 py-1 rounded-sm">
                {item.registration_number}
              </div>
            </div>
            <div className="bg-primary text-xl p-2 text-center">
              RM {item.reserve_price.toLocaleString("en-IN")}
            </div>
            <div className="m-2 flex flex-col gap-2">
              <p>{item.model}</p>
              <div>
                <p className="text-primary">Year of Make:</p>
                <p>{item.year}</p>
              </div>
              <div>
                <p className="text-primary">Legal Owner:</p>
                <p>{item.legal_owner}</p>
              </div>
              <div className="flex gap-3 my-0">
                <ItemDetail {...item} />
                <Button className="underline" variant="link">
                  <a
                    target="_blank"
                    href={`https://auction.e-biddi.com/auction/ireportcar/${item.vehicle_id}`}
                  >
                    Report
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mx-5 my-10">
        <button>
          <StepBack />
        </button>
        Page 1 of 1
        <button>
          <StepForward />
        </button>
      </div>
    </>
  );
}
