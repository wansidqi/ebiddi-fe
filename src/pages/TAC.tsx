import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LogInIcon } from "lucide-react";

export function TAC() {
  return (
    <div className="flexcenter-col gap-4 mt-20">
      <p className="text-4xl text-primary">TAC CODE</p>
      <InputOTPComponent />
      <div className="my-4">
        <p>We have sent TAC code</p>
        <p>Kindly check your phone</p>
      </div>
      <Button className="w-52 text-xl pt-2 pb-1 sm:w-1/6">
        <div className="relative w-full text-center">
          <p>Next</p>
          <div className="absolute top-0 right-10">
            <LogInIcon />
          </div>
        </div>
      </Button>
      <div className="flexcenter-col gap-1 mt-3">
        <a className="text-lg text-primary" href="#">
          <div>Resend TAC code</div>
        </a>
        <a className="text-lg text-primary" href="/login">
          <div>Back</div>
        </a>
      </div>
    </div>
  );
}

function InputOTPComponent() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
