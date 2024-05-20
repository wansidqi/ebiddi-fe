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

const popupMsg = [
  { desc: "Bidding is starting", isWaitingScreen: false },
  { desc: "Auction Start", isWaitingScreen: false },
  { desc: "Name has won the auction", isWaitingScreen: true },
  { desc: "No bid", isWaitingScreen: true },
  { desc: "This auction is withdraw", isWaitingScreen: true },
  {
    desc: "Auction has been closed, that's all for this event",
    isWaitingScreen: true,
  },
];

export function LiveDialog() {
  const { showLiveDialog, setShowLiveDialog } = useStoreContext();

  return (
    <div>
      <Dialog
        open={showLiveDialog}
        onOpenChange={() => setShowLiveDialog(false)}
      >
        <Button
          className="hidden"
          onClick={() => setShowLiveDialog(true)}
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
            <Button onClick={() => setShowLiveDialog(false)}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
