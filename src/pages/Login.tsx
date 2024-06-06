import { useStoreContext } from "@/Context";
import logo from "@/assets/images/e-biddi icon.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onEnterClick } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { LogInIcon, Home } from "lucide-react";
import { useState } from "react";

export function Login() {
  const { usePostLogin } = useAPIServices();
  const { mutateAsync } = usePostLogin();
  const { dev } = useStoreContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const credentials = { username, password };

  const bidderCredentials = {
    username: import.meta.env.VITE_BIDDER,
    password: import.meta.env.VITE_PASSWORD,
  };

  const auctionnerCredentials = {
    username: import.meta.env.VITE_AUCTIONEER,
    password: import.meta.env.VITE_PASSWORD,
  };

  return (
    <div className="flexcenter-col mx-8 my-auto h-screen gap-7">
      <img className="w-40" src={logo} alt="" />
      <h1 className="text-3xl">LOGIN TO E-BIDDI</h1>
      <div className="flex flex-col w-full sm:w-1/3 gap-4">
        <div>
          <Label className="text-xl" htmlFor="email">
            Username
          </Label>
          <Input
            onKeyDown={(e) => onEnterClick(e, () => mutateAsync(credentials))}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            className="py-4"
            placeholder="ebiddi"
          />
        </div>
        <div>
          <Label className="text-xl" htmlFor="username">
            Password
          </Label>
          <Input
            onKeyDown={(e) => onEnterClick(e, () => mutateAsync(credentials))}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="py-4"
            placeholder="password"
          />
        </div>
      </div>
      <Button
        onClick={() => mutateAsync(credentials)}
        className="w-full text-xl pt-2 pb-1 sm:w-1/3"
      >
        <div className="relative w-full text-center">
          <p>Login</p>
          <div className="absolute top-0 right-10">
            <LogInIcon />
          </div>
        </div>
      </Button>

      <div className={dev ? "flex gap-4" : "hidden"}>
        <button
          onClick={() => mutateAsync(bidderCredentials)}
          className="w-40 pt-3 pb-2 px-3 bg-yellow-500 rounded-md"
        >
          bidder
        </button>
        <button
          onClick={() => mutateAsync(auctionnerCredentials)}
          className="w-40 pt-3 pb-2 px-3 bg-green-500 rounded-md"
        >
          auctioneer
        </button>
      </div>

      <div className="flexcenter-col gap-2 mt-3">
        <a
          className="text-xl flex gap-2 text-primary"
          href="https://www.e-biddi.com/"
        >
          <Home size={"20px"} />
          <div>E-Biddi Home Page</div>
        </a>
        <a className="text-xl flex gap-2 text-primary" href="/events">
          <div>View Live Page</div>
        </a>
      </div>
    </div>
  );
}
