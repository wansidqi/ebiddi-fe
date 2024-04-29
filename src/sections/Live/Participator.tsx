import { EyeIcon, LucideGavel } from "lucide-react";

export function Participator() {
  return (
    <div className="m-3 flexcenter gap-10">
      <div className="flexcenter gap-2 ">
        <div className="border-2 border-primary rounded-full p-2 text-primary">
          <EyeIcon />
        </div>
        <p className="pt-1">888</p>
      </div>
      <div className="flexcenter gap-2 ">
        <div className="border-2 border-primary rounded-full p-2 text-primary">
          <LucideGavel />
        </div>
        <p className="pt-1">888</p>
      </div>
      {/* <div className="flexcenter gap-2 border-2 border-primary rounded-lg py-1 px-2">
      <LucideGavel />
      <p className="pt-1">888</p>
    </div> */}
    </div>
  );
}
