import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

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
        <Button>Sign In</Button>
      </div>
    </Container>
  );
}
