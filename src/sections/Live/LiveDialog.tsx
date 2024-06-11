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

export interface ModalDialog {
  state: boolean;
  handleState: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  variant?: "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: () => any;
  timer?: number;
}

export function LiveDialog(props: ModalDialog) {
  const onConfirm = () => {
    props.handleState(false);
    props.onClick();
  };

  useEffect(() => {
    if (props.timer && props.state === true) {
      setTimeout(() => {
        props.handleState(false);
      }, props.timer);
    }
  }, [props.state]);

  return (
    <div>
      <Dialog open={props.state} onOpenChange={() => props.handleState(false)}>
        <DialogContent className="w-full sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <div className="flexcenter py-1">
              <InfoIcon size={"50px"} />
            </div>
            <DialogDescription className="py-3 text-center">
              {props.content}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={props.variant || "default"} onClick={onConfirm}>
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function LiveDialogTest() {
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
