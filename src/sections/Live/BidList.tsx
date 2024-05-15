import { useStoreContext } from "@/Context";
import { Fragment, useEffect, useState } from "react";

interface BidList {
  name: string;
  price: string;
}

export function BidList() {
  const { dev } = useStoreContext();
  const [latestBidderIndex, setLatestBidderIndex] = useState(-1);
  const [bidders, setBidders] = useState<BidList[]>([
    { name: "Wan Ahmad Sidqi", price: "RM 888,888" },
  ]);

  useEffect(() => {
    if (latestBidderIndex !== null) {
      const timeout = setTimeout(() => {
        setLatestBidderIndex(-1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [latestBidderIndex]);

  const addBidder = () => {
    let bidder = { name: "Alexander the Great", price: "RM 500,888" };
    setBidders([bidder, ...bidders]);
    setLatestBidderIndex(0);
  };

  return (
    <div>
      <div className="h-[30em] border overflow-y-auto py-2 px-2 sm:px-4 custom-scrollbar">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-2 rounded-lg">
          <div className="flexcenter-col col-span-2 text-3xl mb-3">
            <p className="text-primary">Previous Bid</p>
          </div>
          <div className="flex justify-center flex-col text-primary items-start sm:text-2xl">
            Bidder:
          </div>
          <div className="flex justify-center flex-col text-primary items-end sm:text-2xl">
            Bidding Price:
          </div>
          {bidders.map((item, index) => (
            <Fragment key={index}>
              <div
                className={`flex flex-col ${index === 0 ? "text-yellow-400" : ""}`}
              >
                {index === latestBidderIndex ? (
                  <div className="animate-appear">{item.name}</div>
                ) : (
                  item.name
                )}
              </div>
              <div
                className={`flex items-end flex-col ${index === 0 ? "text-yellow-400" : ""}`}
              >
                {index === latestBidderIndex ? (
                  <div className="animate-appear">{item.price}</div>
                ) : (
                  item.price
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {dev && (
        <button
          className="w-full bg-green-500 px-3 py-2 rounded-md mt-6"
          onClick={addBidder}
        >
          add
        </button>
      )}
    </div>
  );
}
