import { LucideGavel, LockKeyholeIcon, UnlockKeyhole } from "lucide-react";
import { useState } from "react";

export function BidderController() {
  const [toggleLock, setToggleLock] = useState(false);

  return (
    <div className="flexcenter gap-6">
      <button
        onClick={() => setToggleLock(!toggleLock)}
        className="bg-green-600 py-3 rounded-md w-full relative sm:w-1/2"
      >
        <p>RM 51,500.00</p>
        <div className="absolute right-10 top-[0.85rem]">
          <LucideGavel />
        </div>
      </button>
      <div className="flex gap-4">
        {toggleLock ? <LockKeyholeIcon /> : <UnlockKeyhole />}
      </div>
    </div>
  );
}
