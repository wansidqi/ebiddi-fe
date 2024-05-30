import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ItemsCarousel({ images }: { images: string[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="flexcenter sm:mx-20"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {/*  {Array.from({ length: 5 }).map((_, index) => ())} */}
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-56 h-56 scale-[1.2] pt-4 sm:scale-[1.5] sm:pt-8 mx-auto">
              <Card>
                <CardContent className="flex items-center justify-center p-0">
                  <img className="w-full h-full " src={img} alt="" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
