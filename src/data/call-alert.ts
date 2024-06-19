import { EbiddiAudio } from "@/assets/audio";

export interface CallMessage {
  call: string;
  variant: "once" | "twice" | "final";
  audioName: EbiddiAudio;
}
