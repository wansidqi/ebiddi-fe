import { useStoreContext } from "@/Context";

export function AlertDialog() {
  const { alert } = useStoreContext();
  const { messsage, showAlert, isSuccess } = alert;

  const failed = {
    border: "border-red-600",
    message: "ERROR",
  };

  const success = {
    border: "border-green-600",
    message: "SUCCESS",
  };

  return (
    <div
      className={`${showAlert ? "absolute top-20 px-10 sm:px-0" : "hidden"} `}
    >
      <div
        className={`bg-black px-5 py-3 border ${isSuccess ? success.border : failed.border} rounded-md text-lg text-center sm:text-2xl`}
      >
        <div className="flex gap-1">
          <p>
            {isSuccess ? success.message : failed.message}: {messsage}
          </p>
        </div>
      </div>
    </div>
  );
}
