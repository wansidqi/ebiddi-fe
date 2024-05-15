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
import { ItemsCarousel } from "..";
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
              {props.year}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              LOT {props.lot_no}
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
        {view === "Grid" ? (
          <button className="w-full bg-yellow-400 rounded-md text-black">
            Details
          </button>
        ) : (
          <Button className="underline" variant="link">
            {props.year}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center text-2xl">
            LOT {props.lot_no}
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

function Detail(props: InventoryInterface) {
  return (
    <div
      className={cn(
        "mx-5 text-center text-[14px] flex flex-col items-center gap-3"
      )}
    >
      <div className="flex">
        <ItemsCarousel images={props.images} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 text-left sm:my-5 gap-1 text-sm">
        <p>
          <span className="text-primary">LEGAL OWNER:</span> {props.legal_owner}
        </p>
        <p>
          <span className="text-primary">MODEL:</span> {props.model}
        </p>
        <p>
          <span className="text-primary">RESERVED PRICE:</span>
          {props.reserve_price}
        </p>
        <p>
          <span className="text-primary">ENGINE NUMBER:</span>
          {props.engine_number}
        </p>
        <p>
          <span className="text-primary">TRANSMISSION TYPE:</span>
          {props.transmission}
        </p>
        <p>
          <span className="text-primary">REGISTRATION CARD:</span>
          {props.has_registration_card ? "Yes" : "No"}
        </p>
        <p>
          <span className="text-primary">REGISTRATION NUMBER:</span>
          {props.registration_number}
        </p>
        <p>
          <span className="text-primary">YEAR MADE:</span> {props.year}
        </p>
        <p>
          <span className="text-primary">KEY:</span>
          {props.has_key ? "Yes" : "No"}
        </p>
        <p>
          <span className="text-primary">CHASIS NUMBER:</span>
          {props.chasis_number}
        </p>
        <p>
          <span className="text-primary">REMARKS:</span> {props.remarks}
        </p>
      </div>
    </div>
  );
}
