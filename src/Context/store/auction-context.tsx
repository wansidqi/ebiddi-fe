import { EventsInterface, User } from "@/interfaces";
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
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;

  USER: User | null;
  SET_USER: React.Dispatch<React.SetStateAction<User | null>>;

  dev: boolean;
};

function AuctionContext(props: React.PropsWithChildren<{}>) {
  const [USER, SET_USER] = useState<User | null>(null);

  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [selectEvent, setSelectEvent] = useState<EventsInterface | null>(null);
  const [countdown, setCountdown] = useState(11);
  const [timer, setTimer] = useState(0);

  const dev = true;

  const contextValue: Data = {
    view,
    setView,
    selectEvent,
    setSelectEvent,
    countdown,
    setCountdown,
    dev,
    USER,
    SET_USER,
    timer,
    setTimer,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default AuctionContext;
