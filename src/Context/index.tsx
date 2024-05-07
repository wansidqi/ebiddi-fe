import React from "react";
import AuctionContext, { useAuctionContext } from "./store/auction-context";

export function useStoreContext() {
  const auction = useAuctionContext();

  return { auction };
}

function StoreContext(props: React.PropsWithChildren<{}>) {
  return (
    <AuctionContext>
      {props.children}
    </AuctionContext>
  );
}

export default StoreContext;
