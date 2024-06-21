import { useStoreContext } from "@/Context";
import { ReauctionList } from "@/interfaces";
import { useAPIServices } from "@/services";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function UseCountdown() {
  const { eventId } = useParams();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [mapItem, setMapItem] = useState<ReauctionList[]>([]);

  const { payload, setPayload, publishReauction } = useStoreContext();
  const { expiryAt } = payload;

  const { useGetReauctionList, useGetReauctionStatus, useGetHoldItems } = useAPIServices(); //prettier-ignore
  const { data: auctions, refetch: getReauctionList } =  useGetReauctionList(eventId); //prettier-ignore
  const { data: status, refetch: getReauctionStatus, isLoading:isCdLoading } = useGetReauctionStatus(eventId); //prettier-ignore
  const { data: holdedItems, refetch: getHoldItems } =  useGetHoldItems(eventId); //prettier-ignore

  const sendHoldItems = () => {
    if (!eventId) return;

    if (holdedItems && holdedItems.length <= 0) {
      getHoldItems();
    }

    if (holdedItems && holdedItems.length > 0) {
      const auctionEventIds = auctions?.map(
        (auction) => auction.auction_event_id
      );

      let items = holdedItems.map((hItem) => {
        const item = { ...hItem };
        if (auctionEventIds?.includes(item.auction_event_id)) {
          item.status = "REQUEST";
        }

        setMapItem(items);
        return item as ReauctionList;
      });

      setPayload((prev) => ({ ...prev, holdItems: items }));
    }

    publishReauction({
      event_id: eventId,
      data: {
        event_id: eventId,
        status: "REAUCTIONLISTUPDATE",
        items: mapItem,
        expiryAt,
      },
    });
  };

  ///assign expiry from API
  useEffect(() => {
    if (!status) return;
    getReauctionStatus();
    setPayload((prev) => ({ ...prev, expiryAt: status.expiry_at }));
  }, [status]);

  ///timer
  useEffect(() => {
    if (countdown === "NaN:NaN:NaN") setCountdown("fetching...");

    const startCountdown = async () => {
      if (timer) {
        clearInterval(timer);
      }

      let counter = 0;
      const endTime = moment(expiryAt);

      const newTimer = setInterval(() => {
        const now = moment();
        const diff = endTime.diff(now);

        ///end
        if (diff <= 0) {
          setCountdown("00:00:00");
          clearInterval(newTimer);
          setIsCountdownActive(false);

          return;
        }

        const duration = moment.duration(diff);
        const hours = String(duration.hours()).padStart(2, "0");
        const minutes = String(duration.minutes()).padStart(2, "0");
        const seconds = String(duration.seconds()).padStart(2, "0");

        if (isNaN(Number(seconds))) {
          getReauctionStatus().then((data) => {
            setPayload((prev) => ({
              ...prev,
              expiryAt: data.data?.expiry_at!,
            }));
          });
        }

        setIsCountdownActive(true);

        setCountdown(`${hours}:${minutes}:${seconds}`);

        if (counter >= 1) {
          getReauctionList();
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
  }, [expiryAt]);

  return { countdown, isCdLoading, isCountdownActive };
}
