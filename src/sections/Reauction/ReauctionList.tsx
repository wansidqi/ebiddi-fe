import { UseCountdown, gridCSS } from "..";
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import { useParams } from "react-router-dom";

export function ReauctionList() {
  const { eventId } = useParams();
  const { USER, payload, $swal, publishReauction } = useStoreContext();
  const { expiryAt } = payload;

  const { countdown } = UseCountdown();

  const { usePostReauctionItem } = useAPIServices();
  const { mutateAsync: onReautionItem } = usePostReauctionItem();

  const handleReauction = (auctionId: string) => {
    $swal({
      title: "Reauction",
      content: "Please confirm if you want to reauction this lot",
      onClick: () => {
        reauctionItem(auctionId);
      },
    });
  };

  const reauctionItem = (auctionId: string) => {
    if (!eventId) return;
    const id = { auctionId, eventId };

    onReautionItem(id, {
      onSuccess: () => {
        publishReauction({
          event_id: eventId,
          data: {
            auction_event_id: auctionId as string,
            event_id: eventId,
            status: "REAUCTIONLISTITEM",
          },
        });
      },
      onError: (e: any) => {
        $swal({
          title: "Error Reauctioning",
          content: `${e}`,
          timer: 3000,
        });
      },
    });
  };

  const onClickReauction = (auctionId: string) => {
    if (!USER) return;
    handleReauction(auctionId);
  };

  const temp = [
    {
      auction_event_id: "auction_1",
      images: ["https://example.com/image1.jpg"],
      lot_no: "1001",
      registration_number: "ABC1234",
      reserve_price: 100000,
      model: "Toyota Camry",
      year: 2018,
      legal_owner: "Jane Smith",
      status: "HOLD",
    },
    {
      auction_event_id: "auction_2",
      images: ["https://example.com/image2.jpg"],
      lot_no: "1002",
      registration_number: "XYZ5678",
      reserve_price: 150000,
      model: "Honda Accord",
      year: 2019,
      legal_owner: "John Doe",
      status: "REQUEST",
    },
  ];

  return (
    <div className="relative">
      {expiryAt !== new Date().toISOString() && (
        <div className="text-5xl fixed z-50 left-1/2 -translate-x-1/2 top-16">
          <p className="text-black digital rounded-md digital font-extrabold flex items-center justify-center bg-cyan-500 py-3 px-8">
            {countdown}
          </p>
        </div>
      )}

      <div className="my-10">
        <div className={gridCSS}>
          {payload.holdItems?.map((item, i: number) => (
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
