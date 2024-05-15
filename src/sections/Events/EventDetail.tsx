import { cn, getDate, getTime } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarDaysIcon, Clock, XCircleIcon } from "lucide-react";
import { Countdown } from "./EventCountdown";
import { EventsInterface } from "@/interfaces";

interface Props extends EventsInterface {
  openDetail?: boolean;
  setOpenDetail?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EventDetail(props: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={props.openDetail} onOpenChange={props.setOpenDetail}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Event</DialogTitle>
          </DialogHeader>
          <Detail {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={props.openDetail} onOpenChange={props.setOpenDetail}>
      <DrawerTrigger asChild>
        <Button className="w-full" variant="outline">
          Details
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">Event</DrawerTitle>
        </DrawerHeader>
        <Detail {...props} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild className="absolute top-5 right-5">
            <button>
              <XCircleIcon />
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function Detail(props: Props) {
  return (
    <div className={cn("mx-5 text-center text-[14px] flex flex-col gap-3")}>
      <p>{props.name?.toUpperCase()}</p>

      <div className="flexcenter gap-5 py-2">
        <div className="flexcenter gap-2">
          <CalendarDaysIcon size="14px" />
          <p>{getDate(props.event_date)}</p>
        </div>
        <div className="flexcenter gap-2">
          <Clock size="14px" />
          <p>{getTime(props.event_date)}</p>
        </div>
      </div>

      <div>
        <p>Auction event hosted by:</p>
        <p>{props.auction_house?.name}</p>
      </div>
      <div>
        <p>Auctioneer:</p>
        <p>{props.auction_house?.auctioneer?.name}</p>
      </div>
      <p className="text-yellow-600 sm:my-3">
        Reminder: All Bidders are advised to turn off sleep mode / power saving
        mode and please do not answer phone calls while auctioning
      </p>
      <Countdown targetDate={props.event_date} eventId={props.id as number} />
    </div>
  );
}
