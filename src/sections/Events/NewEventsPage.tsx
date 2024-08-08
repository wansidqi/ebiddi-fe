import { Container } from "@/components/Container";
import {
  EventsPageCard,
  Term,
  EventSkeleton,
  EventTableContent,
  EventTableHeader,
} from "@/sections";
import { useAPIServices } from "@/services";
import { useStoreContext } from "@/Context";
import { ROLE } from "@/enum";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid2X2, List, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function NewEventsPage() {
  const { useGetAllEvents, useGetAuctioneerEvent } = useAPIServices();
  const { data, isLoading } = useGetAllEvents();
  const { data: eventAuct, isLoading: auctLoading } = useGetAuctioneerEvent();
  const { USER } = useStoreContext();

  const [input, setInput] = useState("");
  const [eventList, setEventList] = useState(data);

  const isAuctioneer = USER?.role === ROLE.AUCTIONEER;

  enum TabType {
    List = "List",
    Card = "Card",
  }

  useEffect(() => {
    if (!isAuctioneer) return;
    setEventList(eventAuct);
  }, [eventAuct]);

  useEffect(() => {
    if (isAuctioneer) return;
    setEventList(data);
  }, [data]);

  useEffect(() => {
    if (!isAuctioneer) {
      let fitlered = data?.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setEventList(fitlered);
    } else {
      let fitlered = eventAuct?.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setEventList(fitlered);
    }
  }, [input]);

  return (
    <Container className="text-center m-0 sm:m-0">
      <Term />
      <div className="flex min-h-screen w-full flex-col">
        <div className="flexcenter-col gap-6 mt-10">
          <p className="text-2xl xl:text-4xl font-bold text-primary">
            AUCTIONS LIVE VIEW
          </p>
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue={TabType.List}>
              {/*  */}
              <div className="lg:flex items-center justify-between my-6">
                <TabsList>
                  <TabsTrigger value={TabType.List}>
                    <List />
                  </TabsTrigger>
                  <TabsTrigger value={TabType.Card}>
                    <Grid2X2 />
                  </TabsTrigger>
                </TabsList>
                <div className="relative ml-auto flex-1 md:grow-0 mt-4 lg:mt-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    onChange={(e) => setInput(e.target.value)}
                    type="search"
                    placeholder="Search by event name"
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
              </div>

              <Card
                x-chunk="dashboard-06-chunk-0"
                className="bg-muted/20 w-[94vw] lg:w-full"
              >
                <CardHeader>
                  <CardTitle>
                    <p className="xl:text-3xl">EVENTS</p>
                  </CardTitle>
                  <CardDescription>
                    <p className="xl:text-xl">
                      List of auction events that you
                      {isAuctioneer ? " handle" : " can participate"}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value={TabType.Card}>
                    <EventsPageCard
                      data={eventList}
                      eventAuct={eventAuct}
                      isLoading={isLoading}
                      auctLoading={auctLoading}
                    />
                  </TabsContent>
                  <TabsContent value={TabType.List}>
                    <Table className="">
                      <EventTableHeader isAuctioneer={isAuctioneer} />

                      <EventSkeleton condition={!isAuctioneer && isLoading} />
                      <EventSkeleton condition={isAuctioneer && auctLoading} />

                      <EventTableContent
                        event={eventList}
                        isAuctioneer={!isAuctioneer}
                      />
                    </Table>
                  </TabsContent>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </Tabs>
          </main>
        </div>
      </div>
    </Container>
  );
}
