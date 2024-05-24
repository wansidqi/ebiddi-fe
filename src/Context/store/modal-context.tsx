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
  setShowDetailById: React.Dispatch<React.SetStateAction<number | null>>;

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

  const contextValue: Data = {
    showLiveDialog,
    setShowLiveDialog,
    alert,
    setAlert,
    term,
    setTerm,
    showDetailById,
    setShowDetailById,
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
