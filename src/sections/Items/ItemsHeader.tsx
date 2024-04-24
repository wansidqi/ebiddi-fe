import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuctionStore } from "@/store";
import { List, Grid3X3 } from "lucide-react";

export function ItemsHeader() {
  const { auctions: items, setAuctionState: setItemsState } = useAuctionStore();

  const buttons = [
    {
      name: "List",
      icon: <List />,
      callback: () => {
        setItemsState({ ...items, view: "List" });
      },
    },
    {
      name: "Grid",
      icon: <Grid3X3 />,
      callback: () => {
        setItemsState({ ...items, view: "Grid" });
      },
    },
  ];

  return (
    <Container className="p-2 flex gap-3 justify-end py-8">
      <button className="bg-yellow-500 px-3 sm:px-6 py-2 rounded-md text-black mr-5 sm:mr-10">
        Download List
      </button>
      {buttons.map((button) => (
        <TooltipProvider key={button.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={button.callback}
                variant={items.view === button.name ? "default" : "secondary"}
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
