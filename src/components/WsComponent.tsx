import { useStoreContext } from "@/Context";
import { useEffect } from "react";

export const WS = () => {
  const { socket, subscription, publishBid } = useStoreContext();

  async function testSubscription<T>(name: string, onData: (data: T) => void) {
    if (!socket) return;
    let channel = socket.subscribe(name);

    for await (let data of channel) {
      onData(data);
    }
  }

  function testPublish<T>(channelName: string, data: T) {
    if (!socket) return;
    socket.invokePublish(channelName, data);
  }

  useEffect(() => {
    testSubscription("TEST_SOCKET", (data) => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    subscription({
      channel: "event",
      id: "1155",
      onData: (data) => console.log(data),
    });

    return () => {
      socket?.unsubscribe("event");
    };
  }, [socket]);

  const bid = async () => {
    publishBid({
      id: "1123",
      auction_id: "121",
      data: { name: "Sidqi", amount: 1150, user_id: "251" },
    });
  };

  const sendData = () => {
    testPublish("TEST_SOCKET", { message: "success publish data" });
  };

  return (
    <div className="flexcenter-col min-h-screen gap-4">
      <span>The WebSocket is {socket ? socket.state : "disconnected"}</span>
      <button onClick={bid}>Bid Item</button>
      <button onClick={sendData}>send data</button>
    </div>
  );
};
