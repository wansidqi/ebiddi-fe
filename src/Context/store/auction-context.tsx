import { EventsInterface, User } from "@/interfaces";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<AuctionData | null>(null);

type AuctionData = {
  view: "Grid" | "List";
  setView: React.Dispatch<React.SetStateAction<"Grid" | "List">>;

  selectEvent: EventsInterface | null;
  setSelectEvent: React.Dispatch<React.SetStateAction<EventsInterface | null>>;

  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;

  USER: User | null;
  SET_USER: React.Dispatch<React.SetStateAction<User | null>>;

  isTACCooldown: boolean;
  setIsTACCooldown: React.Dispatch<React.SetStateAction<boolean>>;

  dev: boolean;
};

export function AuctionProvider(props: React.PropsWithChildren<{}>) {
  const [USER, SET_USER] = useState<User | null>(null);

  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [selectEvent, setSelectEvent] = useState<EventsInterface | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTACCooldown, setIsTACCooldown] = useState(false);

  console.log(isTACCooldown);

  //TODO change to false when to deploy
  const dev = false;

  const contextValue: AuctionData = {
    view,
    setView,
    selectEvent,
    setSelectEvent,
    dev,
    USER,
    SET_USER,
    timer,
    setTimer,
    isTACCooldown,
    setIsTACCooldown,
  };

  return <AppContext.Provider value={contextValue} {...props} />;
}

export function useAuction() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("state must be used within a ContextProvider");
  }
  return context;
}
