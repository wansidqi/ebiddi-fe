import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

interface Auction {
  auction_event_id: number;
  deposit: number;
  buyer_premium: number;
}

interface HoldedItem {
  auction_event_id: number;
  status?: string;
}

interface ReauctionComponentProps {
  $BiddingClient: {
    id: string;
    state: string;
    connect: () => void;
    subscribe: (channel: string, callback?: (e: any) => void) => void;
    publish: (channel: string, message: any) => void;
  };
}

const ReauctionComponent: React.FC<ReauctionComponentProps> = ({
  $BiddingClient,
}) => {
  const { id: eventId } = useParams<{ id: string }>();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [expiryAt, setExpiryAt] = useState<string>("");
  const [countdown, setCountdown] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [holdedItems, setHoldedItems] = useState<HoldedItem[]>([]);
  const [items, setItems] = useState<HoldedItem[]>([]);

  const channel = {
    event: `event/${eventId}`,
    reauction: `event/${eventId}/reauction`,
  };

  ///uef subscribe
  const connectBiddingEvents = useCallback(() => {
    console.log(`socket connected - ${$BiddingClient.id}`);
    $BiddingClient.subscribe(channel.event);
    $BiddingClient.subscribe(channel.reauction);
  }, [$BiddingClient, channel]);

  ///API
  const getReauctionList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auction/reauction/item/event/${eventId}`
      );
      setAuctions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const useGetReauctionStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auction/reauctionevent/event/${eventId}`
      );
      if (response.data.data) {
        setExpiryAt(response.data.data.expiry_at);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getHoldItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auction/item/event/${eventId}/hold`
      );
      setHoldedItems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  ///post API + publish
  const startReauction = async (isUpdate: boolean, duration: number) => {
    if (!isUpdate) {
      $BiddingClient.publish(channel.event, {
        event_id: eventId,
        status: "REAUCTIONLIST",
      });
    }

    const today = moment(new Date());
    const newExpiryAt = today.add(duration, "seconds").format("YYYY-MM-DD HH:mm:ss"); //prettier-ignore
    setExpiryAt(newExpiryAt);

    const data = `event_id=${eventId}&expiry_at=${newExpiryAt}`;

    ///create new timer
    let url = `${process.env.REACT_APP_API_URL}/auction/reauctionevent`;

    if (isUpdate) {
      ///update existing timer
      url = `${process.env.REACT_APP_API_URL}/auction/reauctionevent/timer`;
    }

    try {
      const response = await axios.post(url, data);
      if (response.data.data) {
        setExpiryAt(response.data.data.expiry_at);
        $BiddingClient.publish(channel.event, {
          status: "REAUCTIONLISTUPDATETIMER",
          expiry_at: response.data.data.expiry_at,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendHoldItems = () => {
    if (holdedItems.length <= 0) {
      getHoldItems();
    }

    if (holdedItems.length > 0) {
      const auctionEventIds = auctions.map(
        (auction) => auction.auction_event_id
      );

      const newItems = holdedItems.map((hItem) => {
        const item = { ...hItem };
        if (auctionEventIds.includes(item.auction_event_id)) {
          item.status = "REQUEST";
        }
        return item;
      });

      setItems(newItems);

      $BiddingClient.publish(channel.reauction, {
        event_id: eventId,
        status: "REAUCTIONLISTUPDATE",
        items: newItems,
        expiry_at: expiryAt,
      });
    }
  };

  ///popup UI
  const showReauctionDialog = (cb: (duration: number) => void) => {
    if ($BiddingClient.state === "open") {
      //   Swal.fire({
      //     title: 'Reauction Event',
      //     text: 'Select your preferred duration?',
      //     input: 'select',
      //     inputOptions: {
      //       '5min': '5 minute',
      //       '10min': '10 minute',
      //       '15min': '15 minute',
      //     },
      //     inputPlaceholder: 'Select a duration',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes',
      //   }).then((result) => {
      //     if (result.value) {
      //       let duration = 0;
      //       switch (result.value) {
      //         case '5min':
      //           duration = 5 * 60;
      //           break;
      //         case '10min':
      //           duration = 10 * 60;
      //           break;
      //         case '15min':
      //           duration = 15 * 60;
      //           break;
      //         default:
      //           break;
      //       }
      //       cb(duration);
      //     }
      //   });
    }
  };

  ///timer in uef
  const startCountdown = () => {
    if (timer) {
      clearInterval(timer);
    }

    let counter = 0;
    const endTime = moment(expiryAt);

    const newTimer = setInterval(() => {
      const now = moment();
      const diff = endTime.diff(now);

      if (diff <= 0) {
        setCountdown("00:00:00");
        clearInterval(newTimer);
        return;
      }

      const duration = moment.duration(diff);
      const hours = String(duration.hours()).padStart(2, "0");
      const minutes = String(duration.minutes()).padStart(2, "0");
      const seconds = String(duration.seconds()).padStart(2, "0");

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

  useEffect(() => {
    $BiddingClient.connect();
    connectBiddingEvents();

    const timer = setTimeout(() => {
      if ($BiddingClient.state === "open") {
        $BiddingClient.subscribe(channel.event);
        $BiddingClient.subscribe(channel.reauction, (e) => {
          console.log(e);
        });
      }
    }, 2000);

    getReauctionList();
    useGetReauctionStatus();

    return () => {
      clearTimeout(timer);
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [connectBiddingEvents, $BiddingClient, channel]);

  useEffect(() => {
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

  return (
    <div className="container pt-md-4 pb-md-4">
      <div className="container">
        <p className="text-left">
          <Link
            className="btn btn-lg bg-dark text-white"
            to={`/alist/${eventId}`}
          >
            <i className="fa fa-chevron-left mr-2"></i>Auction list
          </Link>
          {expiryAt === "" ? (
            <button
              onClick={() =>
                showReauctionDialog((duration) =>
                  startReauction(false, duration)
                )
              }
              className="btn btn-warning btn-lg mb-3 rounded float-right"
            >
              Start Reauction
            </button>
          ) : (
            <button
              onClick={() =>
                showReauctionDialog((duration) =>
                  startReauction(true, duration)
                )
              }
              className="btn btn-warning btn-lg mb-3 rounded float-right"
            >
              Update timer
            </button>
          )}
          {expiryAt !== "" && (
            <button className="btn btn-lg btn-info float-right mr-3">
              {countdown}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default ReauctionComponent;
