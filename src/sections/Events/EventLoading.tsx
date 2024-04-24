import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDaysIcon, Clock, LucideNavigation } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function EventLoading() {
  return (
    <div>
      <Card className="rounded-sm py-3">
        <CardHeader>
          <CardTitle>
            <Skeleton className="mx-auto sm:mx-0 h-8 w-1/2 rounded-lg" />
          </CardTitle>
        </CardHeader>

        <CardContent className="text-[14px]">
          {[
            {
              icon: <CalendarDaysIcon size="15px" />,
              value: <Skeleton className="h-3 w-32 rounded-sm" />,
            },
            {
              icon: <Clock size="15px" />,
              value: <Skeleton className="h-3 w-32 rounded-sm" />,
            },
            {
              icon: <LucideNavigation size="15px" />,
              value: <Skeleton className="h-3 w-32 rounded-sm" />,
            },
          ].map(({ icon, value }, index) => (
            <div key={index} className="flex my-1 items-center gap-3">
              {icon}
              {value}
            </div>
          ))}
        </CardContent>

        <CardFooter className="flexcenter-col justify-between mt-4">
          <div className="flex justify-between gap-4 w-full">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton className="w-full rounded-md py-4" />
              </div>
            ))}
          </div>
          <div className="w-full my-4">
            <Skeleton className="w-full rounded-md py-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
