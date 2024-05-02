import { ModeToggle } from "@/Theme/ModeToggle";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect } from "react";

export function Header() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, []);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between m-5">
      <button onClick={back} className="border-secondary rounded-md p-2">
        <ArrowLeftCircle strokeWidth={3} size={"28px"} />
      </button>
      <div className="">
        <ModeToggle />
      </div>
    </div>
  );
}
