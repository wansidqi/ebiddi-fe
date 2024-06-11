import { useStoreContext } from "@/Context";
import { Fragment, useEffect } from "react";

export function BidderList() {
  const { payload, bidListIndex, setBidListIndex } = useStoreContext();
  const getBidders = payload.bidders.all;

  useEffect(() => {
    if (bidListIndex !== null) {
      const timeout = setTimeout(() => {
        setBidListIndex(-1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [bidListIndex]);

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
          {getBidders.map((bidder, index) => (
            <Fragment key={index}>
              <div
                className={`flex flex-col ${index === 0 ? "text-yellow-400" : ""}`}
              >
                {index === bidListIndex ? (
                  <div className="animate-appear">{bidder?.name}</div>
                ) : (
                  bidder?.name
                )}
              </div>
              <div
                className={`flex items-end flex-col ${index === 0 ? "text-yellow-400" : ""}`}
              >
                {index === bidListIndex ? (
                  <div className="animate-appear">{bidder?.amount}</div>
                ) : (
                  bidder?.amount
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
