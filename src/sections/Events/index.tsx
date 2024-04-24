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
import { isCountdown } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function EventCard(props: EventsInterface) {
  const [openDetail, setOpenDetail] = useState(false);
  const navigate = useNavigate();

  const eventContent = [
    {
      name: "date",
      icon: <CalendarDaysIcon size="15px" />,
      value: props.date,
    },
    {
      name: "time",
      icon: <Clock size="15px" />,
      value: props.time,
    },
    {
      name: "location",
      icon: <LucideNavigation size="15px" />,
      value: props.location,
    },
  ];

  const redirectButton = (date: Date) => {
    isCountdown(date) ? setOpenDetail(true) : navigate("/");
  };

  const viewAuctionItems = (id: number) => {
    navigate(`/items/${id}`);
  };

  return (
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
          onClick={() => redirectButton(props.live)}
          className="w-full my-4"
        >
          Live Biddings
        </Button>
      </CardFooter>
    </Card>
  );
}
