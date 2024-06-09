import {
  EventData,
  StatusData,
  PubBid,
  SubBid,
  Publication,
  Subscription,
  BidData,
} from "@/interfaces/websocket";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as socketClusterClient from "socketcluster-client";
import { TOKEN, getToken } from "@/datasource/sessionStorage.datasource";
import { BidStatus, ROLE } from "@/interfaces/enum";

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

  bidData: BidData;
  setBidData: React.Dispatch<React.SetStateAction<BidData>>;

  payload: EventData;
  setPayload: React.Dispatch<React.SetStateAction<EventData>>;

  bidStatus: BidStatus;
  setBidStatus: React.Dispatch<React.SetStateAction<BidStatus>>;
};

function WsContext(props: React.PropsWithChildren<{}>) {
  const isTest = true;
  const [socket, setSocket] = useState<ws>(null);
  const [bidData, setBidData] = useState<BidData>({
    amount: 0,
    name: "",
    user_id: 0,
  });
  const [payload, setPayload] = useState<EventData>({
    auction_id: "",
    event_id: "",
    bid: {
      current: 0,
      next: 0,
      start: 0,
      up: 0,
    },
    countdown: 11,
    status: "DISPLAY",
    bidders: {
      all: [],
      highest_amount: 0,
      highest_user_id: 0,
      highest_user_name: "",
    },
  });
  const [bidStatus, setBidStatus] = useState<BidStatus>(1);

  const isAuctioneer =
    JSON.parse(getToken(TOKEN.user) as string).role === ROLE.AUCTIONEER;

  const publishBid = (params: PubBid) => {
    if (!socket) return;
    let channel = `event/${params.event_id}/auction/${params.auction_id}/bid`;
    let test_channel = `test/event/${params.event_id}/auction/${params.auction_id}/bid`;
    !isAuctioneer &&
      socket.invokePublish(isTest ? test_channel : channel, params.data);
  };

  const subscribeBid = async (params: SubBid) => {
    if (!socket) return;

    if (isAuctioneer) {
      const url = `event/${params.event_id}/auction/${params.auction_id}/bid`;
      const test_url = `test/event/${params.event_id}/auction/${params.auction_id}/bid`;
      const channel = socket.subscribe(isTest ? test_url : url);

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
      socket.invokePublish(isTest ? test_channel : channel, params.data);
  };

  const subscribeEvent = async (params: Subscription<EventData>) => {
    if (!socket) return;

    if (!isAuctioneer) {
      const url = `event/${params.event_id}`;
      const test_url = `test/event/${params.event_id}`;
      const channel = socket.subscribe(isTest ? test_url : url);

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
      const test_url = `test/event/${params.event_id}/status`;
      const channel = socket.subscribe(isTest ? test_url : url);

      for await (const data of channel) {
        try {
          params.onData && params.onData(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // useEffect(() => {
  //   const testSubPub = async () => {
  //     if (!socket) return;
  //     let channel = "mychannel";
  //     socket.invokePublish(channel, { message: "hello" });

  //     let myChannel = socket.subscribe(channel);
  //     for await (const data of myChannel) {
  //       try {
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   testSubPub();
  // }, [socket]);

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
    bidData,
    setBidData,
    payload,
    setPayload,
    subscribeBid,
    publishEvent,
    publishBid,
    subscribeEvent,
    subscribeStatus,
    bidStatus,
    setBidStatus,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default WsContext;
