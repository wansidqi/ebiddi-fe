import React from "react";
import AuctionContext, { useAuctionContext } from "./store/auction-context";
import ModalContext, { useModalContext } from "./store/modal-context";
import WsContext, { useWsContext } from "./store/websocket-context";

export function useStoreContext() {
  const auction = useAuctionContext();
  const modal = useModalContext();
  const websocket = useWsContext();

  return { ...auction, ...modal, ...websocket };
}

function StoreContext(props: React.PropsWithChildren<{}>) {
  return (
    <AuctionContext>
      <ModalContext>
        <WsContext>{props.children}</WsContext>
      </ModalContext>
    </AuctionContext>
  );
}

export default StoreContext;
