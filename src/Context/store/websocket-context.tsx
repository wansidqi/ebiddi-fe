import React, { createContext, useContext, useEffect, useState } from "react";
import * as socketClusterClient from "socketcluster-client";

const AppContext = createContext<Data | null>(null);

type ws = socketClusterClient.AGClientSocket | null;

export function useWsContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("state must be used within a ContextProvider");
  }
  return context;
}

type Data = {
  socket: ws;
  setSocket: React.Dispatch<React.SetStateAction<ws>>;
};

function WsContext(props: React.PropsWithChildren<{}>) {
  const [socket, setSocket] = useState<ws>(null);
  const contextValue: Data = {
    socket,
    setSocket,
  };

  const init = () => {
    const socket = socketClusterClient.create({
      hostname: "bidding.e-biddi.com",
      secure: true,
      port: 443,
      autoConnect: true,
      protocolVersion: 1,
      path: "/socketcluster/",
    });

    try {
      socket.connect();
      setSocket(socket);
    } catch (error) {
      socket.disconnect();
      console.error("Error connecting to WebSocket:", error);
    }
  };

  useEffect(() => {
    init();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default WsContext;
