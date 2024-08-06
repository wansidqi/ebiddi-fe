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
import { Status } from "@/types";
import { CircleArrowLeft } from "lucide-react";

export function ReAuctioneerList() {
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
  const { countdown, isCountdownActive, getReauctionList } = UseCountdown();

  const navigate = useNavigate();
  const { useGetEventById, useCloseAuctionEvent } = useAPIServices();
  const {
    setView,
    publishEvent,
    setPayload,
    $swal,
    resetBidder,
    subscribeReauction,
  } = useStoreContext();

  const { data } = useGetEventById(eventId);
  const { mutateAsync: onCloseEventAPI } = useCloseAuctionEvent(eventId);

  const qryKey = [KEY.reauction, eventId];
  const reauctions = useGetQueryData<ReauctionList[]>(qryKey);

  const auctions = data?.inventories;

  const getDeposit = (auction: InventoryInterface) => {
    return auction.deposit + auction.buyer_premium;
  };

  const navigateToLive = (auction_id: any) => {
    navigate(`/auctioneer/live/${eventId}/${auction_id}`);
  };

  const navigateToAuctionList = () => {
    navigate(`/auctioneer/list/${eventId}`);
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
      resetBidder();
    }
  };

  const confirmationDialog = () => {
    $swal({
      content: "Close this auction event?",
      title: "Auction Event",
      onClick: () => closeEvent(),

      variant: "destructive",
      hasClose: true,
    });
  };

  useEffect(() => {
    if (!eventId) return;

    subscribeReauction({
      event_id: eventId,
      onData: (data) => {
        if (data.status === "REAUCTIONLISTITEM") {
          $swal({
            title: "Request Reauction",
            content: `${data.name} has requested a reauction for lot ${data.lot}`,
            hasClose: false,
            timer: 2000,
          });
          getReauctionList();
        }
      },
    });
  }, []);

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
          <p className="text-2xl text-center my-5 text-primary">
            Re-Auction List
          </p>
          {(data?.status === "Approve" || data?.status === "Deactive") && (
            <div className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={navigateToAuctionList}
                className="flex justify-between gap-3 bg-muted px-3 py-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg"
              >
                <p>Back</p>
                <CircleArrowLeft />
              </button>
              <>
                <div
                  className={
                    countdown === "NaN:NaN:NaN"
                      ? "text-transparent"
                      : "flexcenter digital text-4xl font-extrabold"
                  }
                >
                  {countdown}
                </div>
                <ReauctionTimer />
              </>
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
          <p className="text-5xl text-center my-5 text-primary">
            Re-Auction List
          </p>
          {(data?.status === "Approve" || data?.status === "Deactive") && (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={navigateToAuctionList}
                className="flex gap-3 bg-muted px-3 py-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-lg"
              >
                Back
                <CircleArrowLeft />
              </button>
              <div className="flex gap-8">
                <>
                  <div
                    className={
                      countdown === "NaN:NaN:NaN"
                        ? "hidden"
                        : "flexcenter digital text-4xl font-extrabold"
                    }
                  >
                    {countdown}
                  </div>
                  <ReauctionTimer />
                </>
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
                {auctions
                  ?.filter((auction) =>
                    reauctions?.some((item) => item.lot_no === auction.lot_no)
                  )
                  ?.map((auction, i) => {
                    return (
                      <tr key={i}>
                        <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap flexcenter">
                          <ItemDetail {...auction} />
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
                            <DynamicRenderer.When
                              cond={auction.status === "HOLD"}
                            >
                              <Button
                                disabled={isCountdownActive}
                                onClick={() =>
                                  navigateToLive(auction.auction_id)
                                }
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
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
