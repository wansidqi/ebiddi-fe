import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { EventsInterface } from "@/interfaces";
import { getDate, getTime, roleRenderer } from "@/lib/utils";
import { Countdown, EventDetail } from "..";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "@/Context";

export const EventTableHeader = ({
  isAuctioneer,
}: {
  isAuctioneer: boolean;
}) => {
  return (
    <TableHeader className="bg-muted/80">
      <TableRow className="">
        {
          /* prettier-ignore */
          <>
          <TableHead className="text-center">Event Name</TableHead>
          <TableHead className="hidden md:table-cell text-center">Host By</TableHead>
          {!isAuctioneer && ( <TableHead className="hidden md:table-cell text-center">Auctioneer</TableHead> )}
          <TableHead className="hidden md:table-cell text-center">Date</TableHead>
          <TableHead className="hidden md:table-cell text-center">Time</TableHead>
          <TableHead className="text-center">{!isAuctioneer ? "Auction Items":"Contract"}</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </>
        }
      </TableRow>
    </TableHeader>
  );
};

export const EventTableContent = ({
  event,
  isAuctioneer,
}: {
  event: EventsInterface[] | undefined;
  isAuctioneer: boolean;
}) => {
  const navigate = useNavigate();
  const { USER } = useStoreContext();

  const viewAuctionItemsOrContract = (props: EventsInterface) => {
    roleRenderer({
      action: "function",
      role: USER?.role,
      auctioneer: () => navigate(`/contract/event/${props.id}`),
      bidder: () => navigate(`/items/${props.id}`),
      noRole: () => navigate(`/items/${props.id}`),
    });
  };

  return (
    <TableBody className={"bg-muted/20"}>
      {event?.map((props, i) => {
        /* prettier-ignore */
        return (
      <TableRow key={i}>
        <TableCell className="md:hidden"><EventDetail show="link" {...props} eventId={props.id} /></TableCell>
        <TableCell className="font-medium hidden md:table-cell">{props.name?.toUpperCase()}</TableCell>
        <TableCell className="font-medium hidden md:table-cell">{props.auction_house?.name}</TableCell>
        {!isAuctioneer && ( <TableCell className="font-medium hidden md:table-cell">{props.auction_house?.auctioneer?.name}</TableCell> )}
        <TableCell className="font-medium hidden md:table-cell">{getDate(props.event_date)}</TableCell>
        <TableCell className="font-medium hidden md:table-cell">{getTime(props.event_date)}</TableCell>
        <TableCell className="font-medium"> <Button variant="link" onClick={() => viewAuctionItemsOrContract(props)}> {isAuctioneer ? "Contract" : "View"} </Button></TableCell>
        <TableCell className=""><Countdown targetDate={props.event_date} eventId={props.id as number} /></TableCell>
      </TableRow>
    );
      })}
    </TableBody>
  );
};

export const EventSkeleton = ({ condition }: { condition: boolean }) => {
  return (
    <>
      <TableBody className={`${condition ? "bg-muted/20" : "hidden"}`}>
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-40 rounded-sm" />
              </TableCell>
              <TableCell className="font-medium hidden md:table-cell">
                <Skeleton className="h-4 w-80 rounded-sm" />
              </TableCell>
              <TableCell className="font-medium hidden md:table-cell">
                <Skeleton className="h-4 w-80 rounded-sm" />
              </TableCell>
              <TableCell className="font-medium hidden md:table-cell">
                <Skeleton className="h-4 w-40 rounded-sm" />
              </TableCell>
              <TableCell className="font-medium hidden md:table-cell">
                <Skeleton className="h-4 w-40 rounded-sm" />
              </TableCell>
              <TableCell className="md:hidden">
                <Skeleton className="h-4 w-32 rounded-sm" />
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-40 rounded-sm" />
              </TableCell>
              <TableCell className="flexcenter">
                <Button
                  disabled={true}
                  className="w-32 h-8 bg-green-500 animate-pulse"
                ></Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
