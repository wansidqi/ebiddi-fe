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
import { InventoryInterface } from "@/interfaces";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ItemsCarouselDesktop, ItemsCarouselMobile } from "..";
import { useStoreContext } from "@/Context";

export function ItemDetail(props: InventoryInterface) {
  const [open, setOpen] = useState(false);
  const { view } = useStoreContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {view === "Grid" ? (
            <button className="w-full bg-yellow-400 rounded-md text-black">
              Details
            </button>
          ) : (
            <Button className="underline" variant="link">
              {props.lot_no}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              LOT {props.lot_no}
            </DialogTitle>
          </DialogHeader>
          <DetailDesktop {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {view === "Grid" ? (
          <button className="w-full bg-yellow-400 rounded-md text-black">
            Details
          </button>
        ) : (
          <Button className="underline" variant="link">
            {props.lot_no}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center text-2xl">
            LOT {props.lot_no}
          </DrawerTitle>
        </DrawerHeader>
        <DetailMobile {...props} />
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

function DetailDesktop(props: InventoryInterface) {
  return (
    <div
      className={cn(
        "text-center text-[14px] flex flex-col items-center gap-3"
      )}
    >
      <div className="flex sm:grid sm:grid-cols-1 w-full">
        <ItemsCarouselDesktop images={props.images} />
      </div>
      <div className="grid grid-cols-4 text-left my-5 gap-x-1 gap-y-2 text-sm w-full">
        <span className="text-primary">LEGAL OWNER</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.legal_owner || "n/a"}
        </p>
        <span className="text-primary">MODEL</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.model || "n/a"}
        </p>
        <span className="text-primary">RESERVED PRICE</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.reserve_price || "n/a"}
        </p>
        <span className="text-primary">ENGINE NUMBER</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.engine_number || "n/a"}
        </p>
        <span className="text-primary">TRANSMISSION TYPE</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.transmission || "n/a"}
        </p>
        <span className="text-primary">REGISTRATION CARD</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> :{" "}
          {props.has_registration_card ? "Yes" : "No"}
        </p>
        <span className="text-primary">REGISTRATION NUMBER</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span>{" "}
          {props.registration_number || "n/a"}
        </p>
        <span className="text-primary">YEAR MADE</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.year || "n/a"}
        </p>
        <span className="text-primary">KEY:</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.has_key ? "Yes" : "No"}
        </p>
        <span className="text-primary">CHASIS NUMBER</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.chasis_number || "n/a"}
        </p>
        <span className="text-primary">REMARKS</span>
        <p className="flex gap-2">
          {" "}
          <span className="text-primary">:</span> {props.remarks || "n/a"}
        </p>
      </div>
    </div>
  );
}

function DetailMobile(props: InventoryInterface) {
  return (
    <div
      className={cn(
        "mx-5 text-center text-[14px] flex flex-col items-center gap-3"
      )}
    >
      <div className="flex sm:grid sm:grid-cols-1">
        <ItemsCarouselMobile images={props.images} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 text-left sm:my-5 gap-1 text-sm">
        <p className="flex gap-2">
          <span className="text-primary">LEGAL OWNER:</span> {props.legal_owner}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">MODEL:</span> {props.model}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">RESERVED PRICE:</span>
          {props.reserve_price}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">ENGINE NUMBER:</span>
          {props.engine_number}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">TRANSMISSION TYPE:</span>
          {props.transmission}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">REGISTRATION CARD:</span>
          {props.has_registration_card ? "Yes" : "No"}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">REGISTRATION NUMBER:</span>
          {props.registration_number}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">YEAR MADE:</span> {props.year}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">KEY:</span>
          {props.has_key ? "Yes" : "No"}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">CHASIS NUMBER:</span>
          {props.chasis_number}
        </p>
        <p className="flex gap-2">
          <span className="text-primary">REMARKS:</span> {props.remarks}
        </p>
      </div>
    </div>
  );
}
