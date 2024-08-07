import { cn } from "@/lib/utils";
import { Navigation } from "@/sections";
import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <>
      <Navigation />
      <div className={cn("my-5 mx-4 sm:mx-10", className)}>{children}</div>
      {/* <div className={`my-5 mx-4 sm:mx-10  ${className}`}>{children}</div> */}
    </>
  );
};
