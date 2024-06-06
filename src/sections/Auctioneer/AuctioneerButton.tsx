import { useStoreContext } from "@/Context";
import { ROLE } from "@/interfaces/enum";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";

interface CondBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  show: boolean;
  isIcon?: boolean;
}

const CondButton: React.FC<CondBtn> = ({
  children,
  className,
  show,
  isIcon,
  ...rest
}) => {
  return (
    <>
      {show && (
        <button
          className={`${isIcon ? "flexcenter" : "py-3 rounded-md"}  w-full sm:w-1/2  ${className}`}
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
};

export function AuctioneerButton() {
  const { USER } = useStoreContext();
  // bid_status: 0, START(1), RUN(2), END(3), PAUSE(4), WITHDRAW(5), CLOSE(6), HOLD(7)
  const bid_status: number = 0;
  const bids = [];

  return (
    <div>
      {USER?.role !== ROLE.AUCTIONEER && (
        <div className="flexcenter gap-6">
          <CondButton show={true} isIcon={true}>
            <ArrowLeftSquare size="40px" />
          </CondButton>

          <CondButton
            show={bid_status === 1 || bid_status == 4}
            className="bg-green-600"
          >
            START
          </CondButton>

          <CondButton
            show={bid_status == 2 || bid_status == 3}
            className="bg-green-600"
          >
            PAUSE
          </CondButton>

          <CondButton show={true} className="bg-green-600">
            BACK TO AUCTION LIST
          </CondButton>

          <CondButton
            show={bid_status === 1 || bid_status == 4}
            className="bg-green-600"
          >
            WITHDRAW CURRENT VEHICLE
          </CondButton>

          <CondButton show={bid_status == 4} className="bg-green-600">
            RE-AUCTION
          </CondButton>

          <CondButton
            show={bid_status == 3 && bids.length > 0}
            className="bg-green-600"
          >
            SOLD
          </CondButton>

          <CondButton
            show={bid_status == 3 && bids.length == 0}
            className="bg-green-600"
          >
            NO BID
          </CondButton>

          <CondButton show={bid_status == 6} className="bg-green-600">
            END
          </CondButton>

          <CondButton show={true} isIcon={true}>
            <ArrowRightSquare size="40px" />
          </CondButton>
        </div>
      )}
    </div>
  );
}
