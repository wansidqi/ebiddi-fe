import { AuctionInterface } from "@/interfaces";
import { numWithComma } from "@/lib/utils";
import { KEY, useGetQueryData } from "@/services";

export function LiveDetail({ auctionId }: { auctionId: string | undefined }) {
  // const test = "69889";
  const queryKey = [KEY.auction, auctionId];
  const data = useGetQueryData<AuctionInterface>(queryKey);

  return (
    <div className="border flex flex-col gap-y-2 py-3 px-2 rounded-md h-[30em]">
      <div className="text-center text-2xl my-2">{data?.lot_no}</div>
      <div className="w-full mb-2 flexcenter">
        <img
          loading="lazy"
          className="w-52 h-52"
          src={(data && data?.images?.length > 0 && data?.images[0]) || ""}
          alt=""
        />
      </div>
      <p className="flex gap-2">
        <span className="text-primary">REGISTRATION NO:</span>{" "}
        {data?.registration_number}
      </p>
      <p className="flex gap-2">
        <span className="text-primary">YEAR:</span> {data?.year}
      </p>
      <p className="flex gap-2">
        <span className="text-primary">RESERVED PRICE:</span> RM
        {numWithComma(data?.reserve_price as number)}
      </p>
      <p className="flex gap-2">
        <span className="text-primary">TRANSMISSION TYPE:</span>{" "}
        {data?.transmission}
      </p>
      <p className="flex gap-2">
        <span className="text-primary">LEGAL OWNER:</span> {data?.legal_owner}
      </p>
    </div>
  );
}
