import { DynamicDrawer } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { FullImage } from "..";
import DefaultImage from "@/assets/images/upload-receipt/upload-placehodler.jpeg";
import FileTypeChecker from "file-type-checker";
import uploading from "@/assets/images/upload-receipt/uploading.gif";
import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

enum Holder {
  ic = "1",
  ssm = "2",
}

type Ref = React.RefObject<HTMLInputElement>;
type SetImage = (value: React.SetStateAction<string | undefined>) => void;

export function Refund() {
  const { $swal } = useStoreContext();

  const [holder_type, setHolder_type] = useState<Holder>(Holder.ic);

  const ssmRef = useRef<HTMLInputElement>(null);
  const [ssmImg, setSsmImg] = useState<string | undefined>(undefined);
  const [isSsmValidate, setIsSsmValidate] = useState(false);

  const icFrontRef = useRef<HTMLInputElement>(null);
  const [icFront, setIcFront] = useState<string | undefined>(undefined);
  const [isIcFrontValidate, setIsIcFrontValidate] = useState(false);

  const icBackRef = useRef<HTMLInputElement>(null);
  const [icBack, setIcBack] = useState<string | undefined>(undefined);
  const [isIcBackValidate, setIsIcBackValidate] = useState(false);

  const [refundModal, setRefundModal] = useState(false);

  const [holder_name, setAccHolder] = useState("");
  const [bank_name, setBankName] = useState("");
  const [bank_no, setBankAccNo] = useState("");
  const [amount, setAmount] = useState("");

  const { usePostRefund, useGetRefund } = useAPIServices();
  const { mutateAsync: uploadRefund } = usePostRefund();
  const { data } = useGetRefund();

  const IC = [
    {
      name: "Front",
      ref: icFrontRef,
      img: icFront,
      setImg: setIcFront,
      validate: isIcFrontValidate,
    },
    {
      name: "Back",
      ref: icBackRef,
      img: icBack,
      setImg: setIcBack,
      validate: isIcBackValidate,
    },
  ];

  const validateFileType = async (ref: Ref) => {
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

  const validateRefund = (): boolean => {
    if (holder_type === Holder.ic) {
      return (
        isIcFrontValidate &&
        isIcBackValidate &&
        typeof icFront === "string" &&
        icFront.length > 0 &&
        typeof icBack === "string" &&
        icBack.length > 0 &&
        holder_name.length > 0 &&
        bank_no.length > 0 &&
        amount.length > 0 &&
        bank_name.length > 0
      );
    } else {
      return (
        isSsmValidate &&
        typeof ssmImg === "string" &&
        ssmImg.length > 0 &&
        holder_name.length > 0 &&
        bank_no.length > 0 &&
        amount.length > 0 &&
        bank_name.length > 0
      );
    }
  };

  const postRefund = async () => {
    const ssm = getFile(ssmRef);
    const ic_front = getFile(icFrontRef);
    const ic_back = getFile(icBackRef);
    const formData = new FormData();

    const payload = {
      credit_id: "0",
      holder_type,
      holder_name,
      bank_name,
      bank_no,
      amount,
      ssm: ssm || "",
      ic_front: ic_front || "",
      ic_back: ic_back || "",
    };

    for (let [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }

    uploadRefund(formData, {
      onSuccess: () => {
        $swal({
          title: "Request Refund",
          content: "Success request for refund!",
          hasClose: false,
          onClick: () => resetAll(),
        });
      },
      onError: () => {
        $swal({
          title: "Request Refund",
          content: "Failed request for refund!",
          hasClose: false,
          onClick: () => resetAll(),
        });
      },
    });
  };

  const resetAll = () => {
    setAccHolder("");
    setBankName("");
    setBankAccNo("");
    setAmount("");
    setSsmImg("");
    setIcBack("");
    setIcFront("");
  };

  const uploadImageDisplay = (ref: Ref, set: SetImage) => {
    try {
      set(uploading);
      const uploadedFile = getFile(ref);
      if (uploadedFile) {
        const cachedURL = URL.createObjectURL(uploadedFile);
        set(cachedURL);
      } else {
        $swal({
          title: "File",
          content: "No file selected",
          hasClose: false,
          onClick: () => resetAll(),
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleImageUpload = (ref: Ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const removeImage = (ref: Ref, set: SetImage) => {
    if (!ref.current) return;
    set(undefined);
    ref.current.value = "";
  };

  const getFileName = (ref: Ref) => {
    if (ref.current && ref.current.files && ref.current.files[0]) {
      return ref.current.files[0].name;
    }
  };

  const getFile = (ref: Ref) => {
    if (ref.current && ref.current.files && ref.current.files[0]) {
      return ref.current.files[0];
    }
    // else {
    //   $swal({
    //     title: "File",
    //     content: "No file selected",
    //     hasClose: false,
    //     onClick: () => resetAll(),
    //   });
    //   throw new Error("No file selected");
    // }
  };

  useEffect(() => {
    async function init() {
      const checkSSM = await validateFileType(ssmRef);
      setIsSsmValidate(checkSSM);
    }
    init();
  }, [ssmImg]);

  useEffect(() => {
    async function init() {
      const checkIcFront = await validateFileType(icFrontRef);
      setIsIcFrontValidate(checkIcFront);
    }
    init();
  }, [icFront]);

  useEffect(() => {
    async function init() {
      const checkIcBack = await validateFileType(icBackRef);
      setIsIcBackValidate(checkIcBack);
    }
    init();
  }, [icBack]);

  return (
    <>
      <FullImage state={refundModal} setState={setRefundModal} img={ssmImg} />
      <section className="flex flex-col w-full">
        <p>Refund</p>
        <DynamicDrawer
          btnName="Refund"
          footerBtnTitle="Submit"
          title={`Available Amount: RM ${data ?? 0}`}
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
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="amount"
              />
            </div>
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="border py-2 px-3 text-xs rounded-md bg-primary-foreground">
                    {holder_type === Holder.ic
                      ? "Upload IC Photo:"
                      : "Upload SSM:"}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setHolder_type(Holder.ic)}>
                    Upload IC
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setHolder_type(Holder.ssm)}>
                    Upload SSM
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {holder_type === Holder.ssm && (
                <div>
                  <div className="flex">
                    {!ssmImg ? (
                      <img src={DefaultImage} className="w-20 my-3" alt="" />
                    ) : (
                      <div className="flex gap-4">
                        <img
                          onClick={() => setRefundModal(true)}
                          src={ssmImg}
                          className="w-20 my-3"
                          alt=""
                        />
                        <button
                          onClick={() => removeImage(ssmRef, setSsmImg)}
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
                    ref={ssmRef}
                    onChange={() => uploadImageDisplay(ssmRef, setSsmImg)}
                    hidden
                  />
                  {ssmImg && !isSsmValidate && (
                    <p className="text-red-600">
                      Please upload pdf / png/ jpeg file type
                    </p>
                  )}
                  <p>{getFileName(ssmRef)}</p>
                  <Button onClick={() => handleImageUpload(ssmRef)}>
                    {!ssmImg ? "upload" : "change"}
                  </Button>
                </div>
              )}

              {holder_type === Holder.ic && (
                <div className="flex gap-10">
                  {IC.map((ic, index) => (
                    <div key={index}>
                      <div className="flex">
                        {!ic.img ? (
                          <img
                            src={DefaultImage}
                            className="w-20 my-3"
                            alt=""
                          />
                        ) : (
                          <div className="flex gap-4">
                            <img
                              onClick={() => setRefundModal(true)}
                              src={ic.img}
                              className="w-20 my-3"
                              alt=""
                            />
                            <button
                              onClick={() => removeImage(ic.ref, ic.setImg)}
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
                        ref={ic.ref}
                        onChange={() => uploadImageDisplay(ic.ref, ic.setImg)}
                        hidden
                      />
                      {ic.img && !ic.validate && (
                        <p className="text-red-600">
                          Please upload pdf / png/ jpeg file type
                        </p>
                      )}
                      <p>{getFileName(ic.ref)}</p>
                      <Button onClick={() => handleImageUpload(ic.ref)}>
                        {!ic.img ? `IC ${ic.name}` : "change"}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DynamicDrawer>
      </section>
    </>
  );
}
