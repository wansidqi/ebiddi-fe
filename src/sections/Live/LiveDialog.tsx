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

export interface ModalDialog {
  state: boolean;
  handleState: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  variant?: "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: () => any;
  timer?: number;
}

// export function LiveDialog(props: ModalDialog) {
//   const onConfirm = () => {
//     props.handleState(false);
//     props.onClick();
//   };

//   useEffect(() => {
//     if (props.timer && props.state === true) {
//       setTimeout(() => {
//         props.handleState(false);
//       }, props.timer);
//     }
//   }, [props.state]);

//   return (
//     <div>
//       <Dialog open={props.state} onOpenChange={() => props.handleState(false)}>
//         <DialogContent className="w-full sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>{props.title}</DialogTitle>
//             <div className="flexcenter py-1">
//               <InfoIcon size={"50px"} />
//             </div>
//             <DialogDescription className="py-3 text-center text-lg">
//               {props.content}
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant={props.variant || "default"} onClick={onConfirm}>
//               Okay
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

export function LiveDialog() {
  const { swal, $swalClose } = useStoreContext();
  const { content, onClick, title, timer, variant, show } = swal;

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
        <DialogContent className="w-full sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <div className="flexcenter py-1">
              <InfoIcon size={"50px"} />
            </div>
            <DialogDescription className="py-3 text-center text-lg">
              {content}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={variant || "default"} onClick={onConfirm}>
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
