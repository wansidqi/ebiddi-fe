import { Button } from "@/components/ui/button";
import { InventoryInterface } from "@/interfaces";
import { StepBack, StepForward } from "lucide-react";
import { ItemDetail } from "./ItemDetail";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VEHICLE_TYPE } from "@/enum";

export const gridCSS = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3";

export function ItemsGrid({
  inventories,
}: {
  inventories: undefined | InventoryInterface[];
}) {
  const navigate = useNavigate();
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = inventories?.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [inventories]);

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
    <>
      <div className={gridCSS}>
        {currentItems?.map((item: InventoryInterface, i: number) => (
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
              RM {item.reserve_price.toLocaleString()}
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
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flexcenter gap-7 my-10">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <StepBack />
        </button>
        <div className="flexcenter gap-3">
          <span>Page</span>
          <span className="text-xl">{currentPage}</span>
          <span className="">of</span>
          <span className="text-xl">
            {Math.ceil((inventories?.length as number) / itemsPerPage)}
          </span>
        </div>
        <button
          onClick={nextPage}
          disabled={indexOfLastItem >= (inventories?.length as number)}
        >
          <StepForward />
        </button>
      </div>
    </>
  );
}
