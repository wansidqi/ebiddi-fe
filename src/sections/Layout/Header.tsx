import { ModeToggle } from "@/Theme/ModeToggle";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftCircle,
  Home,
  LogOut,
  ReceiptText,
  ScrollText,
  UserRound,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect } from "react";
import icon from "@/assets/images/e-biddi icon.png";

export function Header() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, []);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const size = "40px";

  return (
    <>
      <div className="flex p-3 gap-2 sticky top-0 bg-primary">
        <button>
          <img width={"50px"} src={icon} alt="" />
        </button>
        <div className="flex gap-2 justify-end w-full">
          <Link to={"/events"}>
          <Home color="black" size={size} />
          </Link>
          <Link to={"/profile"}>
            <UserRound color="black" size={size} />
          </Link>
          <ScrollText color="black" size={size} />
          <Link to={"/contract"}>
            <ReceiptText color="black" size={size} />
          </Link>
          <LogOut color="black" size={size} />
        </div>
      </div>

      <div className="flex justify-between m-5">
        <button onClick={back} className="border-secondary rounded-md p-2">
          <ArrowLeftCircle strokeWidth={3} size={"28px"} />
        </button>
        <div className="">
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
