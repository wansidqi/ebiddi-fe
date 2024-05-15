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
import { getDate, isCountdown, getTime } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuctionContext } from "@/Context/store/auction-context";
import { useAPIServices } from "@/services";

export function EventCard(props: EventsInterface) {
  const { setTerm } = useAuctionContext();
  const [openDetail, setOpenDetail] = useState(false);

  const { USER } = useAuctionContext();
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
    if (!USER) {
      isCountdown(date) ? setOpenDetail(true) : navigate(`/live/${eventId}`);
    } else {
      try {
        await isVerify({
          event_id: Number(eventId),
          user_id: USER?.id as number,
        });
        setOpenDetail(true);
      } catch (error) {
        setTerm({ showTerm: true, eventId: eventId.toString() });
      }
    }
  };

  const viewAuctionItems = (id: number) => {
    navigate(`/items/${id}`);
  };

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
              <EventDetail
                {...props}
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
              />
            </div>
            <Button
              onClick={() => viewAuctionItems(props.id)}
              className="w-full"
              variant="secondary"
            >
              View Auction Items
            </Button>
          </div>
          <Button
            onClick={() => redirectButton(props.event_date, props.id)}
            className="w-full my-4"
          >
            {USER ? "Join Auction" : "Live Biddings"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
