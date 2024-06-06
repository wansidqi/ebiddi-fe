import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDaysIcon, Clock, LucideNavigation } from "lucide-react";
import { EventDetail } from "..";
import { EventsInterface } from "@/interfaces";
import { getDate, isCountdown, getTime, roleRenderer } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAPIServices } from "@/services";
import { useStoreContext } from "@/Context";

export function EventCard(props: EventsInterface) {
  //#region
  const { setTerm, USER } = useStoreContext();
  const { openDetailModal } = useStoreContext();

  const navigate = useNavigate();

  const { usePostVerifyAgreement } = useAPIServices();
  const { mutateAsync: isVerify } = usePostVerifyAgreement();

  const eventContent = [
    {
      name: "date",
      icon: <CalendarDaysIcon size="15px" />,
      value: getDate(props.event_date),
    },
    {
      name: "time",
      icon: <Clock size="15px" />,
      value: getTime(props.event_date),
    },
    {
      name: "location",
      icon: <LucideNavigation size="15px" />,
      value: props.name,
    },
  ];

  const redirectButton = async (date: string, eventId: number) => {
    const handleRedirect = () => {
      isCountdown(date)
        ? openDetailModal(eventId)
        : navigate(`/live/${eventId}`);
    };

    if (!USER) {
      handleRedirect();
      return;
    }

    try {
      await isVerify({ event_id: eventId, user_id: USER.id });
      handleRedirect();
    } catch (error) {
      setTerm({ showTerm: true, eventId: eventId.toString() });
    }
  };

  const viewAuctionItems = () => {
    roleRenderer({
      role: USER?.role,
      //TODO: navigation endpoint auctionID
      auctioneer: navigate(`/auctioneer/`),
      bidder: navigate(`/items/${props.id}`),
      noRole: navigate(`/items/${props.id}`),
    });
  };
  //#endregion

  return (
    <>
      <Card className="rounded-sm py-3">
        <CardHeader>
          <CardTitle>{props.name?.toUpperCase()}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent className="text-[14px]">
          {eventContent.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              {item.icon}
              <p>{item.value}</p>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flexcenter-col justify-between mt-4">
          <div className="flex justify-between gap-4 w-full">
            <div className="w-full">
              <EventDetail {...props} eventId={props.id} />
            </div>
            <Button
              onClick={viewAuctionItems}
              className="w-full"
              variant="secondary"
            >
              {roleRenderer({
                role: USER?.role,
                auctioneer: "Contract",
                bidder: "View Auction Items",
                noRole: "View Auction Items",
              })}
            </Button>
          </div>
          <Button
            onClick={() => redirectButton(props.event_date, props.id)}
            className="w-full my-4"
          >
            {roleRenderer({
              role: USER?.role,
              auctioneer: "Enter Events",
              bidder: "Join Auction",
              noRole: "Live Biddings",
            })}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
