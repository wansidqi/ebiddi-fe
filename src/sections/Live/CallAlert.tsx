import { useStoreContext } from "@/Context";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface CallMessage {
  call: string;
  variant: "once" | "twice" | "final";
}

const callMessage: CallMessage[] = [
  {
    call: "calling once",
    variant: "once",
  },
  {
    call: "calling twice",
    variant: "twice",
  },
  {
    call: "final call",
    variant: "final",
  },
];

export function CallAlert() {
  const { auction } = useStoreContext();
  const { countdown } = auction;
  const { toast } = useToast();

  useEffect(() => {
    if (countdown === 8) {
      startAlert(callMessage[0]);
    } else if (countdown === 4) {
      startAlert(callMessage[1]);
    } else if (countdown === 0) {
      startAlert(callMessage[2]);
    }
  }, [countdown]);

  const startAlert = ({ call, variant }: CallMessage) => {
    toast({
      duration: 1500,
      variant: variant,
      title: call.toUpperCase(),
    });
    speak(call);
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 2;
    speech.rate = 1;
    speech.pitch = 3;
    window.speechSynthesis.speak(speech);
  };

  return (
    <>
      <Button
        className="hidden"
        variant="outline"
        onClick={() => startAlert(callMessage[1])}
      >
        Add to calendar
      </Button>
      <Toaster />
    </>
  );
}
