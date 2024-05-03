import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TOKEN, getToken } from "@/datasource/localstorage.datasource";
import { useAPIServices } from "@/services";
import { LogInIcon } from "lucide-react";
import { useState } from "react";

export function TAC() {
  const { usePostVerify } = useAPIServices();
  const { mutateAsync } = usePostVerify();

  const [TAC, setTAC] = useState("");

  const verify = () => {
    const authToken = getToken(TOKEN.auth);

    const verification = {
      verification_token: authToken as string,
      verification_pin: TAC as string,
    };

    try {
      mutateAsync(verification);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flexcenter-col gap-4 mt-20">
      <p className="text-4xl text-primary">TAC CODE</p>

      <InputOTP onChange={(e) => setTAC(e)} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="my-4">
        <p>We have sent TAC code</p>
        <p>Kindly check your phone</p>
      </div>
      <Button onClick={verify} className="w-52 text-xl pt-2 pb-1 sm:w-1/6">
        <div className="relative w-full text-center">
          <p>Next</p>
          <div className="absolute top-0 right-4 sm:right-10">
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
