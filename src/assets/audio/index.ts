import call1 from "@/assets/audio/call_1.mp3";
import call2 from "@/assets/audio/call_2.mp3";
import call3 from "@/assets/audio/call_3.mp3";
import start from "@/assets/audio/sound_start.mp3";
import hold from "@/assets/audio/sound_hold.mp3";
import reauction from "@/assets/audio/sound_reauction.mp3";
import withdraw from "@/assets/audio/sound_withdraw.mp3";
import noBid from "@/assets/audio/sound_nobid.mp3";
import sold from "@/assets/audio/sold.mp3";

type Audio =
  | "start"
  | "hold"
  | "reauction"
  | "withdraw"
  | "noBid"
  | "sold"
  | "call1"
  | "call2"
  | "call3";

export const playAudio = (name: Audio) => {
  let audioSrc;

  switch (name) {
    case "start":
      audioSrc = start;
      break;
    case "hold":
      audioSrc = hold;
      break;
    case "reauction":
      audioSrc = reauction;
      break;
    case "withdraw":
      audioSrc = withdraw;
      break;
    case "noBid":
      audioSrc = noBid;
      break;
    case "sold":
      audioSrc = sold;
      break;
    case "call1":
      audioSrc = call1;
      break;
    case "call2":
      audioSrc = call2;
      break;
    case "call3":
      audioSrc = call3;
      break;
    default:
      console.log("Invalid audio name");
      return;
  }

  const audio = new Audio(audioSrc);
  audio.play().catch((e) => console.log(e));
};
