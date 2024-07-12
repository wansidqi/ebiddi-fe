import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Props {
  btnName?: string;
  title?: string;
  description?: string;
  children: JSX.Element;
  footerBtnTitle: string;
  widthPx?: string;
  footerBtnDisable?: boolean;
  footerButtonCallback: () => any;
}

export function DynamicDrawer({
  btnName,
  title,
  description,
  children,
  footerBtnTitle,
  footerBtnDisable,
  widthPx,
  footerButtonCallback,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="pb-1">{btnName}</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle
              className={`flexcenter sm:text-3xl sm:py-3 ${widthPx}`}
            >
              {title}
            </DialogTitle>
            <DialogDescription className="flexcenter text-xl">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>
          <DialogFooter className="">
            <Button
              disabled={footerBtnDisable}
              onClick={() => {
                setOpen(false);
                footerButtonCallback();
              }}
            >
              {footerBtnTitle}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="pb-1">{btnName}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="mx-4">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              className="mt-4"
              disabled={footerBtnDisable}
              onClick={() => {
                setOpen(false);
                footerButtonCallback();
              }}
              variant="default"
            >
              {footerBtnTitle}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
