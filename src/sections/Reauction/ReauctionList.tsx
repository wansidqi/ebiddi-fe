import { ReauctionList as ReauctionListInterface } from "@/interfaces";
import { gridCSS } from "..";
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/Context";
import { useEffect } from "react";
import moment from "moment";

interface Props {
  data: ReauctionListInterface[] | undefined;
  onReauction: (auctionId: string) => any;
}

export function ReauctionList({ data, onReauction }: Props) {
  const { USER, payload, setPayload } = useStoreContext();
  const { expiryAt } = payload;

  const onClickReauction = (auctionId: string) => {
    if (!USER) return;
    onReauction(auctionId);
  };

  useEffect(() => {
    if (!expiryAt) {
      return;
    }

    const endTime = moment(expiryAt);
    const intervalId = setInterval(() => {
      const now = moment();
      const diff = endTime.diff(now);

      if (diff <= 0) {
        ///reset expiryAt
        setPayload((prev) => ({ ...prev, expiryAt: "" }));
        console.log("00:00:00");
        clearInterval(intervalId);
        return;
      }

      const duration = moment.duration(diff);
      const hours = String(duration.hours()).padStart(2, "0");
      const minutes = String(duration.minutes()).padStart(2, "0");
      const seconds = String(duration.seconds()).padStart(2, "0");

      console.log(`${hours}:${minutes}:${seconds}`); // Display the countdown
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryAt]);

  return (
    <div className="relative">
      {expiryAt !== "" && (
        <div className="text-5xl fixed z-50 left-1/2 -translate-x-1/2 top-16">
          <p className="rounded-md digital font-extrabold flex items-center justify-center bg-blue-600 py-3 px-8">
            {expiryAt}
          </p>
        </div>
      )}

      <div className="my-10">
        <div className={gridCSS}>
          {data?.map((item, i: number) => (
            <div key={i} className="border-2 border-secondary rounded-sm pb-4">
              <div className="relative h-[280px] w-full">
                <img
                  src={item.images && item.images[0]}
                  className="w-full h-full card-img-top rounded-0 object-cover"
                />
                <div className="absolute top-1 bg-cyan-500 left-0 px-2 py-1 rounded-sm">
                  {item.lot_no}
                </div>
                <div className="absolute bottom-1 bg-green-600 left-0 px-2 py-1 rounded-sm">
                  {item.registration_number}
                </div>
              </div>
              <div className="bg-primary text-xl p-2 text-center">
                RM {item.reserve_price?.toLocaleString("en-IN")}
              </div>
              <div className="m-2 flex flex-col gap-2">
                <p>{item.model}</p>
                <div>
                  <p className="text-primary">Year of Make:</p>
                  <p>{item.year}</p>
                </div>
                <div>
                  <p className="text-primary">Legal Owner:</p>
                  <p>{item.legal_owner}</p>
                </div>
                {/* <div className="hidden flex gap-3 my-0">
                <ItemDetail {...item} />
                <Button className="underline" variant="link">
                <Link
                target="_blank"
                to={
                    item.vehicle_type === VEHICLE_TYPE.CAR
                    ? `/ireportcar/${item.vehicle_id}`
                    : `/ireportmotor/${item.vehicle_id}`
                    }
                    >
                    Report
                    </Link>
                    </Button>
                    </div> */}
                {item.status === "HOLD" && (
                  <Button
                    onClick={() =>
                      onClickReauction(item?.auction_event_id as any)
                    }
                  >
                    REAUCTION
                  </Button>
                )}
                {item.status === "REQUEST" && (
                  <Button variant="ghost" className="text-green-400 text-lg">
                    REQUESTED
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
