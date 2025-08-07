import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/lib/stores";
import { SearchIcon } from "lucide-react";
import type { ChangeEvent } from "react";

export default function PostSearchFilter() {
  const { setQ } = useSearchStore();

  const debounce = (func: (value: string) => void, delay: number) => {
    let timerId: NodeJS.Timeout;
    return function (...args: [string]) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  function handleDebounceSearch(value: string) {
    setQ(value);
  }
  const debouncedSearch = debounce(handleDebounceSearch, 1000);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex items-center justify-center w-full gap-2">
        <Input
          type="search"
          onChange={handleInputChange}
          placeholder={"검색어를 입력하세요."}
        />
        <SearchIcon className="size-6" />
      </div>
    </div>
  );
}
