import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import { Status } from "@/types";
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
import { UseCountdown } from "./UseCountdown";
import { DEV } from "@/enum";

export function ReauctionTimer() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { eventId } = useParams();

  const {
    payload,
    setPayload,
    subscribeEvent,
    socket,
    subscribeReauction,
    publishEvent,
    publishReauction,
  } = useStoreContext();

  const { expiryAt } = UseCountdown();

  const { usePostReauction } = useAPIServices();
  const { mutateAsync: postReauction } = usePostReauction(eventId);

  const startReauction = (isCreate: boolean, duration: number) => {
    if (!eventId) return;

    const today = moment(new Date());
    const newExpiryAt = today.add(duration, "seconds").format("YYYY-MM-DD HH:mm:ss"); //prettier-ignore

    if (isCreate) {
      console.log("create");
      setPayload((prev) => {
        let update = { ...prev, eventId, status: "REAUCTIONLIST" as Status };
        publishEvent({
          event_id: eventId,
          data: { ...payload, event_id: eventId, status: "REAUCTIONLIST" },
        });
        return update;
      });
    }

    try {
      postReauction(
        { isCreate, newExpiryAt },
        {
          onSuccess: () => {
            publishReauction({
              event_id: eventId!,
              data: {
                expiryAt: newExpiryAt,
                status: "REAUCTIONLISTUPDATETIMER",
              },
            });
            // publishEvent({
            //   event_id: eventId,
            //   data: {
            //     ...payload,
            //     event_id: eventId,
            //     status: "REAUCTIONLISTUPDATETIMER",
            //   },
            // });
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

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
        setPayload((prev) => ({ ...prev, expiryAt: data.expiryAt || "" }));
      },
    });
  }, [socket]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flexcenter bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg">
            {expiryAt === "" || !expiryAt ? "Start Reauction" : "Update timer"}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Select duration for Re-auction
            </DialogTitle>

            <Content
              expiryAt={expiryAt ?? ""}
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
        <button className="flexcenter bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg">
          {expiryAt === "" || !expiryAt ? "Start Reauction" : "Update timer"}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">
            Select duration for Re-auction
          </DrawerTitle>
        </DrawerHeader>

        <Content
          expiryAt={expiryAt ?? ""}
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
  startReauction,
  closeModal,
}: {
  expiryAt: string;
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
      <div className="my-8">
        <Select onValueChange={convStrToNum}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {DEV && <SelectItem value="10">10 seconds</SelectItem>}
              {DEV && <SelectItem value="30">30 seconds</SelectItem>}
              {DEV && <SelectItem value="60">1 minute</SelectItem>}
              <SelectItem value="300">5 minutes</SelectItem>
              <SelectItem value="600">10 minutes</SelectItem>
              <SelectItem value="900">15 minutes</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="text-left w-full my-3 mt-10">
          {expiryAt === "" ? (
            <Button className="w-full" onClick={() => handleClick(true)}>
              Start Reauction
            </Button>
          ) : (
            <Button className="w-full" onClick={() => handleClick(false)}>
              Update timer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
