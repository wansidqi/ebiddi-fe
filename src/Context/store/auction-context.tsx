import { EventsInterface, User } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";

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

  alert: {
    showAlert: boolean;
    messsage: string;
  };
  setAlert: React.Dispatch<
    React.SetStateAction<{
      showAlert: boolean;
      messsage: string;
    }>
  >;

  term: {
    showTerm: boolean;
    eventId: string;
  };
  setTerm: React.Dispatch<
    React.SetStateAction<{
      showTerm: boolean;
      eventId: string;
    }>
  >;

  dev: boolean;
};

function AuctionContext(props: React.PropsWithChildren<{}>) {
  const [USER, SET_USER] = useState<User | null>(null);

  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [selectEvent, setSelectEvent] = useState<EventsInterface | null>(null);
  const [countdown, setCountdown] = useState(9);
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState({ showAlert: false, messsage: "" });
  const [term, setTerm] = useState({ showTerm: false, eventId: "" });

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
    alert,
    setAlert,
    term,
    setTerm,
  };

  useEffect(() => {
    if (alert.showAlert === true) {
      setTimeout(() => {
        setAlert({ messsage: "", showAlert: false });
      }, 3000);
    }
  }, [alert]);

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default AuctionContext;
