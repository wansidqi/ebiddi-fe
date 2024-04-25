import { EventsInterface } from "@/interfaces";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<Data | null>(null);

export function useAuctionContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("state must be used within a ContextProvider");
  }
  return context;
}

type Data = {
  view: "Grid" | "List";
  setView: React.Dispatch<React.SetStateAction<"Grid" | "List">>;

  selectEvent: EventsInterface | null;
  setSelectEvent: React.Dispatch<React.SetStateAction<EventsInterface | null>>;
};

function AuctionContext(props: React.PropsWithChildren<{}>) {
  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [selectEvent, setSelectEvent] = useState<EventsInterface | null>(null);

  const contextValue: Data = {
    view,
    setView,
    selectEvent,
    setSelectEvent,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default AuctionContext;
