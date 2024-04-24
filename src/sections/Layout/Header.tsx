import { ModeToggle } from "@/Theme/ModeToggle";
import { useNavigate } from "react-router-dom";
import { ArrowLeftFromLine } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between m-5">
      <button onClick={back} className="border border-secondary rounded-md p-2">
        <ArrowLeftFromLine strokeWidth={3} size={"22px"} />
      </button>
      <div className="">
        <ModeToggle />
      </div>
    </div>
  );
}
