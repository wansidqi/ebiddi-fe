import { Container } from "@/components/Container";
import { InventoryInterface, ReauctionList } from "@/interfaces";
import { numWithComma } from "@/lib/utils";
import { KEY, useAPIServices, useGetQueryData } from "@/services";
import { useNavigate, useParams } from "react-router-dom";
import { ItemDetail, LiveDialog, ReauctionTimer, UseCountdown } from "..";
import { useStoreContext } from "@/Context";
import { Fragment, useEffect } from "react";
import { DynamicRenderer } from "@/components";
import { Button } from "@/components/ui/button";
import { Status } from "@/interfaces/websocket";

export function AuctioneerList() {
  const columns = [
    "#",
    "Registration Number",
    "Model",
    "Panel",
    "Year Make",
    "Reserved Price",
    "Deposit Required",
    "Status",
  ];

  const { eventId } = useParams();
  const { countdown, isCountdownActive } = UseCountdown();
  const navigate = useNavigate();
  const { useGetEventById, useCloseAuctionEvent } = useAPIServices();
  const { setView, publishEvent, setPayload, $swal, payload } =
    useStoreContext();
  const { expiryAt } = payload;

  const { data } = useGetEventById(eventId);
  const { mutateAsync: onCloseEventAPI } = useCloseAuctionEvent(eventId);

  //TODO: check which API is for hold Items (getReauctionList or getHoldItems)
  const qryKey = [KEY.reauction, eventId];
  const reauctions = useGetQueryData<ReauctionList[]>(qryKey);

  const auctions = data?.inventories;

  const getDeposit = (auction: InventoryInterface) => {
    return auction.deposit + auction.buyer_premium;
  };

  const navigateToLive = (auction_id: any) => {
    navigate(`/auctioneer/live/${eventId}/${auction_id}`);
  };

  const closeEvent = () => {
    if (eventId) {
      setPayload((prev) => {
        const updatedPayload = {
          ...prev,
          event_id: eventId,
          status: "CLOSE" as Status,
        };

        publishEvent({ event_id: eventId, data: updatedPayload });

        return updatedPayload;
      });
      onCloseEventAPI();
    }
  };

  const confirmationDialog = () => {
    $swal({
      content: "Close this auction event?",
      title: "Auction Event",
      onClick: () => closeEvent(),
      variant: "destructive",
    });
  };

  useEffect(() => {
    setView("List");
    return () => setView("Grid");
  }, []);

  return (
    <Fragment>
      <LiveDialog />
      <Container className="sm:mx-28 pt-5">
        <div className="my-5  block lg:hidden">
          {/* mobile view */}
          {(data?.status === "Approve" || data?.status === "Deactive") && (
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex">
                <p className="lg:text-xl">Reauction Items</p>
                <BlinkAnimation />
              </div>
              {expiryAt !== "" || !expiryAt && (
                <>
                  <div className="flexcenter digital text-4xl font-extrabold">
                    {countdown}
                  </div>
                  <ReauctionTimer />
                </>
              )}
              <button
                onClick={confirmationDialog}
                className="bg-yellow-500 px-3 py-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg"
              >
                Close Auction
              </button>
            </div>
          )}
        </div>
        {/* desktop view */}
        <div className="my-5 hidden lg:block">
          {(data?.status === "Approve" || data?.status === "Deactive") && (
            <div className="flex items-center justify-between w-full">
              <div className="flex">
                <p className="lg:text-xl">Reauction Items</p>
                <BlinkAnimation />
              </div>
              <div className="flex gap-8">
                {expiryAt !== ""|| !expiryAt && (
                  <>
                    <div className="flexcenter digital text-4xl font-extrabold">
                      {countdown}
                    </div>
                    <ReauctionTimer />
                  </>
                )}
                <button
                  onClick={confirmationDialog}
                  className="bg-yellow-500 px-3 py-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg"
                >
                  Close Auction
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="sm:w-full overflow-x-auto text-center py-2 custom-scrollbar">
          <div className="inline-block min-w-full">
            <table className="min-w-full divide-y">
              <thead className="bg-secondary">
                <tr>
                  {columns.map((col, i) => (
                    <th
                      key={i}
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-lg font-medium uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y text-center text-xs sm:text-sm">
                {auctions?.map((auction, i) => (
                  <tr key={i}>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap flexcenter">
                      <ItemDetail {...auction} />
                      {reauctions?.find(
                        (item) => item.lot_no === auction.lot_no
                      ) && <BlinkAnimation />}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                      {auction.registration_number || "n/a"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                      {auction.model || "n/a"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                      {auction.legal_owner || "n/a"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                      {auction.year || "n/a"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                      {`RM ${numWithComma(auction.reserve_price)}` || "n/a"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                      {`RM ${numWithComma(getDeposit(auction))}` || "n/a"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                      <DynamicRenderer>
                        <DynamicRenderer.When cond={auction.status === "HOLD"}>
                          <Button
                            disabled={isCountdownActive}
                            onClick={() => navigateToLive(auction.auction_id)}
                            variant="link"
                          >
                            Auction
                          </Button>
                        </DynamicRenderer.When>
                        <DynamicRenderer.Else>
                          {auction.status || "n/a"}
                        </DynamicRenderer.Else>
                      </DynamicRenderer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

function BlinkAnimation() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
    </span>
  );
}
