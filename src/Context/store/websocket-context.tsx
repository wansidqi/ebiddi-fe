import { SubscribeParams, PublishParams } from "@/interfaces/websocket";
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
  publish<T>(params: PublishParams<T>): void;
};

function WsContext(props: React.PropsWithChildren<{}>) {
  const [socket, setSocket] = useState<ws>(null);

  async function subscription<T>(params: SubscribeParams<T>) {
    if (!socket) return;

    let topic: string;

    switch (params.channel) {
      case "event":
        // topic = `/event/${params.id}`;
        topic = "TEST_SOCKET";
        break;

      case "bid":
        // topic = `/event/${params.id}/${params.channel}`;
        topic = "TEST_BID";
        break;

      case "status":
        topic = `/event/${params.id}/${params.channel}`;
        break;

      default:
        throw new Error(`Unknown channel: ${params.channel}`);
    }

    const channel = socket.subscribe(topic);

    for await (const data of channel) {
      try {
        // console.log(data);
        params.onData(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function publish<T>(params: PublishParams<T>) {
    if (!socket) return;
    // const event = `event/${params.id}`;
    // const bid = `event/${params.id}/auction/${params.auction_id}/bid`;
    const event = "TEST_SOCKET";
    const bid = "TEST_BID";

    const channel = params.channel === "bid" ? bid : event;

    socket.invokePublish(channel, params.data);
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
    publish,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default WsContext;
