import { useStoreContext } from "@/Context";

export const WS = () => {
  const { socket } = useStoreContext();

  return (
    <div className="flexcenter-col min-h-screen gap-4">
      <span>The WebSocket is {socket ? socket.state : "disconnected"}</span>
    </div>
  );
};
