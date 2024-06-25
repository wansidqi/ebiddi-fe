import { useStoreContext } from "@/Context";
import { toast } from "@/components/ui/use-toast";
import { CallMessage } from "@/data/call-alert";
import { BidStatus } from "@/enum";
import { numWithComma } from "@/lib/utils";
import { useEffect } from "react";
import { playAudio } from "@/assets/audio";

export function BidHeader() {
  // const { eventId } = useParams();

  const { bidStatus, setBidStatus, payload } = useStoreContext();
  const { countdown } = payload;

  // const queryKeyEvent = [KEY.credit, eventId];
  // const event = useGetQueryData<EventsInterface>(queryKeyEvent);

  // const { useGetCredit } = useAPIServices();
  // const { data } = useGetCredit(event?.auction_house.id);

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
      case 15:
        setBidStatus(2);
        break;
      case 10:
        startAlert({
          call: "calling once",
          variant: "once",
          audioName: "call1",
        });
        break;
      case 5:
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

  return (
    <>
      <div className="grid grid-cols-3 text-center sm:text-2xl">
        <div className="flexcenter py-2 text-primary">Current Bid:</div>
        <div className="flexcenter py-2 text-primary">Ends in:</div>
        <div className="flexcenter py-2 text-primary">Current Bidder:</div>
        <div className="flexcenter py-2 text-yellow-500">{`RM ${numWithComma(payload.bidders.highest_amount) || "0"}`}</div>
        <div className="flexcenter py-2 font-bold digital text-4xl sm:text-5xl">
          {displayTime()}
        </div>
        <div className="flexcenter py-2 text-yellow-500">
          {payload.bidders.highest_user_name || "-"}
        </div>
      </div>
    </>
    // <div>
    //   <DynamicRenderer>
    //     <DynamicRenderer.When cond={USER?.role == ROLE.BIDDER}>
    //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
    //         <div className="flexcenter-col col-span-2 sm:col-span-3 sm:order-1 text-3xl">
    //           <p className="text-primary">Ends in:</p>
    //           <p className="digital text-5xl font-bold">{displayTime()}</p>
    //         </div>
    //         <div className="flexcenter-col text-lg sm:order-2">
    //           <p className="text-primary sm:text-2xl">Current Bid:</p>
    //           <p className="text-yellow-500 sm:text-2xl">
    //             {`RM ${numWithComma(payload.bidders.highest_amount) || "0"}`}
    //           </p>
    //         </div>
    //         <div className="flexcenter-col text-lg sm:order-3">
    //           <p className="text-primary sm:text-2xl">Current Bidder:</p>
    //           <p className="text-yellow-500 sm:text-2xl">
    //             {payload.bidders.highest_user_name || "-"}
    //           </p>
    //         </div>
    // {data?.map((cr, i) => (
    //   <div
    //     key={i}
    //     className="flexcenter-col col-span-2 sm:col-span-1 text-lg sm:order-2"
    //   >
    //     <p className="text-primary sm:text-2xl">Deposit Balance:</p>
    //     <p className="sm:text-2xl text-center">
    //       {cr?.auction_house.name}
    //     </p>
    //     <p className="text-yellow-500 sm:text-2xl">
    //       RM{numWithComma(cr?.amount as number) || 0}
    //     </p>
    //   </div>
    // ))}
    //       </div>
    //     </DynamicRenderer.When>
    //     <DynamicRenderer.Else>
    //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 sm:gap-y-6 my-8">
    //         <div className="flexcenter-col col-span-2 sm:col-span-1 sm:order-2 text-3xl">
    //           <p className="text-primary">Ends in:</p>
    //           <p className="digital text-5xl font-bold">{displayTime()}</p>
    //         </div>
    //         <div className="flexcenter-col text-lg sm:order-1">
    //           <p className="text-primary sm:text-2xl">Current Bid:</p>
    //           <p className="text-yellow-500 sm:text-2xl">{`RM ${numWithComma(payload.bidders.highest_amount) || "0"}`}</p>
    //         </div>
    //         <div className="flexcenter-col text-lg sm:order-3">
    //           <p className="text-primary sm:text-2xl">Current Bidder:</p>
    //           <p className="text-yellow-500 sm:text-2xl">
    //             {payload.bidders.highest_user_name || "-"}
    //           </p>
    //         </div>
    //       </div>
    //     </DynamicRenderer.Else>
    //   </DynamicRenderer>
    // </div>
  );
}
