import { useStoreContext } from "@/Context";
import { toast } from "@/components/ui/use-toast";
import { CallMessage } from "@/data/call-alert";
import { BidStatus } from "@/enum";
import { numWithComma } from "@/lib/utils";
import { useEffect } from "react";
import { playAudio } from "@/assets/audio";

export function BidHeader() {
  const { payload, setPayload } = useStoreContext();
  const { countdown, bidStatus } = payload;

  const displayTime = () => {
    let display = "00:00";

    if (countdown < 0) {
      const absCountdown = Math.abs(countdown);
      if (absCountdown.toString().length === 2) {
        display = `-00:${absCountdown}`;
      } else {
        display = `-00:0${absCountdown}`;
      }
    } else if (countdown.toString().length === 2) {
      display = `00:${countdown}`;
    } else if (countdown.toString().length === 1) {
      display = `00:0${countdown}`;
    }

    return display;
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
        setPayload((prev) => ({ ...prev, bidStatus: 2 }));
        // setBidStatus(2);
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
        if (bidStatus !== 0 && payload.status !== "SOLD") {
          startAlert({
            call: "final call",
            variant: "final",
            audioName: "call3",
          });
        }

        if (bidStatus !== BidStatus.CLOSE) {
          // setBidStatus(BidStatus.END);
          setPayload((prev) => ({ ...prev, bidStatus: BidStatus.END }));
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
  );
}
