import { useAuctionContext } from "@/Context/store/auction-context";

export function AlertDialog() {
  const { alert } = useAuctionContext();
  const { messsage, showAlert } = alert;

  return (
    <div
      className={`${showAlert ? "absolute top-14 px-10 sm:px-0" : "hidden"} `}
    >
      <div className="bg-black px-5 py-3 border border-red-600 rounded-md text-lg text-center sm:text-2xl">
        <div className="flex gap-1">
          <p>ERROR: {messsage}</p>
        </div>
      </div>
    </div>
  );
}
