import { useStoreContext } from "@/Context";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  TOKEN,
  getToken,
  removeToken,
} from "@/datasource/sessionStorage.datasource";
import { onEnterClick } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { LogInIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function TAC() {
  const { usePostVerify, useResendTAC } = useAPIServices();
  const { mutateAsync } = usePostVerify();
  const { mutateAsync: resendTAC } = useResendTAC();
  const navgiate = useNavigate();

  const { setAlert } = useStoreContext();
  const cooldown = 20;

  const [TAC, setTAC] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(cooldown);
  const authToken = getToken(TOKEN.auth);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isCooldown) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return cooldown;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);

  const verify = async () => {
    const verification = {
      verification_token: authToken as string,
      verification_pin: TAC,
    };

    try {
      await mutateAsync(verification);
    } catch (error) {
      console.log(error);
    }
  };

  const onResendTAC = async () => {
    setIsCooldown(true);
    try {
      await resendTAC(authToken as string);
      setCooldownTime(cooldown);
    } catch (error) {
      setIsCooldown(false);
      removeToken(TOKEN.auth);
      navgiate("/login");
      setAlert({
        isSuccess: false,
        messsage: "pelase login again",
        showAlert: true,
      });
    }
  };

  return (
    <div className="flexcenter-col h-screen gap-4 my-auto">
      <p className="text-4xl text-primary">TAC CODE</p>

      <InputOTP
        onKeyDown={(e) => onEnterClick(e, () => verify())}
        onChange={(e) => setTAC(e)}
        maxLength={6}
      >
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
          <div className="absolute top-0 right-0 lg:right-10">
            <LogInIcon />
          </div>
        </div>
      </Button>
      <div className="flexcenter-col gap-1 mt-3 relative">
        <button
          disabled={isCooldown}
          onClick={onResendTAC}
          className={`${isCooldown ? "text-gray-500" : "text-primary"} text-lg`}
        >
          <div>Resend TAC code</div>
        </button>
        <div className="absolute -right-7 top-1">
          {isCooldown && (
            <p className="text-gray-500 text-xs">{cooldownTime}</p>
          )}
        </div>
        <a className="text-lg text-primary" href="/login">
          <div>Back</div>
        </a>
      </div>
    </div>
  );
}
