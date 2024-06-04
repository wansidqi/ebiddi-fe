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

interface SubscribeParams<T> {
  id: string;
  channel: "event" | "bid" | "status";
  onData: (data: T) => any;
}

type Data = {
  socket: ws;
  publishData<T>(name: string, data: T): void;
  subscription<T>(params: SubscribeParams<T>): Promise<void>;
  testSubscription<T>(name: string, onData: (data: T) => void): Promise<void>;

};

function WsContext(props: React.PropsWithChildren<{}>) {
  const [socket, setSocket] = useState<ws>(null);

  async function testSubscription<T>(name: string, onData: (data: T) => void) {
    if (!socket) return;
    let channel = socket.subscribe(name);

    for await (let data of channel) {
      onData(data);
    }
  }

  async function subscription<T>(params: SubscribeParams<T>) {
    if (!socket) return;

    const topic =
      params.channel === "event"
        ? `/event/${params.id}`
        : `/event/${params.id}/${params.channel}`;
    const channel = socket.subscribe(topic);

    for await (const data of channel) {
      params.onData(data);
    }
  }

  function publishData<T>(channelName: string, data: T) {
    if (!socket) return;
    socket.invokePublish(channelName, data);
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
    testSubscription,
    publishData,
    subscription,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default WsContext;
