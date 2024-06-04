import { useStoreContext } from "@/Context";
import { useEffect } from "react";

export const WS = () => {
  const { socket, testSubscription, publishData } = useStoreContext();

  useEffect(() => {
    testSubscription("TESTFROMSOCKET", (data) => {
      console.log(data);
    });
    return () => {
      console.log("close");
      socket?.unsubscribe("TESTFROMSOCKET");
    };
  }, [socket]);

  const sendData = async () => {
    publishData("TESTFROMSOCKET", { message: "success publish data" });
  };

  return (
    <div className="flexcenter-col min-h-screen gap-4">
      <span>The WebSocket is {socket ? socket.state : "disconnected"}</span>
      <button onClick={sendData}>send data</button>
    </div>
  );
};
