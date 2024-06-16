import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import { Status } from "@/interfaces/websocket";
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
import { LoaderCircle } from "lucide-react";

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
    publishReauction,
  } = useStoreContext();
  const { expiryAt } = payload;

  const { usePostReauction } = useAPIServices();
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
            publishReauction({
              event_id: eventId,
              data: {
                event_id: eventId,
                status: "REAUCTIONLIST",
                expiryAt: data.expiry_at,
              },
            });
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
          <button className="flexcenter bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg w-32 lg:w-40">
            {expiryAt === undefined ? (
              <LoaderCircle className="animate-spin" />
            ) : expiryAt === "" ? (
              "Start Reauction"
            ) : (
              "Update timer"
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Select duration for Re-auction
            </DialogTitle>

            <Content
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
        <button className="flexcenter bg-cyan-500 px-3 pt-1 pb-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg w-32 lg:w-40">
          {expiryAt === undefined ? (
            <LoaderCircle className="animate-spin" />
          ) : expiryAt === "" ? (
            "Start Reauction"
          ) : (
            "Update timer"
          )}{" "}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">
            Select duration for Re-auction
          </DrawerTitle>
        </DrawerHeader>

        <Content
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
