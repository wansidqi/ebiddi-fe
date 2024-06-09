import { useStoreContext } from "@/Context";
import { DynamicRenderer } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { CallMessage } from "@/data/call-alert";
import { EventsInterface } from "@/interfaces";
import { BidStatus } from "@/interfaces/enum";
import { numWithComma, playAudio } from "@/lib/utils";
import { KEY, useAPIServices, useGetQueryData } from "@/services";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function BidHeader() {
  const { eventId } = useParams();

  const { countdown, USER, bidStatus, setBidStatus, payload } =
    useStoreContext();

  const queryKey = [KEY.auction_item, eventId];
  const event = useGetQueryData<EventsInterface>(queryKey);

  const { useGetCredit } = useAPIServices();
  const { data } = useGetCredit(event?.auction_house.id.toString() as string);

  const displayTime = () => {
    let display = "00:00";

    if (countdown === 11) return (display = "00:00");

    if (countdown.toString().length === 2) {
      display = `00:${countdown}`;
      return display;
    } else if (countdown.toString().length === 1) {
      display = `00:0${countdown}`;
      return display;
    } else {
      display = "00:00";
      return display;
    }
  };

  const startAlert = ({ call, variant }: CallMessage) => {
    toast({
      duration: 1500,
      variant: variant,
      title: call.toUpperCase(),
    });
    playAudio(call);
  };

  useEffect(() => {
    switch (countdown) {
      case 8:
        startAlert({ call: "calling once", variant: "once" });
        break;
      case 4:
        startAlert({ call: "calling twice", variant: "twice" });
        break;
      case 0:
        if (payload.status !== "SOLD") {
          startAlert({ call: "final call", variant: "final" });
        }

        if (bidStatus !== BidStatus.CLOSE) {
          let newStat = BidStatus.END;
          setBidStatus(newStat);
        }

        setTimeout(
          () => startAlert({ call: "final call", variant: "final" }),
          3000
        );
        setTimeout(
          () => startAlert({ call: "final call", variant: "final" }),
          6000
        );

        break;

      default:
        break;
    }
  }, [countdown]);

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
