import { useStoreContext } from "@/Context";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

import DefaultImage from "@/assets/images/upload-receipt/upload-placehodler.jpeg";
import uploading from "@/assets/images/upload-receipt/uploading.gif";
import { DynamicDrawer } from "@/components";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAPIServices } from "@/services";
import FileTypeChecker from "file-type-checker";

export function Receipt() {
  const { $swal } = useStoreContext();

  const receiptRef = useRef<HTMLInputElement>(null);

  const [receiptModal, setReceiptModal] = useState(false);
  const [receipt, setReceipt] = useState<string | undefined>(undefined);
  const [isReceiptValidate, setIsReceiptValidate] = useState(false);

  const [paymentRef, setpaymentRef] = useState("");
  const [bankinAmount, setBankinAmount] = useState("");

  const { usePostReceipt } = useAPIServices();
  const { mutateAsync: uploadReceipt } = usePostReceipt();

  const resetAll = () => {
    setpaymentRef("");
    setBankinAmount("");
    setReceipt("");
  };

  const validateFileType = async () => {
    return new Promise<boolean>((resolve) => {
      if (
        receiptRef.current &&
        receiptRef.current.files &&
        receiptRef.current.files[0]
      ) {
        let img = receiptRef.current.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          const fileBuffer = new Uint8Array(
            event.target?.result as ArrayBuffer
          );

          if (
            FileTypeChecker.isPNG(fileBuffer) ||
            FileTypeChecker.isJPEG(fileBuffer) ||
            FileTypeChecker.isPDF(fileBuffer)
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        };

        reader.readAsArrayBuffer(img);
      } else {
        resolve(false);
      }
    });
  };

  const getFileName = () => {
    if (
      receiptRef.current &&
      receiptRef.current.files &&
      receiptRef.current.files[0]
    ) {
      return receiptRef.current.files[0].name;
    }
  };

  const validateReceipt = (): boolean => {
    return (
      isReceiptValidate &&
      typeof receipt === "string" &&
      receipt.length > 0 &&
      paymentRef.length > 0 &&
      bankinAmount.length > 0
    );
  };

  const handleImageUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (receiptRef.current) {
      receiptRef.current.click();
    }
  };

  const uploadImageDisplay = () => {
    if (
      receiptRef.current &&
      receiptRef.current.files &&
      receiptRef.current.files[0]
    ) {
      try {
        setReceipt(uploading);
        const uploadedFile = receiptRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setReceipt(cachedURL);
      } catch (error) {
        alert(error);
      }
    }
  };

  const postReceipt = async () => {
    if (
      receiptRef.current &&
      receiptRef.current.files &&
      receiptRef.current.files[0]
    ) {
      const uploadedFile = receiptRef.current.files[0];
      const formData = new FormData();

      const payload = {
        credit_id: "0",
        reference_no: paymentRef,
        amount: bankinAmount,
        attachment: uploadedFile,
      };

      for (let [key, value] of Object.entries(payload)) {
        formData.append(key, value);
      }

      const isValidate = await validateFileType();

      if (!isValidate) {
        $swal({
          title: "Upload file",
          content: "Invalid file type. Please upload png/jpeg/pdf file type.",
          hasClose: false,
        });
      } else {
        uploadReceipt(formData, {
          onSuccess: () => {
            $swal({
              title: "Upload Image",
              content: "Receipt success uploaded!",
              hasClose: false,
              onClick: () => resetAll(),
            });
          },
          onError: () => {
            $swal({
              title: "Upload Image",
              content: "Failed to upload receipt",
              hasClose: false,
              onClick: () => resetAll(),
            });
          },
        });
      }
    } else {
      $swal({
        title: "Upload Image",
        content: "Please fill the form",
        hasClose: false,
        onClick: () => resetAll(),
      });
    }
  };

  const removeImage = () => {
    if (!receiptRef.current) return;
    setReceipt(undefined);
    receiptRef.current.value = "";
  };

  useEffect(() => {
    async function init() {
      const checkReceipt = await validateFileType();
      setIsReceiptValidate(checkReceipt);
    }
    init();
  }, [receipt]);

  return (
    <>
      <FullImage
        state={receiptModal}
        setState={setReceiptModal}
        img={receipt}
      />

      <section className="flex flex-col w-full">
        {/* <p>Topup your account:</p> */}
        <DynamicDrawer
          btnName="Topup Credit"
          footerBtnTitle="Submit"
          title="Deposit your account"
          widthPx="px-16"
          footerButtonCallback={postReceipt}
          footerBtnDisable={!validateReceipt()}
        >
          <div className="flexcenter-col gap-3 md:gap-6">
            <div className="w-full">
              <p>Payment Reference:</p>
              <Input
                onChange={(e) => setpaymentRef(e.target.value)}
                type="text"
                placeholder="payment reference"
              />
            </div>
            <div className="w-full mb-4">
              <p>Bank-in Amount (RM):</p>
              <Input
                onChange={(e) => setBankinAmount(e.target.value)}
                type="text"
                placeholder="amount"
              />
            </div>
            <div className="w-full">
              <p>Upload Receipt:</p>
              <div className="flex">
                {!receipt ? (
                  <img src={DefaultImage} className="w-20 my-3" alt="" />
                ) : (
                  <div className="flex gap-4">
                    <img
                      onClick={() => setReceiptModal(true)}
                      src={receipt}
                      className="w-20 my-3"
                      alt=""
                    />
                    <button onClick={removeImage} className="text-sm">
                      remove
                    </button>
                  </div>
                )}
              </div>
              <input
                className=""
                type="file"
                id="file"
                ref={receiptRef}
                onChange={uploadImageDisplay}
                hidden
              />
              {receipt && !isReceiptValidate && (
                <p className="text-red-600">
                  Please upload pdf / png/ jpeg file type
                </p>
              )}
              <p>{getFileName()}</p>
              <Button onClick={handleImageUpload}>
                {!receipt ? "upload" : "change"}
              </Button>
            </div>
          </div>
        </DynamicDrawer>
      </section>
    </>
  );
}

export const FullImage = ({
  state,
  setState,
  img,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  img: string | undefined;
}) => {
  // let dk = "blob:http://localhost:5173/02e2c2eb-5165-4480-ad3c-be3f3156bac4";
  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogContent className="px-20 mx-auto flexcenter">
        <DialogHeader>
          <DialogTitle>{"Image"}</DialogTitle>
          <DialogDescription className="py-3 text-center text-lg">
            <div className="flexcenter">
              <img src={img} className="max-w-[70%] max-h-[70%]" alt="" />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex gap-10 justify-between">
          <Button
            onClick={() => setState(false)}
            className="w-full"
            variant={"default"}
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
