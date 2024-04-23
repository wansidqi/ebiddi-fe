import { Button } from "@/components/ui/button";

export function Home() {
  return (
    <div className="max-h-screen py-7">
      <p className="text-4xl font-extrabold text-center my-6">Get The App</p>
      <div className="flexcenter-col gap-5 text-center">
        <p>To enjoy full user experience, please download our mobile app!</p>
        <p>
          For public members to view live auctions without registration, click
          on “View Live Auction” tab
        </p>
        <Button>View Live Auctions</Button>
        <p>
          For registered users, view auction units and participate into live
          auctions by clicking on “Sign In” tab.
        </p>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}
