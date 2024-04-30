import { Skeleton } from "@/components/ui/skeleton";
import { gridCSS } from "..";

export function ItemGridLoading() {
  return (
    <>
      <div className={gridCSS}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-2 border-secondary rounded-sm pb-4">
            <div className="relative h-[280px] w-full">
              <div className="absolute top-1 left-0 px-2 py-1 rounded-sm">
                <Skeleton className="py-3 w-14 my-1 rounded-md" />
              </div>
              <div className="absolute bottom-1 left-0 px-2 py-1 rounded-sm">
                <Skeleton className="py-3 w-14 my-1 rounded-md" />
              </div>
            </div>
            <div className="bg-primary text-xl p-2 text-center">
              <div className="py-3 mx-auto w-40 my-1 rounded-sm" />
            </div>
            <div className="m-2 flex flex-col gap-2">
              <Skeleton className="py-2 w-40 my-1 rounded-sm" />
              <div>
                <Skeleton className="py-2 w-20 my-2 rounded-sm" />
                <Skeleton className="py-2 w-40 my-1 rounded-sm" />
              </div>
              <div>
                <Skeleton className="py-2 w-20 my-2 rounded-sm" />
                <Skeleton className="py-2 w-40 my-1 rounded-sm" />
              </div>
              <div className="flex gap-3 my-0">
                <div className="w-full">
                  <Skeleton className="py-4 w-full" />
                </div>
                <div className="w-1/3">
                  <Skeleton className="py-4 w-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
