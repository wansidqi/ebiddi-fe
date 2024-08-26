import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

function getNestedProperty<T>(obj: T, path: string | string[]): any {
  if (typeof path === "string") {
    path = path.split(".");
  }

  return path.reduce((acc, key) => {
    return acc && typeof acc === "object" ? (acc as any)[key] : undefined;
  }, obj);
}

export function SearchFilter<T>(data: T[] | undefined, filterPath?: string[]) {
  const [dataList, setDataList] = useState(data);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setDataList(data);
  }, [data]);

  const filteration = () => {
    if (filterPath && filterPath.length > 0) {
      const lowercasedInput = input.toLowerCase();
      const filteredData = data?.filter((item) =>
        filterPath.some((path) => {
          const value = getNestedProperty(item, path)?.toString()?.toLowerCase();
          return value?.includes(lowercasedInput);
        })
      );
      return filteredData;
    }
    return data;
  };

  useEffect(() => {
    setDataList(filteration());
  }, [input]);

  const SearchFilterUI = (
    <div className="relative ml-auto flex-1 md:grow-0 mt-4 lg:mt-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e) => setInput(e.target.value)}
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );

  return { SearchFilterUI, dataList };
}
