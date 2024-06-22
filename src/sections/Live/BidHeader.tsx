import { useStoreContext } from "@/Context";
import { DynamicRenderer } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { CallMessage } from "@/data/call-alert";
import { CreditInterface, EventsInterface } from "@/interfaces";
import { BidStatus, ROLE } from "@/enum";
import { numWithComma } from "@/lib/utils";
import { KEY, useGetQueryData } from "@/services";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { playAudio } from "@/assets/audio";

export function BidHeader() {
  const { eventId } = useParams();

  const { USER, bidStatus, setBidStatus, payload, stopFinalCall } =
    useStoreContext();
  const { countdown } = payload;

  const queryKeyEvent = [KEY.credit, eventId];
  const event = useGetQueryData<EventsInterface>(queryKeyEvent);
  const aucHousetId = event?.auction_house.id;

  const queryKeyCredit = [KEY.credit, aucHousetId];
  const data = useGetQueryData<CreditInterface[]>(queryKeyCredit);

  const displayTime = () => {
    let display = "00:00";

    if (countdown === -1) return (display = "00:00");

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

  const startAlert = ({ call, variant, audioName }: CallMessage) => {
    toast({
      duration: 1500,
      variant: variant,
      title: call.toUpperCase(),
    });
    playAudio(audioName);
  };

  useEffect(() => {
    switch (countdown) {
      case 10:
        setBidStatus(2);
        break;
      case 8:
        startAlert({
          call: "calling once",
          variant: "once",
          audioName: "call1",
        });
        break;
      case 4:
        startAlert({
          call: "calling twice",
          variant: "twice",
          audioName: "call2",
        });
        break;
      case 0:
        if (payload.status !== "SOLD") {
          startAlert({
            call: "final call",
            variant: "final",
            audioName: "call3",
          });
        }

        if (bidStatus !== BidStatus.CLOSE) {
          setBidStatus(BidStatus.END);
        }

        break;

      default:
        break;
    }
  }, [countdown]);

  useEffect(() => {
    console.log(countdown);
    if (USER?.role === ROLE.AUCTIONEER) return;

    if (!stopFinalCall || countdown <= 0) {
      const intervalId = setInterval(() => {
        startAlert({
          call: "final call",
          variant: "final",
          audioName: "call3",
        });
      }, 3000);

      // Clear interval on component unmount or dependency change
      return () => clearInterval(intervalId);
    }
  }, [stopFinalCall, countdown]);

  // useEffect(() => {
  //   if (finalCall > 0 && finalCall <= 3) {
  //     const interval = setInterval(() => {
  //       setFinalCall((prevCount) => prevCount + 1);
  //     }, 3000);

  //     startAlert({
  //       call: "final call",
  //       variant: "final",
  //       audioName: "call3",
  //     });

  //     return () => clearInterval(interval);
  //   }
  // }, [finalCall]);

  return (
    <div>
      <DynamicRenderer>
        <DynamicRenderer.When cond={USER?.role == ROLE.BIDDER}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
            <div className="flexcenter-col col-span-2 sm:col-span-3 sm:order-1 text-3xl">
              <p className="text-primary">Ends in:</p>
              <p className="digital text-5xl font-bold">{displayTime()}</p>
            </div>
            <div className="flexcenter-col text-lg sm:order-2">
              <p className="text-primary sm:text-2xl">Current Bid:</p>
              <p className="text-yellow-500 sm:text-2xl">
                {`RM ${numWithComma(payload.bidders.highest_amount) || "0"}`}
              </p>
            </div>
            <div className="flexcenter-col text-lg sm:order-3">
              <p className="text-primary sm:text-2xl">Current Bidder:</p>
              <p className="text-yellow-500 sm:text-2xl">
                {payload.bidders.highest_user_name || "-"}
              </p>
            </div>
            {data?.map((cr, i) => (
              <div
                key={i}
                className="flexcenter-col col-span-2 sm:col-span-1 text-lg sm:order-2"
              >
                <p className="text-primary sm:text-2xl">Deposit Balance:</p>
                <p className="sm:text-2xl text-center">
                  {cr?.auction_house.name}
                </p>
                <p className="text-yellow-500 sm:text-2xl">
                  RM{numWithComma(cr?.amount as number) || 0}
                </p>
              </div>
            ))}
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
              <p className="text-yellow-500 sm:text-2xl">{`RM ${numWithComma(payload.bidders.highest_amount) || "0"}`}</p>
            </div>
            <div className="flexcenter-col text-lg sm:order-3">
              <p className="text-primary sm:text-2xl">Current Bidder:</p>
              <p className="text-yellow-500 sm:text-2xl">
                {payload.bidders.highest_user_name || "-"}
              </p>
            </div>
          </div>
        </DynamicRenderer.Else>
      </DynamicRenderer>
    </div>
  );
}
