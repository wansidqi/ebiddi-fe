import { useStoreContext } from "@/Context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { useEffect } from "react";

export function LiveDialog() {
  const { swal, $swalClose } = useStoreContext();
  const { content, onClick, title, timer, variant, show, noClose, hasClose } =
    swal;

  const onConfirm = () => {
    onClick && onClick();
    $swalClose();
  };

  useEffect(() => {
    if (timer && show === true) {
      setTimeout(() => {
        $swalClose();
      }, timer);
    }
  }, [show]);

  return (
    <div>
      <Dialog open={show} onOpenChange={$swalClose}>
        <DialogContent
          onEscapeKeyDown={(e) => noClose && e.preventDefault()}
          onPointerDown={(e) => noClose && e.preventDefault()}
          onInteractOutside={(e) => noClose && e.preventDefault()}
          className="w-[90%] rounded-md sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <div className="flexcenter py-1">
              <InfoIcon size={"50px"} />
            </div>
            <DialogDescription className="py-3 text-center text-lg">
              {content}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full flex gap-10 justify-between">
            {hasClose && (
              <Button
                className="w-full"
                variant={"outline"}
                onClick={$swalClose}
              >
                Cancel
              </Button>
            )}
            {!noClose && (
              <Button
                className="w-full"
                variant={variant || "default"}
                onClick={onConfirm}
              >
                Okay
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
