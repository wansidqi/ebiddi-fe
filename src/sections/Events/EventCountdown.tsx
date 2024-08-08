import { useStoreContext } from "@/Context";
import { DynamicRenderer } from "@/components";
import { isCountdown, roleRenderer } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Countdown = ({
  targetDate,
  eventId,
}: {
  targetDate: string;
  eventId: number;
}) => {
  const navigate = useNavigate();
  // const temp = "2024-05-24T16:05:30+08:00";
  const [timeLeft, setTimeLeft] = useState(isCountdown(targetDate));
  const { closeDetailModal, USER, setTerm } = useStoreContext();
  const { usePostVerifyAgreement } = useAPIServices();
  const { mutateAsync: isVerify } = usePostVerifyAgreement();

  const navigateToLive = () => {
    closeDetailModal();
    roleRenderer({
      role: USER?.role,
      action: "function",

      auctioneer: () => {
        navigate(`/auctioneer/list/${eventId}`);
      },

      bidder: async () => {
        if (USER)
          try {
            await isVerify({ event_id: eventId, user_id: USER.id });
            navigate(`/live/${eventId}`);
          } catch (error) {
            setTerm({ showTerm: true, eventId: eventId.toString() });
          }
      },

      noRole: () => {
        navigate(`/live/${eventId}`);
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = isCountdown(targetDate);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <DynamicRenderer>
      <DynamicRenderer.When cond={!Boolean(timeLeft)}>
        <button
          onClick={navigateToLive}
          className="bg-green-500 px-3 py-2 my-3 rounded-md w-full"
        >
          JOIN BIDDING
        </button>
      </DynamicRenderer.When>
      <DynamicRenderer.Else>
        <div className="flexcenter">
          <div className="flexcenter gap-4 text-center w-32">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex">
                <p>{value}</p>
                <p>{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </DynamicRenderer.Else>
    </DynamicRenderer>
  );
};
