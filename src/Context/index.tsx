import React from "react";
import AuctionContext, { useAuctionContext } from "./store/auction-context";
import ModalContext, { useModalContext } from "./store/modal-context";

export function useStoreContext() {
  const auction = useAuctionContext();
  const modal = useModalContext();

  return { ...auction, ...modal };
}

function StoreContext(props: React.PropsWithChildren<{}>) {
  return (
    <AuctionContext>
      <ModalContext>{props.children}</ModalContext>
    </AuctionContext>
  );
}

export default StoreContext;
