import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCoordinate } from "@/lib/api";
import type { Place } from "@/lib/types";
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";

export default function LocationSearch({
  setSelectPositions,
}: {
  setSelectPositions: Dispatch<SetStateAction<Place[]>>;
}) {
  const [listPlace, setListPlace] = useState<Place[]>([]);

  const debounce = (func: (value: string) => void, delay: number) => {
    let timerId: NodeJS.Timeout;
    return function (...args: [string]) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  async function handleDebounceSearch(value: string) {
    if (!value) {
      setListPlace([]);
      return;
    }
    const response = await getCoordinate(value);
    setListPlace(response.features || []);
  }

  const debouncedSearch = debounce(handleDebounceSearch, 500);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  async function handleAddress(item: Place) {
    setSelectPositions((items) => {
      if (
        items.some(
          (i) =>
            i.properties.geocoding.place_id ===
            item.properties.geocoding.place_id
        )
      ) {
        toast.error("이미 선택된 장소입니다.");
        return items;
      }
      const newItems = [...items, item];
      if (newItems.length > 3) {
        toast.error("방문장소는 최대 3개까지 선택할 수 있습니다.");
        return items;
      }
      return newItems;
    });
    setListPlace([]);
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4">
      <p className="text-sm text-black font-medium mb-1.5">
        방문장소 검색{" "}
        <span className="text-xs text-muted-foreground">(최대 3개 가능)</span>
      </p>
      <Input
        className="w-full"
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
      <div>
        <ScrollArea className="w-full h-[450px] mt-2">
          <ul className=" rounded-lg shadow">
            {listPlace.map((item, index) => {
              return (
                <div key={index}>
                  <li
                    className="border p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      handleAddress(item);
                    }}
                  >
                    <p>{item?.properties.geocoding.label} </p>
                  </li>
                </div>
              );
            })}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
}
