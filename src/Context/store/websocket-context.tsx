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
import { COUNTDOWN, ROLE } from "@/enum";
import { useAuction } from "./auction-context";

const AppContext = createContext<SocketData | null>(null);

type ws = socketClusterClient.AGClientSocket | null;

type SocketData = {
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

  bidListIndex: number;
  setBidListIndex: React.Dispatch<React.SetStateAction<number>>;

  currentPage: "bidding" | "reauctionlist";
  setCurrentPage: React.Dispatch<
    React.SetStateAction<"bidding" | "reauctionlist">
  >;

  viewer: {
    connection: number;
    bidder: number;
  };
  resetBidder: () => void;
  bidderIn: () => Promise<void>;
  bidderOut: () => Promise<void>;
};

export function SocketProvider(props: React.PropsWithChildren<{}>) {
  const { USER } = useAuction();

  const [socket, setSocket] = useState<ws>(null);
  // const socket = socketClusterClient.create({
  //   hostname: "bidding.e-biddi.com",
  //   secure: true,
  //   port: 443,
  //   autoConnect: true,
  //   protocolVersion: 1,
  //   path: "/socketcluster/",
  // });

  const [bidListIndex, setBidListIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState<"bidding" | "reauctionlist">("bidding"); //prettier-ignore

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
    // expiryAt: "",
    isResume: false,
    holdItems: [],
    auction_event_id: "",
    auction: undefined,
    bidStatus: 0,
  });

  const [viewer, setViewer] = useState({
    connection: 0,
    bidder: 0,
  });

  const isAuctioneer = USER?.role === ROLE.AUCTIONEER;
  const isBidder = USER?.role === ROLE.BIDDER;

  const publishBid = (params: PubBid) => {
    if (!socket) return;
    let channel = `event/${params.event_id}/auction/${params.auction_id}/bid`;
    !isAuctioneer && socket.invokePublish(channel, params.data);
  };

  const subscribeBid = async (params: SubBid) => {
    if (!socket) return;

    if (isAuctioneer) {
      const url = `event/${params.event_id}/auction/${params.auction_id}/bid`;
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

  const publishEvent = (params: Publication<EventData>) => {
    if (!socket) return;
    const channel = `event/${params.event_id}`;
    isAuctioneer && socket.invokePublish(channel, params.data);
  };

  const subscribeEvent = async (params: Subscription<EventData>) => {
    if (!socket) return;

    if (!isAuctioneer) {
      const url = `event/${params.event_id}`;
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

  const subscribeStatus = async () => {
    if (!socket) return;

    const channel = socket.subscribe("status");

    for await (const data of channel) {
      try {
        setViewer({
          connection: data.total_connection,
          bidder: data.total_bidder,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unsubscribeEvent = (event_id: string) => {
    if (!socket) return;
    const url = `event/${event_id}`;
    socket.unsubscribe(url);
  };

  const subscribeReauction = async (params: Subscription<ReauctionData>) => {
    if (!socket) return;

    const url = `event/${params.event_id}/reauction`;
    const channel = socket.subscribe(url);

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
    socket.invokePublish(channel, params.data);
  };

  const resetBidder = async () => {
    if (!socket) return;

    try {
      socket.invoke("bidder_reset", 0);
    } catch (error) {
      console.log(error);
    }
  };

  const bidderIn = async () => {
    if (!isBidder) return;
    if (!socket) return;

    try {
      socket.invoke("bidder_in", 0);
    } catch (error) {
      console.log(error);
    }
  };

  const bidderOut = async () => {
    if (!isBidder) return;
    if (!socket) return;

    try {
      socket.invoke("bidder_out", 0);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    subscribeStatus();
  }, [socket]);

  const contextValue: SocketData = {
    socket,
    payload,
    setPayload,
    subscribeBid,
    publishEvent,
    publishBid,
    subscribeEvent,
    subscribeStatus,
    bidListIndex,
    setBidListIndex,
    unsubscribeEvent,
    currentPage,
    setCurrentPage,
    subscribeReauction,
    publishReauction,
    viewer,
    resetBidder,
    bidderIn,
    bidderOut,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export function useSocket() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("state must be used within a ContextProvider");
  }
  return context;
}
