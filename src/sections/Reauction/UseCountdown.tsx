import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function UseCountdown() {
  const { eventId } = useParams();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const { publishReauction } = useStoreContext();

  const { useGetReauctionList, useGetReauctionStatus, useGetHoldItems } = useAPIServices(); //prettier-ignore
  const { data: auctions, refetch: getReauctionList } =  useGetReauctionList(eventId); //prettier-ignore
  const { data: status, refetch: getReauctionStatus, isLoading:isCdLoading } = useGetReauctionStatus(eventId); //prettier-ignore
  const { data: holdedItems, refetch: getHoldItems } =  useGetHoldItems(eventId); //prettier-ignore

  let expiryAt = status?.expiry_at;

  const sendHoldItems = () => {
    if (!eventId) return;

    if (holdedItems && holdedItems.length <= 0) {
      getHoldItems();
    }

    if (holdedItems && holdedItems.length > 0) {
      publishReauction({
        event_id: eventId,
        data: {
          event_id: eventId,
          status: "REAUCTIONLISTUPDATE",
          expiryAt,
        },
      });
    }
  };

  ///timer
  useEffect(() => {
    const startCountdown = async () => {
      if (timer) {
        clearInterval(timer);
      }

      let counter = 0;
      getReauctionList();
      const endTime = moment(expiryAt);

      const newTimer = setInterval(() => {
        const now = moment();
        const diff = endTime.diff(now);

        ///end
        if (diff <= 0) {
          getReauctionStatus();
          setCountdown("00:00:00");
          clearInterval(newTimer);
          setIsCountdownActive(false);

          return;
        }

        const duration = moment.duration(diff);
        const hours = String(duration.hours()).padStart(2, "0");
        const minutes = String(duration.minutes()).padStart(2, "0");
        const seconds = String(duration.seconds()).padStart(2, "0");

        // if (isNaN(Number(seconds)) || countdown === "00:00:00") {}

        setIsCountdownActive(true);

        setCountdown(`${hours}:${minutes}:${seconds}`);

        if (counter >= 1) {
          getReauctionStatus();
          // getReauctionList();
          sendHoldItems();
          counter = 0;
        } else {
          counter++;
        }
      }, 1000);

      setTimer(newTimer);
    };
    if (timer) {
      clearInterval(timer);
    }
    startCountdown();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [expiryAt, auctions, holdedItems]);

  useEffect(() => {
    getReauctionStatus();
  }, [eventId, expiryAt]);

  return {
    countdown,
    isCdLoading,
    isCountdownActive,
    expiryAt,
    getReauctionList,
  };
}
