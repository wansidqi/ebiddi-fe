import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<Data | null>(null);

export function useModalContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("state must be used within a ContextProvider");
  }
  return context;
}

type Data = {
  showLiveDialog: boolean;
  setShowLiveDialog: React.Dispatch<React.SetStateAction<boolean>>;

  showDetailById: number | null;
  openDetailModal: (number: number) => void;
  closeDetailModal: () => void;

  alert: {
    showAlert: boolean;
    messsage: string;
    isSuccess: boolean;
  };
  setAlert: React.Dispatch<
    React.SetStateAction<{
      showAlert: boolean;
      messsage: string;
      isSuccess: boolean;
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

  biddingModal: {
    closeModal: boolean;
    setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
    startModal: boolean;
    setStartModal: React.Dispatch<React.SetStateAction<boolean>>;
    reauctionModal: boolean;
    setReauctionModal: React.Dispatch<React.SetStateAction<boolean>>;
    selfWinner: boolean;
    setSelfWinner: React.Dispatch<React.SetStateAction<boolean>>;
    otherWinner: boolean;
    setOtherWinner: React.Dispatch<React.SetStateAction<boolean>>;
    pause: boolean;
    setPause: React.Dispatch<React.SetStateAction<boolean>>;
    withdraw: boolean;
    setWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
    hold: boolean;
    setHold: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

function ModalContext(props: React.PropsWithChildren<{}>) {
  const [showLiveDialog, setShowLiveDialog] = useState(false);

  const [alert, setAlert] = useState({
    showAlert: false,
    messsage: "",
    isSuccess: false,
  });
  const [term, setTerm] = useState({ showTerm: false, eventId: "" });
  const [showDetailById, setShowDetailById] = useState<null | number>(null);

  const [closeModal, setCloseModal] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [reauctionModal, setReauctionModal] = useState(false);
  const [selfWinner, setSelfWinner] = useState(false);
  const [otherWinner, setOtherWinner] = useState(false);
  const [pause, setPause] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [hold, setHold] = useState(false);

  const biddingModal = {
    closeModal,
    setCloseModal,
    startModal,
    setStartModal,
    reauctionModal,
    setReauctionModal,
    selfWinner,
    setSelfWinner,
    otherWinner,
    setOtherWinner,
    pause,
    setPause,
    withdraw,
    setWithdraw,
    hold,
    setHold,
  };

  const openDetailModal = (number: number) => {
    setShowDetailById(number);
  };
  const closeDetailModal = () => {
    setShowDetailById(null);
  };

  const contextValue: Data = {
    showLiveDialog,
    setShowLiveDialog,
    alert,
    setAlert,
    term,
    setTerm,
    showDetailById,
    openDetailModal,
    closeDetailModal,
    biddingModal,
  };

  useEffect(() => {
    if (alert.showAlert === true) {
      setTimeout(() => {
        setAlert({ messsage: "", showAlert: false, isSuccess: false });
      }, 3000);
    }
  }, [alert]);

  return <AppContext.Provider value={contextValue} {...props} />;
}

export default ModalContext;
