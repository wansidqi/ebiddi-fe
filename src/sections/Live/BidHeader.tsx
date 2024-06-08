import { useStoreContext } from "@/Context";
import { DynamicRenderer } from "@/components";
import { EventsInterface } from "@/interfaces";
import { numWithComma } from "@/lib/utils";
import { KEY, useAPIServices, useGetQueryData } from "@/services";
import { useParams } from "react-router-dom";

export function BidHeader() {
  const { eventId } = useParams();

  const { timer, USER } = useStoreContext();

  const queryKey = [KEY.auction_item, eventId];
  const event = useGetQueryData<EventsInterface>(queryKey);

  const { useGetCredit } = useAPIServices();
  const { data } = useGetCredit(event?.auction_house.id.toString() as string);

  const displayTime = () => {
    let display = "00:00";

    if (timer?.toString().length === 2) {
      display = `00:${timer}`;
      return display;
    } else if (timer?.toString().length === 1) {
      display = `00:0${timer}`;
      return display;
    } else {
      display = "00:00";
      return display;
    }
  };

  return (
    <div>
      <DynamicRenderer>
        <DynamicRenderer.When cond={USER !== null}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
            <div className="flexcenter-col col-span-2 sm:col-span-3 sm:order-1 text-3xl">
              <p className="text-primary">Ends in:</p>
              <p className="digital text-5xl font-bold">{displayTime()}</p>
            </div>
            <div className="flexcenter-col text-lg sm:order-2">
              <p className="text-primary sm:text-2xl">Current Bid:</p>
              <p className="text-yellow-500 sm:text-2xl">RM 888,888</p>
            </div>
            <div className="flexcenter-col text-lg sm:order-3">
              <p className="text-primary sm:text-2xl">Current Bidder:</p>
              <p className="text-yellow-500 sm:text-2xl">WAN AHMAD SIDQI</p>
            </div>
            <div className="flexcenter-col col-span-2 sm:col-span-1 text-lg sm:order-2">
              <p className="text-primary sm:text-2xl">Deposit Balance:</p>
              <p className="sm:text-2xl">{data?.auction_house.name}</p>
              <p className="text-yellow-500 sm:text-2xl">
                RM{numWithComma(data?.amount as number) || 0}
              </p>
            </div>
          </div>
        </DynamicRenderer.When>
        <DynamicRenderer.Else>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
            <div className="flexcenter-col col-span-2 sm:col-span-1 sm:order-2 text-3xl">
              <p className="text-primary">Ends in:</p>
              <p className="digital text-5xl font-bold">{displayTime()}</p>
            </div>
            <div className="flexcenter-col text-lg sm:order-1">
              <p className="text-primary sm:text-2xl">Current Bid:</p>
              <p className="text-yellow-500 sm:text-2xl">RM 888,888</p>
            </div>
            <div className="flexcenter-col text-lg sm:order-3">
              <p className="text-primary sm:text-2xl">Current Bidder:</p>
              <p className="text-yellow-500 sm:text-2xl">WAN AHMAD SIDQI</p>
            </div>
          </div>
        </DynamicRenderer.Else>
      </DynamicRenderer>
    </div>
  );
}
