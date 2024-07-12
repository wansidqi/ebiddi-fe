import { useStoreContext } from "@/Context";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

import DefaultImage from "@/assets/images/upload-receipt/upload-placehodler.jpeg";
import uploading from "@/assets/images/upload-receipt/uploading.gif";
import { DynamicDrawer } from "@/components";
import { Input } from "@/components/ui/input";
import { LiveDialog } from "../Live/LiveDialog";
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

  const [receiptModal, setReceiptModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);

  const [receipt, setReceipt] = useState<string | undefined>(undefined);
  const [refund, setRefund] = useState<string | undefined>(undefined);

  const receiptRef = useRef<HTMLInputElement>(null);
  const refundRef = useRef<HTMLInputElement>(null);

  const [isReceiptValidate, setIsReceiptValidate] = useState(false);
  const [isRefundValidate, setIsRefundValidate] = useState(false);

  const [paymentRef, setpaymentRef] = useState("");
  const [bankinAmount, setBankinAmount] = useState("");

  const [accHolder, setAccHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccNo, setBankAccNo] = useState("");
  const [refundAmount, setRefundAmount] = useState("");

  const { usePostReceipt } = useAPIServices();
  const { mutateAsync: uploadReceipt } = usePostReceipt();

  const resetAll = () => {
    setpaymentRef("");
    setBankinAmount("");
    setAccHolder("");
    setBankName("");
    setBankAccNo("");
    setRefundAmount("");
    setReceipt("");
    setRefund("");
  };

  const validateFileType = async (ref: React.RefObject<HTMLInputElement>) => {
    return new Promise<boolean>((resolve) => {
      if (ref.current && ref.current.files && ref.current.files[0]) {
        let img = ref.current.files[0];
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

  const getFileName = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current && ref.current.files && ref.current.files[0]) {
      return ref.current.files[0].name;
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

  const validateRefund = (): boolean => {
    return (
      isRefundValidate &&
      typeof refund === "string" &&
      refund.length > 0 &&
      accHolder.length > 0 &&
      bankAccNo.length > 0 &&
      refundAmount.length > 0 &&
      bankName.length > 0
    );
  };

  const handleImageUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (ref.current) {
      ref.current.click();
    }
  };

  const uploadImageDisplay = (
    ref: React.RefObject<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    if (ref.current && ref.current.files && ref.current.files[0]) {
      try {
        setImage(uploading);
        const uploadedFile = ref.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setImage(cachedURL);
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

      const isValidate = await validateFileType(receiptRef);

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

  const postRefund = async () => {
    if (
      receiptRef.current &&
      receiptRef.current.files &&
      receiptRef.current.files[0]
    ) {
      const uploadedFile = receiptRef.current.files[0];
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("accHolder", accHolder);
      formData.append("bankName", bankName);
      formData.append("bankAccNo", bankAccNo);
      formData.append("refundAmount", refundAmount);

      try {
        //TODO post API for uplaod receipt

        /*  await fetch("https://api.example.com", {method: "post", body: formData});  */
        $swal({
          title: "Upload Image",
          content: "Receipt success uploaded!",
          hasClose: false,
          onClick: () => resetAll(),
        });
      } catch (error) {
        $swal({
          title: "Upload Image",
          content: "Failed to upload receipt",
          hasClose: false,
          onClick: () => resetAll(),
        });
      }
    } else {
      $swal({
        title: "Upload Image",
        content: "Please upload receipt",
        hasClose: false,
        onClick: () => resetAll(),
      });
    }
  };

  const removeImage = (
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    if (!ref.current) return;
    setImage(undefined);
    ref.current.value = "";
  };

  useEffect(() => {
    async function init() {
      const checkReceipt = await validateFileType(receiptRef);
      setIsReceiptValidate(checkReceipt);
    }
    init();
  }, [receipt]);

  useEffect(() => {
    async function init() {
      const checkRefund = await validateFileType(refundRef);
      setIsRefundValidate(checkRefund);
    }
    init();
  }, [refund]);

  return (
    <main className="border">
      <p className="text-center py-3 bg-primary font-bold text-black">
        User Deposit Info
      </p>
      <LiveDialog />

      <FullImage
        state={receiptModal}
        setState={setReceiptModal}
        img={receipt}
      />

      <FullImage state={refundModal} setState={setRefundModal} img={refund} />

      <div className="p-10 flexcenter-col gap-10">
        <section className="flex flex-col w-full">
          <p>Topup your account:</p>
          <DynamicDrawer
            btnName="Topup Now"
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
                      <button
                        onClick={() => removeImage(setReceipt, receiptRef)}
                        className="text-sm"
                      >
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
                  onChange={() => uploadImageDisplay(receiptRef, setReceipt)}
                  hidden
                />
                {receipt && !isReceiptValidate && (
                  <p className="text-red-600">
                    Please upload pdf / png/ jpeg file type
                  </p>
                )}
                <p>{getFileName(receiptRef)}</p>
                <Button onClick={(e) => handleImageUpload(e, receiptRef)}>
                  {!receipt ? "upload" : "change"}
                </Button>
              </div>
            </div>
          </DynamicDrawer>
        </section>

        <section className="flex flex-col w-full">
          <p>Refund</p>
          <DynamicDrawer
            btnName="Refund"
            footerBtnTitle="Submit"
            title="Available Amount: RM xxx"
            widthPx="px-16"
            footerButtonCallback={postRefund}
            footerBtnDisable={!validateRefund()}
          >
            <div className="flexcenter-col gap-3">
              <div className="w-full">
                <p>Account Holder Name:</p>
                <Input
                  onChange={(e) => setAccHolder(e.target.value)}
                  type="text"
                  placeholder="payment reference"
                />
              </div>
              <div className="w-full">
                <p>Bank Name:</p>
                <Input
                  onChange={(e) => setBankName(e.target.value)}
                  type="text"
                  placeholder="amount"
                />
              </div>
              <div className="w-full">
                <p>Bank Account No:</p>
                <Input
                  onChange={(e) => setBankAccNo(e.target.value)}
                  type="text"
                  placeholder="amount"
                />
              </div>
              <div className="w-full">
                <p>Refund Amount:</p>
                <Input
                  onChange={(e) => setRefundAmount(e.target.value)}
                  type="text"
                  placeholder="amount"
                />
              </div>
              <div className="w-full">
                <p>Upload IC Photo/SSM:</p>
                <div className="flex">
                  {!refund ? (
                    <img src={DefaultImage} className="w-20 my-3" alt="" />
                  ) : (
                    <div className="flex gap-4">
                      <img
                        onClick={() => setRefundModal(true)}
                        src={refund}
                        className="w-20 my-3"
                        alt=""
                      />
                      <button
                        onClick={() => removeImage(setRefund, refundRef)}
                        className="text-sm"
                      >
                        remove
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="file"
                  ref={refundRef}
                  onChange={() => uploadImageDisplay(refundRef, setRefund)}
                  hidden
                />
                {refund && !isRefundValidate && (
                  <p className="text-red-600">
                    Please upload pdf / png/ jpeg file type
                  </p>
                )}
                <p>{getFileName(refundRef)}</p>
                <Button onClick={(e) => handleImageUpload(e, refundRef)}>
                  {!refund ? "upload" : "change"}
                </Button>
              </div>
            </div>
          </DynamicDrawer>
        </section>
      </div>
    </main>
  );
}

const FullImage = ({
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
