import {
  EventData,
  StatusData,
  PubBid,
  SubBid,
  Publication,
  Subscription,
  ReauctionData,
} from "@/interfaces/websocket";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as socketClusterClient from "socketcluster-client";
import { BidStatus, COUNTDOWN, ROLE } from "@/enum";
import { useAuctionContext } from "./auction-context";

export function useWsContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("state must be used within a ContextProvider");
  }
  return context;
}

const AppContext = createContext<Data | null>(null);

type ws = socketClusterClient.AGClientSocket | null;

type Data = {
  socket: ws;

  subscribeBid: (params: SubBid) => Promise<void>;
  publishEvent: (params: Publication<EventData>) => void;

  publishBid: (params: PubBid) => void;
  subscribeEvent: (params: Subscription<EventData>) => Promise<void>;
  subscribeStatus: (params: Subscription<StatusData>) => Promise<void>;
  unsubscribeEvent: (event_id: string) => void;
  subscribeReauction: (params: Subscription<ReauctionData>) => Promise<void>;
  publishReauction: (params: Publication<ReauctionData>) => void;

  payload: EventData;
  setPayload: React.Dispatch<React.SetStateAction<EventData>>;

  bidStatus: BidStatus;
  setBidStatus: React.Dispatch<React.SetStateAction<BidStatus>>;

  bidListIndex: number;
  setBidListIndex: React.Dispatch<React.SetStateAction<number>>;

  currentPage: "bidding" | "reauctionlist";
  setCurrentPage: React.Dispatch<
    React.SetStateAction<"bidding" | "reauctionlist">
  >;
};

function WsContext(props: React.PropsWithChildren<{}>) {
  const { USER, dev } = useAuctionContext();

  const [socket, setSocket] = useState<ws>(null);
  const [payload, setPayload] = useState<EventData>({
    auction_id: "",
    event_id: "",
    bid: {
      current: 0,
      next: 0,
      start: 0,
      up: 0,
    },
    countdown: COUNTDOWN.initial,
    status: "DISPLAY",
    bidders: {
      all: [],
      highest_amount: 0,
      highest_user_id: 0,
      highest_user_name: "",
    },
    expiryAt: "",
    holdItems: [],
    auction_event_id: "",
  });
  const [bidStatus, setBidStatus] = useState<BidStatus>(0);
  const [bidListIndex, setBidListIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState<"bidding" | "reauctionlist">("bidding"); //prettier-ignore

  const isAuctioneer = USER?.role === ROLE.AUCTIONEER;

  const publishBid = (params: PubBid) => {
    if (!socket) return;
    let channel = `event/${params.event_id}/auction/${params.auction_id}/bid`;
    let test_channel = `test/event/${params.event_id}/auction/${params.auction_id}/bid`;
    !isAuctioneer &&
      socket.invokePublish(dev ? test_channel : channel, params.data);
  };

  const subscribeBid = async (params: SubBid) => {
    if (!socket) return;

    if (isAuctioneer) {
      const url = `event/${params.event_id}/auction/${params.auction_id}/bid`;
      const test_url = `test/event/${params.event_id}/auction/${params.auction_id}/bid`;
      const channel = socket.subscribe(dev ? test_url : url);

      for await (const data of channel) {
        try {
          params.onData && params.onData(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const publishEvent = (params: Publication<EventData>) => {
    if (!socket) return;
    const channel = `event/${params.event_id}`;
    const test_channel = `test/event/${params.event_id}`;
    isAuctioneer &&
      socket.invokePublish(dev ? test_channel : channel, params.data);
  };

  const subscribeEvent = async (params: Subscription<EventData>) => {
    if (!socket) return;

    if (!isAuctioneer) {
      const url = `event/${params.event_id}`;
      const test_url = `test/event/${params.event_id}`;
      const channel = socket.subscribe(dev ? test_url : url);

      for await (const data of channel) {
        try {
          params.onData && params.onData(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const subscribeStatus = async (params: Subscription<StatusData>) => {
    if (!socket) return;

    if (!isAuctioneer) {
      const url = `event/${params.event_id}/status`;
      // const test_url = `test/event/${params.event_id}/status`;
      // const channel = socket.subscribe(dev ? test_url : url);
      const channel = socket.subscribe(url);

      for await (const data of channel) {
        try {
          params.onData && params.onData(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const unsubscribeEvent = (event_id: string) => {
    if (!socket) return;
    const url = `event/${event_id}`;
    const test_url = `test/event/${event_id}`;
    socket.unsubscribe(dev ? test_url : url);
  };

  const subscribeReauction = async (params: Subscription<ReauctionData>) => {
    if (!socket) return;

    const url = `event/${params.event_id}/reauction`;
    const test_url = `test/event/${params.event_id}/reauction`;
    const channel = socket.subscribe(dev ? test_url : url);

    for await (const data of channel) {
      try {
        params.onData && params.onData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const publishReauction = (params: Publication<ReauctionData>) => {
    if (!socket) return;
    const channel = `event/${params.event_id}/reauction`;
    const test_channel = `test/event/${params.event_id}/reauction`;
    socket.invokePublish(dev ? test_channel : channel, params.data);
  };

  useEffect(() => {
    const init = () => {
      const newSocket = socketClusterClient.create({
        hostname: "bidding.e-biddi.com",
        secure: true,
        port: 443,
        autoConnect: true,
        protocolVersion: 1,
        path: "/socketcluster/",
      });

      newSocket.connect();
      setSocket(newSocket);
    };
    init();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const contextValue: Data = {
    socket,
    payload,
    setPayload,
    subscribeBid,
    publishEvent,
    publishBid,
    subscribeEvent,
    subscribeStatus,
    bidStatus,
    setBidStatus,
    bidListIndex,
    setBidListIndex,
    unsubscribeEvent,
    currentPage,
    setCurrentPage,
    subscribeReauction,
    publishReauction,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default WsContext;
