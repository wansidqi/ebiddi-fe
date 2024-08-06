import {
  Info,
  HandCoins,
  Banknote,
  Building2,
  Handshake,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components";
import { useEffect, useState } from "react";
import {
  BiddiTransactions,
  CompanyInformation,
  DepositInformation,
  PersonalInformation,
  RefundCredit,
  TopupCredit,
} from "..";
import { ROLE } from "@/enum";
import { useStoreContext } from "@/Context";
import { User } from "@/interfaces";
import { useNavigate } from "react-router-dom";

interface Nav {
  name: string;
  icon: JSX.Element;
  content: JSX.Element;
  role: ROLE[];
}

export function NewProfile() {
  const { USER } = useStoreContext();
  const navigate = useNavigate();

  const navs: Nav[] = [
    {
      name: "Personal Information",
      icon: <Info className="h-4 w-4" />,
      content: <PersonalInformation />,
      role: [ROLE.BIDDER, ROLE.AUCTIONEER],
    },
    {
      name: "Biddi Transactions",
      icon: <Receipt className="h-4 w-4" />,
      content: <BiddiTransactions />,
      role: [ROLE.BIDDER],
    },
    {
      name: "Deposit Information",
      icon: <Banknote className="h-4 w-4" />,
      content: <DepositInformation />,
      role: [ROLE.BIDDER],
    },
    {
      name: "Company Information",
      icon: <Building2 className="h-4 w-4" />,
      content: <CompanyInformation />,
      role: [ROLE.BIDDER],
    },
    {
      name: "Topup Credit",
      icon: <HandCoins className="h-4 w-4" />,
      content: <TopupCredit />,
      role: [ROLE.BIDDER],
    },
    {
      name: "Refund Credit",
      icon: <Handshake className="h-4 w-4" />,
      content: <RefundCredit />,
      role: [ROLE.BIDDER],
    },
  ];
  const [select, setSelect] = useState("Personal Information");
  const component = navs.find((item) => item.name === select);

  useEffect(() => {
    if (!USER) navigate("/");
  }, []);

  return (
    <Container className="my-0 mx-0 sm:mx-0">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 mt-10">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <h1 className="text-primary text-lg mb-6">PROFILE</h1>
                {USER &&
                  navs
                    .filter((show) => show.role.includes(USER.role))
                    .map((nav, i) => {
                      const selected = "bg-muted text-primary";
                      const notSelected = "text-muted-foreground";
                      return (
                        <button
                          onClick={() => setSelect(nav.name)}
                          key={i}
                          className={`${select === nav.name ? selected : notSelected} flex items-center gap-3 rounded-lg transition-all hover:text-primary px-3 py-3`}
                        >
                          {nav.icon}
                          {nav.name}
                        </button>
                      );
                    })}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <HeaderNav
            select={select}
            setSelect={setSelect}
            USER={USER}
            navs={navs}
          />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg text-primary font-semibold md:text-2xl">
                {select}
              </h1>
            </div>
            <div
              className="flex justify-center lg:py-10 rounded-lg border shadow-sm w-full"
              x-chunk="dashboard-02-chunk-1"
            >
              {component?.content}
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
}

const HeaderNav = ({
  select,
  setSelect,
  navs,
  USER,
}: {
  select: string;
  setSelect: any;
  navs: Nav[];
  USER: User | null;
}) => {
  return (
    <header className="w-screen md:hidden flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div>
        <div className="w-full flexcenter gap-4">
          {USER &&
            navs
              .filter((show) => show.role.includes(USER.role))
              .map((nav, i) => {
                const selected = "bg-primary";
                const notSelected = "bg-muted text-primary";
                return (
                  <Button
                    size="icon"
                    onClick={() => setSelect(nav.name)}
                    key={i}
                    className={`${select === nav.name ? selected : notSelected} shrink-0 md:hidden flex items-center gap-3 rounded-lg transition-all px-3 py-3`}
                  >
                    {nav.icon}
                  </Button>
                );
              })}
        </div>
      </div>
      <div className="w-full flex-1"></div>
    </header>
  );
};
