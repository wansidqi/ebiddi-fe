import React, { useEffect, useRef } from "react";

interface Props {
  modalState: boolean;
  handleClose?: () => any;
  opacity?: string;
  hasCloseBtn?: boolean;
  children: React.ReactNode;
}

export function Modal({
  modalState,
  handleClose,
  children,
  opacity = "80",
  hasCloseBtn,
}: Props): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalState) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        handleClose && handleClose();
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [modalState]);

  return (
    <div>
      {modalState && (
        <>
          <div
            ref={modalRef}
            className={`flex fixed inset-0 z-50 bg-background bg-opacity-${opacity}`}
          >
            <div className="w-full bg-opacity-90 text-[16px] overflow-y-auto custom-scrollbar">
              <div className="text-[16px]">
                {hasCloseBtn && (
                  <button
                    onClick={handleClose}
                    className="absolute right-4 top-4"
                  ></button>
                )}
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
