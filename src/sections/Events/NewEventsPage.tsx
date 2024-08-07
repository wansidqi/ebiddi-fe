import { Container } from "@/components/Container";
import { NewSingleEvent, EventDetail, Countdown } from "@/sections";
import { useAPIServices } from "@/services";
import { useStoreContext } from "@/Context";
import { ROLE } from "@/enum";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDate, getTime, roleRenderer } from "@/lib/utils";
import { EventsInterface } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function NewEventsPage() {
  const navigate = useNavigate();
  const { useGetAllEvents, useGetAuctioneerEvent } = useAPIServices();
  const { data, isLoading } = useGetAllEvents();
  const { data: eventAuct } = useGetAuctioneerEvent();
  const { USER } = useStoreContext();

  const [input, setInput] = useState("");
  const [eventList, setEventList] = useState(data);

  useEffect(() => {
    setEventList(data);
  }, [data]);

  useEffect(() => {
    let fitlered = data?.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setEventList(fitlered);
  }, [input]);

  const isAuctioneer = USER?.role === ROLE.AUCTIONEER;

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
    <Container className="text-center m-0 sm:m-0">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flexcenter-col gap-6 mt-10">
          <p className="text-2xl font-bold text-primary">AUCTIONS LIVE VIEW</p>
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="lg:flex items-center justify-between">
                {!isAuctioneer && (
                  <div className="relative ml-auto flex-1 md:grow-0 mt-4 lg:mt-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={(e) => setInput(e.target.value)}
                      type="search"
                      placeholder="Search by event name"
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                  </div>
                )}
              </div>
              <TabsContent value="all">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="bg-muted/20 w-[94vw] lg:w-full"
                >
                  <CardHeader>
                    <CardTitle>EVENTS</CardTitle>
                    <CardDescription>
                      <p>
                        List of auction events that you
                        {isAuctioneer ? " handle" : " can participate"}
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NewSingleEvent />

                    <Table className="">
                      <TableHeader className="bg-muted/80">
                        <TableRow className="">
                          {
                            /* prettier-ignore */
                            <>
                              <TableHead className="text-center">Event Name</TableHead>
                              <TableHead className="hidden md:table-cell text-center">Host By</TableHead>
                              <TableHead className="hidden md:table-cell text-center">Auctioneer</TableHead>
                              <TableHead className="hidden md:table-cell text-center">Date</TableHead>
                              <TableHead className="hidden md:table-cell text-center">Time</TableHead>
                              <TableHead className="md:hidden">Details</TableHead>
                              <TableHead className="text-center">Auction Items</TableHead>
                              <TableHead className="text-center">Actions</TableHead>
                            </>
                          }
                        </TableRow>
                      </TableHeader>

                      {!isAuctioneer && isLoading && (
                        <TableBody className="bg-muted/20">
                          {Array.from({ length: 5 }).map((_, i) => {
                            /* prettier-ignore */
                            return (
                                <TableRow key={i}>
                                  <TableCell className="font-medium"><Skeleton className="h-4 w-32 rounded-sm" /></TableCell>
                                  <TableCell className="font-medium hidden md:table-cell"><Skeleton className="h-4 w-32 rounded-sm" /></TableCell>
                                  <TableCell className="font-medium hidden md:table-cell"><Skeleton className="h-4 w-32 rounded-sm" /></TableCell>
                                  <TableCell className="font-medium hidden md:table-cell"><Skeleton className="h-4 w-32 rounded-sm" /></TableCell>
                                  <TableCell className="font-medium hidden md:table-cell"><Skeleton className="h-4 w-32 rounded-sm" /></TableCell>
                                  <TableCell className="md:hidden"><Skeleton className="h-4 w-32 rounded-sm" /></TableCell>
                                  <TableCell className="font-medium"><Skeleton className="h-4 w-32 rounded-sm" /></TableCell>
                                  <TableCell className="flexcenter"><Button  disabled={true} className="w-32 h-8 bg-green-500 animate-pulse"></Button></TableCell>
                                </TableRow>
                              );
                          })}
                        </TableBody>
                      )}

                      {!isAuctioneer && (
                        <TableBody className="bg-muted/20">
                          {eventList?.map((props, i) => {
                            /* prettier-ignore */
                            return (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{props.name?.toUpperCase()}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{props.auction_house?.name}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{props.auction_house?.auctioneer?.name}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{getDate(props.event_date)}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{getTime(props.event_date)}</TableCell>
                              <TableCell className="md:hidden"><EventDetail {...props} eventId={props.id} /></TableCell>
                              <TableCell className="font-medium"> <Button variant="link" onClick={() => viewAuctionItemsOrContract(props)}> View </Button></TableCell>
                              <TableCell className=""><Countdown targetDate={props.event_date} eventId={props.id as number} /></TableCell>
                            </TableRow>
                          );
                          })}
                        </TableBody>
                      )}

                      {isAuctioneer && (
                        <TableBody className="bg-muted/20">
                          {eventAuct?.map((props, i) => {
                            /* prettier-ignore */
                            return (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{props.name?.toUpperCase()}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{props.auction_house?.name}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{props.auction_house?.auctioneer?.name}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{getDate(props.event_date)}</TableCell>
                              <TableCell className="font-medium hidden md:table-cell">{getTime(props.event_date)}</TableCell>
                              <TableCell className="md:hidden"><EventDetail {...props} eventId={props.id} /></TableCell>
                              <TableCell className="font-medium"> <Button variant="link" onClick={() => viewAuctionItemsOrContract(props)}> Contract </Button></TableCell>
                              <TableCell className=""><Countdown targetDate={props.event_date} eventId={props.id as number} /></TableCell>
                            </TableRow>
                          );
                          })}
                        </TableBody>
                      )}
                    </Table>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Container>
  );
}
