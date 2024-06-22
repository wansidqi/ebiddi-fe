import { ModeToggle } from "@/Theme/ModeToggle";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftCircle,
  Home,
  LogOut,
  ReceiptText,
  ScrollText,
  UserRound,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import icon from "@/assets/images/e-biddi icon.png";
import { useStoreContext } from "@/Context";
import { DynamicRenderer, Hamburger } from "@/components";
import { useAPIServices } from "@/services";
import { ROLE } from "@/enum";

export function Navigation() {
  const navigate = useNavigate();
  const { USER } = useStoreContext();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const { usePostLogout } = useAPIServices();
  const { mutateAsync } = usePostLogout();

  const back = () => {
    navigate(-1);
  };

  const iconAttribute = {
    size: "23px",
    color: "white",
  };

  const navMenu = [
    {
      name: "Home",
      role: [ROLE.BIDDER, ROLE.AUCTIONEER],
      callback: () => navigate("/events"),
      icon: <Home color={iconAttribute.color} size={iconAttribute.size} />,
    },
    {
      name: "Profile",
      role: [ROLE.BIDDER, ROLE.AUCTIONEER],
      callback: () => navigate("/profile"),
      icon: <UserRound color={iconAttribute.color} size={iconAttribute.size} />,
    },
    {
      name: "Contract",
      role: [ROLE.BIDDER],
      callback: () => navigate("/contract"),
      icon: (
        <ScrollText color={iconAttribute.color} size={iconAttribute.size} />
      ),
    },
    {
      name: "Policy",
      role: [ROLE.BIDDER],
      callback: () => navigate("/policy"),
      icon: (
        <ReceiptText color={iconAttribute.color} size={iconAttribute.size} />
      ),
    },
    {
      name: "Logout",
      role: [ROLE.BIDDER, ROLE.AUCTIONEER],
      callback: () => {
        mutateAsync();
      },
      icon: <LogOut color={iconAttribute.color} size={iconAttribute.size} />,
    },
  ];

  const navigateAndCloseSidebar = (callback: () => void) => {
    setShowSidebar(false);
    callback();
  };

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    const handleClick = (event: any) => {
      if (sidebarRef.current && event.target === sidebarRef.current) {
        setShowSidebar(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showSidebar]);

  return (
    <Fragment>
      <DynamicRenderer>
        <DynamicRenderer.When cond={USER !== null}>
          <div className="flex justify-between py-3 px-5 sm:px-10 gap-2 sticky top-0 z-50 bg-[#011138] text-primary">
            <div className="flex gap-4">
              <button
                onClick={() => setShowSidebar(true)}
                className="sm:hidden"
              >
                <Hamburger />
              </button>
              <button onClick={() => navigate("/events")}>
                <img width={"50px"} src={icon} alt="" />
              </button>
            </div>

            <main id="sidebar">
              {showSidebar && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
              )}
              <div
                ref={sidebarRef}
                className={`roboto scrollbar-hidden fixed inset-0 z-50 overflow-auto bg-opacity-70 ${
                  showSidebar
                    ? "translate-x-0 transform transition-transform duration-300 ease-in-out"
                    : "-translate-x-full transform transition-transform duration-300 ease-in-out"
                }`}
              >
                <div className="z-50 min-h-screen w-3/4 overflow-auto border-x bg-[#011138] text-[16px]">
                  <div className="p-0">
                    <div className="flex flex-col justify-start gap-6 py-10 w-full sm:hidden">
                      {USER &&
                        navMenu
                          .filter((show) => show.role.includes(USER.role))
                          .map((item, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                navigateAndCloseSidebar(item.callback)
                              }
                            >
                              <div className="flex ml-4 gap-3">
                                <div>{item.icon}</div>
                                <p>{item.name}</p>
                              </div>
                            </button>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <main
              id="navbar"
              className="sm:flex gap-5 justify-end w-full hidden"
            >
              {USER &&
                navMenu
                  .filter((show) => show.role.includes(USER.role))
                  .map((item, i) => (
                    <button key={i} onClick={item.callback}>
                      <div className="flexcenter gap-2">
                        <div>{item.icon}</div>
                        <p className="mt-2">{item.name}</p>
                      </div>
                    </button>
                  ))}
            </main>

            <div className="sm:ml-5">
              <ModeToggle />
            </div>
          </div>
        </DynamicRenderer.When>
        <DynamicRenderer.Else>
          <main className="flex justify-between m-5">
            <button onClick={back} className="border-secondary rounded-md p-2">
              <ArrowLeftCircle strokeWidth={3} size={"28px"} />
            </button>
            <div className="">
              <ModeToggle />
            </div>
          </main>
        </DynamicRenderer.Else>
      </DynamicRenderer>
    </Fragment>
  );
}
