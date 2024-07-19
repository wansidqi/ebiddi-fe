import { UseCountdown, gridCSS } from "..";
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/Context";
import { KEY, useAPIServices, useGetQueryData } from "@/services";
import { useParams } from "react-router-dom";
import { ReauctionList as ReauctionListInterface } from "@/interfaces";
import { useEffect } from "react";

export function ReauctionList() {
  const { eventId } = useParams();
  const { USER, $swal, publishReauction, subscribeReauction } = useStoreContext();

  const { countdown, expiryAt,getReauctionList  } = UseCountdown();

  const { usePostReauctionItem } = useAPIServices();
  const { mutateAsync: onReautionItem } = usePostReauctionItem();

  const reauctions = useGetQueryData<ReauctionListInterface[]>([
    KEY.reauction,
    eventId,
  ]);
  const holdedItems = useGetQueryData<ReauctionListInterface[]>([
    KEY.reauctions_holdItem,
    eventId,
  ]);

  const isReauctionList = (lot: string) => {
    const check = reauctions?.find((item) => item.lot_no === lot);
    // console.log(check);
    /* kalau undefined, bukan reauction. kalau ada value, is reauction */
    return check;
  };

  const handleReauction = (auctionId: string, lot: string) => {
    $swal({
      title: "Reauction",
      content: "Please confirm if you want to reauction this lot",
      hasClose: true,
      onClick: () => {
        reauctionItem(auctionId, lot);
      },
    });
  };

  const reauctionItem = (auctionId: string, lot: string) => {
    let data = `event_id=${eventId}&auction_event_id=${auctionId}`;

    onReautionItem(
      { data },
      {
        onSuccess: () => {
          publishReauction({
            event_id: eventId ?? "",
            data: {
              auction_event_id: auctionId as string,
              event_id: eventId,
              status: "REAUCTIONLISTITEM",
            },
          });
          $swal({
            title: "Reauction",
            content: `Lot ${lot} reauction requested`,
            hasClose: true,
            timer: 2000,
          });
        },
        onError: () => {
          $swal({
            title: "Error Reauctioning",
            content: `Error Reauctioning`,
            timer: 3000,
            hasClose: false,
          });
        },
      }
    );
  };

  useEffect(() => {
    if (!eventId) return;

    subscribeReauction({
      event_id: eventId,
      onData: (data) => {
        if (data.status === "REAUCTIONLISTITEM") {
          getReauctionList();
        }
      },
    });
  }, []);

  return (
    <div className="relative">
      {expiryAt !== "" && (
        <div className="text-5xl fixed z-50 left-1/2 -translate-x-1/2 top-10">
          <p className="text-black digital rounded-md digital font-extrabold flex items-center justify-center bg-cyan-500 py-3 px-8">
            {countdown}
          </p>
        </div>
      )}

      <div className="my-10">
        <div className={gridCSS}>
          {holdedItems?.map((item, i: number) => (
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
                  <p>{item.year || "n/a"}</p>
                </div>
                <div>
                  <p className="text-primary">Legal Owner:</p>
                  <p>{item.legal_owner}</p>
                </div>

                <Button
                  disabled={!USER || Boolean(isReauctionList(item.lot_no))}
                  className={
                    !isReauctionList(item.lot_no)
                      ? ""
                      : "text-green-400 text-lg"
                  }
                  variant={!isReauctionList(item.lot_no) ? "default" : "ghost"}
                  onClick={() =>
                    handleReauction(item?.auction_event_id as any, item.lot_no)
                  }
                >
                  {!isReauctionList(item.lot_no) ? "REAUCTION" : "REQUESTED"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
