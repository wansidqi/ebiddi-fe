"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const popupMsg = ({ call, variant }: CallMessage) => {
    toast({
      duration: 2000,
      variant: variant,
      title: call.toUpperCase(),
    });
  };

  return (
    <>
      <Button variant="outline" onClick={() => popupMsg(callMessage[1])}>
        Add to calendar
      </Button>
      <Toaster />
    </>
  );
}
