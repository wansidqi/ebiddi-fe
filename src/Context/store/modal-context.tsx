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
};

function ModalContext(props: React.PropsWithChildren<{}>) {
  const [showLiveDialog, setShowLiveDialog] = useState(false);
  const [alert, setAlert] = useState({ showAlert: false, messsage: "" });
  const [term, setTerm] = useState({ showTerm: false, eventId: "" });

  const contextValue: Data = {
    showLiveDialog,
    setShowLiveDialog,
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

export default ModalContext;
