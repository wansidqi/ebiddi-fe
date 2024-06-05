import { SubscribeParams, PublishBid } from "@/interfaces/websocket";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as socketClusterClient from "socketcluster-client";

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
  subscription<T>(params: SubscribeParams<T>): Promise<void>;
  publishBid(params: PublishBid): void;
};

function WsContext(props: React.PropsWithChildren<{}>) {
  const [socket, setSocket] = useState<ws>(null);

  async function subscription<T>(params: SubscribeParams<T>) {
    if (!socket) return;

    const topic =
      params.channel === "event"
        ? `/event/${params.id}`
        : `/event/${params.id}/${params.channel}`;

    const channel = socket.subscribe(topic);
  
    for await (const data of channel) {
      try {
        console.log(data);
        // params.onData(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function publishBid(params: PublishBid) {
    if (!socket) return;
    // const channel = `event/${params.id}/auction/${params.auction_id}/bid`;
    const testing = "TEST_SOCKET";
    socket.invokePublish(testing, params.data);
  }

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
    subscription,
    publishBid,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default WsContext;
