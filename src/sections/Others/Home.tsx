import { useStoreContext } from "@/Context";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { DEV } from "@/enum";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const { socket } = useStoreContext();

  const [data, setData] = useState("");

  const subEvent = async () => {
    if (!socket) return;
    const channel = socket.subscribe("test");

    for await (const data of channel) {
      try {
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pubEvent = (data: any) => {
    if (!socket) return;
    const channel = `test`;
    socket.invokePublish(channel, data);
  };

  const onEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      pubEvent(data);
    }
  };

  useEffect(() => {
    subEvent();
  }, []);

  return (
    <Container className="max-h-screen py-7">
      <p className="text-4xl font-extrabold text-center">Get The App</p>
      <div className="flexcenter-col gap-5 my-8 text-center">
        <p>To enjoy full user experience, please download our mobile app!</p>
        <p>
          For public members to view live auctions without registration, click
          on “View Live Auction” tab
        </p>
        <Button onClick={() => navigate("/events")}>View Live Auctions</Button>
        <p>
          For registered users, view auction units and participate into live
          auctions by clicking on “Sign In” tab.
        </p>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
      </div>

      {DEV && (
        <div className="flexcenter-col gap-5">
          <input
            onKeyDown={onEnterClick}
            className="text-black pl-3 py-2"
            type="text"
            onChange={(e) => setData(e.target.value)}
          />
          <button
            onClick={() => pubEvent(data)}
            className="bg-emerald-500 px-10 py-3 rounded-md"
          >
            publish
          </button>
        </div>
      )}
    </Container>
  );
}
