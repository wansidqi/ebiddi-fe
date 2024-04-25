import { Button } from "@/components/ui/button";
import { EventsInterface, ItemsInterface } from "@/interfaces";
import { StepBack, StepForward } from "lucide-react";
import { ItemDetail } from "./ItemDetail";

export const gridCSS = "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3";

export function ItemsGrid({ events }: { events: null | EventsInterface }) {
  return (
    <>
      <div className={gridCSS}>
        {events?.auctionItems.map((item: ItemsInterface, i: number) => (
          <div key={i} className="border-2 border-secondary rounded-sm pb-4">
            <div className="relative h-[280px] w-full">
              <img
                src={item.img[0]}
                className="w-full h-full card-img-top rounded-0 object-cover"
              />
              <div className="absolute top-1 bg-cyan-500 left-0 px-2 py-1 rounded-sm">
                {item.lot}
              </div>
              <div className="absolute bottom-1 bg-green-600 left-0 px-2 py-1 rounded-sm">
                {item.registrationNo}
              </div>
            </div>
            <div className="bg-primary text-xl p-2 text-center">
              {item.reservedPrice}
            </div>
            <div className="m-2 flex flex-col gap-2">
              <p>{item.model}</p>
              <div>
                <p className="text-primary">Year of Make:</p>
                <p>{item.yearManufacture}</p>
              </div>
              <div>
                <p className="text-primary">Legal Owner:</p>
                <p>{item.legalOwner}</p>
              </div>
              <div className="flex gap-3 my-0">
                <ItemDetail {...item} />
                <Button className="underline" variant="link">
                  Report
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
