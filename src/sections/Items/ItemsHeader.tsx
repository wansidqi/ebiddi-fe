import { useStoreContext } from "@/Context";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAPIServices } from "@/services";
import { List, Grid3X3 } from "lucide-react";
import { useParams } from "react-router-dom";

export function ItemsHeader() {
  const { eventId } = useParams();
  const { useGetEventById } = useAPIServices();
  const { data } = useGetEventById(eventId as string);
  console.log(data?.downloadable.url);

  const { auction } = useStoreContext();
  const { setView, view } = auction;

  const buttons = [
    {
      name: "List",
      icon: <List />,
      callback: () => {
        setView("List");
      },
    },
    {
      name: "Grid",
      icon: <Grid3X3 />,
      callback: () => {
        setView("Grid");
      },
    },
  ];

  return (
    <Container className="p-2 flex gap-3 justify-end py-8">
      {data?.downloadable.url && (
        <button className="bg-yellow-500 px-3 sm:px-6 py-2 rounded-md text-black mr-5 sm:mr-10">
          <a target="_blank" href={`/${data?.downloadable.url as string}`}>
            Download List
          </a>
        </button>
      )}
      {buttons.map((button) => (
        <TooltipProvider key={button.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={button.callback}
                variant={view === button.name ? "default" : "secondary"}
              >
                {button.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.name} View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </Container>
  );
}
