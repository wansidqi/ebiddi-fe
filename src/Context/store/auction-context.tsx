import { EventsInterface } from "@/interfaces";
import { User } from "@/interfaces/API";
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

  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;

  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;

  USER: User | null;
  SET_USER: React.Dispatch<React.SetStateAction<User | null>>;

  dev: boolean;
};

function AuctionContext(props: React.PropsWithChildren<{}>) {
  const [USER, SET_USER] = useState<User | null>(null);

  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [selectEvent, setSelectEvent] = useState<EventsInterface | null>(null);
  const [countdown, setCountdown] = useState(9);
  const [showDialog, setShowDialog] = useState(false);

  const dev = true;

  const contextValue: Data = {
    view,
    setView,
    selectEvent,
    setSelectEvent,
    countdown,
    setCountdown,
    showDialog,
    setShowDialog,
    dev,
    USER,
    SET_USER,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default AuctionContext;
