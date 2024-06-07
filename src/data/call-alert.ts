export interface CallMessage {
  call: string;
  variant: "once" | "twice" | "final";
}

export const callMessage: CallMessage[] = [
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
