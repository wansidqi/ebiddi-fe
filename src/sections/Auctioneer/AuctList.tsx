import { Container } from "@/components/Container";
import { InventoryInterface } from "@/interfaces";
import { numWithComma } from "@/lib/utils";
import { useAPIServices } from "@/services";
import { useNavigate, useParams } from "react-router-dom";
import { ItemDetail, LiveDialog } from "..";
import { useStoreContext } from "@/Context";
import { Fragment, useEffect, useState } from "react";
import { DynamicRenderer } from "@/components";
import { Button } from "@/components/ui/button";
import { Status } from "@/interfaces/websocket";

export function AuctList() {
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
  const navigate = useNavigate();
  const { useGetEventById, useCloseAuctionEvent } = useAPIServices();
  const { setView, publishEvent, setPayload } = useStoreContext();
  const [showDialog, setshowDialog] = useState(false);

  const { data } = useGetEventById(eventId);
  const { mutateAsync: onCloseEventAPI } = useCloseAuctionEvent();

  const auctions = data?.inventories;

  const getDeposit = (auction: InventoryInterface) => {
    return auction.deposit + auction.buyer_premium;
  };

  const navigateToLive = (auction_id: any) => {
    navigate(`/auctioneer/${eventId}/${auction_id}`);
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
      onCloseEventAPI(eventId);
    }
  };

  const confirmationDialog = () => {
    setshowDialog(true);
  };

  useEffect(() => {
    setView("List");
    return () => setView("Grid");
  }, []);

  return (
    <Fragment>
      <LiveDialog
        state={showDialog}
        handleState={setshowDialog}
        title="Auction Event"
        content="Close this auction event?"
        variant="destructive"
        onClick={() => closeEvent()}
      />
      <Container className="sm:mx-28 pt-5">
        <div className="my-5 flex w-full justify-end items-center">
          {data?.status === "Approved" ||
            (data?.status === "Deactive" && (
              <button
                onClick={confirmationDialog}
                className="bg-yellow-500 px-3 py-2 lg:px-5 text-black lg:py-3 rounded-md lg:text-xl"
              >
                Close Auction
              </button>
            ))}
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
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
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
                        <DynamicRenderer.When cond={auction.status === "HOLD"}>
                          <Button
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
