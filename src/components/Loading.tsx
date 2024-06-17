import { LoaderCircle } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flexcenter h-screen">
      <LoaderCircle size={"100px"} className="animate-spin" />
    </div>
  );
}

export function LoadingComponent() {
  return (
    <div className="flexcenter h-screen">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
