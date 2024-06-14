import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<Data | null>(null);

export function useModalContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("state must be used within a ContextProvider");
  }
  return context;
}

interface ModalDialog {
  show: boolean;
  title: string;
  content: string;
  variant?: "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick?: () => any;
  timer?: number;
}

type Data = {
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

  swal: ModalDialog;
  $swal: (params: Omit<ModalDialog, "show">) => void;
  $swalClose: () => void;
};

function ModalContext(props: React.PropsWithChildren<{}>) {
  const [alert, setAlert] = useState({
    showAlert: false,
    messsage: "",
    isSuccess: false,
  });
  const [term, setTerm] = useState({ showTerm: false, eventId: "" });
  const [showDetailById, setShowDetailById] = useState<null | number>(null);

  const [swal, set$swal] = useState<ModalDialog>({
    show: false,
    title: "",
    content: "",
    timer: undefined,
    onClick: undefined,
    variant: undefined,
  });

  const $swalClose = () => {
    set$swal({
      show: false,
      title: "",
      content: "",
      timer: undefined,
      onClick: () => {},
      variant: undefined,
    });
  };

  const $swal = (params: Omit<ModalDialog, "show">) => {
    set$swal({
      show: true,
      title: params.title,
      content: params.content,
      timer: params.timer,
      onClick: params.onClick,
      variant: params.variant,
    });
  };

  const openDetailModal = (number: number) => {
    setShowDetailById(number);
  };
  const closeDetailModal = () => {
    setShowDetailById(null);
  };

  const contextValue: Data = {
    swal,
    $swal,
    alert,
    setAlert,
    term,
    setTerm,
    showDetailById,
    openDetailModal,
    closeDetailModal,
    $swalClose,
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
