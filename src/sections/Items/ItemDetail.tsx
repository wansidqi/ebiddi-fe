import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
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
import { XCircleIcon } from "lucide-react";
import { ItemsInterface } from "@/interfaces";
import { useState } from "react";
import { useAuctionStore } from "@/store";
import { Button } from "@/components/ui/button";
import { ItemsCarousel } from "..";

export function ItemDetail(props: ItemsInterface) {
  const [open, setOpen] = useState(false);
  const { auctions } = useAuctionStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {auctions.view === "Grid" ? (
            <button className="w-full bg-yellow-400 rounded-md text-black">
              Details
            </button>
          ) : (
            <Button className="underline" variant="link">
              {props.yearManufacture}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              LOT {props.lot}
            </DialogTitle>
          </DialogHeader>
          <Detail {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {auctions.view === "Grid" ? (
          <button className="w-full bg-yellow-400 rounded-md text-black">
            Details
          </button>
        ) : (
          <Button className="underline" variant="link">
            {props.yearManufacture}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center text-2xl">
            LOT {props.lot}
          </DrawerTitle>
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

function Detail(props: ItemsInterface) {
  return (
    <div
      className={cn(
        "mx-5 text-center text-[14px] flex flex-col items-center gap-3"
      )}
    >
      <div className="flex">
        <ItemsCarousel images={props.img} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 text-left sm:my-5 gap-1 text-sm">
        <p>
          <span className="text-primary">LEGAL OWNER:</span> {props.legalOwner}
        </p>
        <p>
          <span className="text-primary">MODEL:</span> {props.model}
        </p>
        <p>
          <span className="text-primary">RESERVED PRICE:</span>{" "}
          {props.reservedPrice}
        </p>
        <p>
          <span className="text-primary">ENGINE NUMBER:</span>{" "}
          {props.engineNumber}
        </p>
        <p>
          <span className="text-primary">TRANSMISSION TYPE:</span>{" "}
          {props.transmissionType}
        </p>
        <p>
          <span className="text-primary">REGISTRATION CARD:</span>{" "}
          {props.registrationCard ? "Yes" : "No"}
        </p>
        <p>
          <span className="text-primary">REGISTRATION NUMBER:</span>{" "}
          {props.registrationNo}
        </p>
        <p>
          <span className="text-primary">YEAR MADE:</span>{" "}
          {props.yearManufacture}
        </p>
        <p>
          <span className="text-primary">KEY:</span>{" "}
          {props.hasKey ? "Yes" : "No"}
        </p>
        <p>
          <span className="text-primary">CHASIS NUMBER:</span>{" "}
          {props.chasisNumber}
        </p>
        <p>
          <span className="text-primary">REMARKS:</span> {props.remarks}
        </p>
      </div>
    </div>
  );
}
