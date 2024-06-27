import React from "react";
import { SocketProvider, useSocket } from "./store/websocket-context";
import { AuctionProvider, useAuction } from "./store/auction-context";
import { ModalProvider, useModal } from "./store/modal-context";

export function useStoreContext() {
  return {
    ...useAuction(),
    ...useModal(),
    ...useSocket(),
  };
}

function StoreContext(props: React.PropsWithChildren<{}>) {
  return (
    <AuctionProvider>
      <ModalProvider>
        <SocketProvider>
          {/* <GAP> */}
          {props.children}
          {/* </GAP> */}
        </SocketProvider>
      </ModalProvider>
    </AuctionProvider>
  );
}

export default StoreContext;
