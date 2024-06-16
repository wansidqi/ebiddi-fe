import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import { Status } from "@/interfaces/websocket";
import { ReauctionList } from "@/interfaces";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ReauctionTimer() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { eventId } = useParams();
  const [countdown, setCountdown] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const {
    payload,
    setPayload,
    subscribeEvent,
    socket,
    subscribeReauction,
    publishReauction,
  } = useStoreContext();
  const { expiryAt } = payload;

  console.log(expiryAt);

  const {
    useGetReauctionList,
    useGetReauctionStatus,
    useGetHoldItems,
    usePostReauction,
  } = useAPIServices();

  const { data: auctions, refetch: getReauctionList } =  useGetReauctionList(eventId); //prettier-ignore
  const { data: holdedItems, refetch: getHoldItems } =  useGetHoldItems(eventId); //prettier-ignore
  const { data: status, refetch: getReauctionStatus } = useGetReauctionStatus(eventId); //prettier-ignore
  const { mutateAsync: postReauction } = usePostReauction(eventId);

  const startReauction = (isCreate: boolean, duration: number) => {
    if (!eventId) return;

    const today = moment(new Date());
    const newExpiryAt = today.add(duration, "seconds").format("YYYY-MM-DD HH:mm:ss"); //prettier-ignore

    if (isCreate) {
      setPayload((prev) => {
        let update = { ...prev, eventId, status: "REAUCTIONLIST" as Status };
        publishReauction({ event_id: eventId, data: { event_id: eventId, status: "REAUCTIONLIST" }}); //prettier-ignore
        return update;
      });
    }

    setPayload((prev) => ({ ...prev, expiryAt: newExpiryAt }));

    try {
      postReauction(
        { isCreate, newExpiryAt },
        {
          onSuccess: (data) => {
            setPayload((prev) => ({ ...prev, expiryAt: data.expiry_at }));
            publishReauction({ event_id: eventId, data: { event_id: eventId, status: "REAUCTIONLIST" }}); //prettier-ignore
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendHoldItems = () => {
    if (!eventId) return;

    if (holdedItems && holdedItems.length <= 0) {
      getHoldItems();
    }

    if (holdedItems && holdedItems.length > 0) {
      const auctionEventIds = auctions?.map(
        (auction) => auction.auction_event_id
      );

      let items = holdedItems.map((hItem) => {
        const item = { ...hItem };
        if (auctionEventIds?.includes(item.auction_event_id)) {
          item.status = "REQUEST";
        }

        return item as ReauctionList;
      });

      setPayload((prev) => ({ ...prev, holdItems: items }));

      publishReauction({
        event_id: eventId,
        data: {
          event_id: eventId,
          status: "REAUCTIONLISTUPDATE",
          items,
          expiryAt,
        },
      });
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  ///assign expiry from API
  useEffect(() => {
    if (!status) return;
    getReauctionStatus();
    setPayload((prev) => ({ ...prev, expiryAt: status.expiry_at }));
  }, [status]);

  ///subscribe
  useEffect(() => {
    if (!eventId) return;

    subscribeEvent({
      event_id: eventId,
      onData: (data) => {
        console.log(data);
      },
    });

    subscribeReauction({
      event_id: eventId,
      onData: (data) => {
        console.log(data);
      },
    });
  }, [socket]);

  ///timer
  useEffect(() => {
    const startCountdown = () => {
      if (timer) {
        clearInterval(timer);
      }

      let counter = 0;
      const endTime = moment(expiryAt);

      const newTimer = setInterval(() => {
        const now = moment();
        const diff = endTime.diff(now);

        if (diff <= 0) {
          setCountdown("00:00:00");
          clearInterval(newTimer);
          return;
        }

        const duration = moment.duration(diff);
        const hours = String(duration.hours()).padStart(2, "0");
        const minutes = String(duration.minutes()).padStart(2, "0");
        const seconds = String(duration.seconds()).padStart(2, "0");

        setCountdown(`${hours}:${minutes}:${seconds}`);

        if (counter >= 1) {
          getReauctionList();
          sendHoldItems();
          counter = 0;
        } else {
          counter++;
        }
      }, 1000);

      setTimer(newTimer);
    };
    if (timer) {
      clearInterval(timer);
    }
    startCountdown();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [expiryAt]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {expiryAt === "" ? (
            <button className="bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg">
              Start Reauction
            </button>
          ) : (
            <button className="bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg">
              Update timer
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Select duration for Re-auction
            </DialogTitle>

            <Content
              countdown={countdown}
              expiryAt={expiryAt}
              startReauction={startReauction}
              closeModal={closeModal}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {expiryAt === "" ? (
          <button className="bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg">
            Start Reauction
          </button>
        ) : (
          <button className="bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg">
            Update timer
          </button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">
            Select duration for Re-auction
          </DrawerTitle>
        </DrawerHeader>
        <Content
          countdown={countdown}
          expiryAt={expiryAt}
          startReauction={startReauction}
          closeModal={closeModal}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const Content = ({
  expiryAt,
  countdown,
  startReauction,
  closeModal,
}: {
  expiryAt: string;
  countdown: string;
  startReauction: (isStart: boolean, duration: number) => any;
  closeModal: () => void;
}) => {
  const [duration, setDuration] = useState(0);

  const convStrToNum = (value: string) => {
    setDuration(parseInt(value, 10));
  };

  const handleClick = (isStart: boolean) => {
    closeModal();
    startReauction(isStart, duration);
  };

  return (
    <div>
      <div className="my-6">
        <Select onValueChange={convStrToNum}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="300">5 minutes</SelectItem>
              <SelectItem value="600">10 minutes</SelectItem>
              <SelectItem value="900">15 minutes</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="text-left w-full my-3">
          {expiryAt === "" ? (
            <Button className="w-full" onClick={() => handleClick(true)}>
              Start Reauction
            </Button>
          ) : (
            <Button className="w-full" onClick={() => handleClick(false)}>
              Update timer
            </Button>
          )}
          {expiryAt !== "" && (
            <button className="btn btn-lg btn-info float-right mr-3">
              {countdown}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
