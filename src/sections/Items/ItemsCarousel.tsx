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
import { getMediaType } from "@/lib/utils";

export function ItemsCarousel({ images }: { images: string[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="flexcenter sm:mx-20"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((img, index) => {
            const mediaType = getMediaType(img);
            return (
              <CarouselItem key={index}>
                <div className="flex items-center justify-center">
                  <Card>
                    <CardContent className="w-auto h-[14rem] md:h-[20rem] flex items-center justify-center p-0">
                      {mediaType === "image" && (
                        <img
                          className="max-w-full max-h-full object-contain"
                          src={img}
                          alt=""
                        />
                      )}
                      {mediaType === "video" && (
                        <video
                          controls
                          className="gallery-video w-auto h-[14rem] md:h-[20rem] flex items-center justify-center p-0"
                        >
                          <source src={img} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
