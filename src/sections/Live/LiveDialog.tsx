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

// const popupMsg = [
//   { desc: "Bidding is starting", isWaiting: false },
//   { desc: "Auction Start", isWaiting: false },
//   { desc: "Name has won the auction", isWaiting: true },
//   { desc: "No bid", isWaiting: true },
//   { desc: "This auction is withdraw", isWaiting: true },
//   {
//     desc: "Auction has been closed, that's all for this event",
//     isWaiting: true,
//   },
// ];

export function LiveDialog() {
  const { auction } = useStoreContext();
  const { showDialog, setShowDialog } = auction;

  return (
    <div>
      <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
        <Button
          className="hidden"
          onClick={() => setShowDialog(true)}
          variant="outline"
        >
          Edit Profile
        </Button>
        <DialogContent className="w-full sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>LOT 32424</DialogTitle>
            <div className="flexcenter py-1">
              <InfoIcon size={"50px"} />
            </div>
            <DialogDescription className="py-3 text-center">
              <span className="text-yellow-400">WAN AHMAD SIDQI</span> has won
              the auction
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
