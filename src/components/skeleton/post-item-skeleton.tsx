import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  index?: number;
}

export default function PostItemSkeleton({ index = 0 }: Props) {
  return (
    <div className="relative p-4 bg-white flex items-center md:gap-[30px] cursor-pointer hover:bg-[#00000005] rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />

          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-3/4" />

          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>

          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="hidden md:block relative w-[180px] h-[130px] overflow-hidden">
        <Skeleton className="w-full h-full rounded-[10px]" />
      </div>
    </div>
  );
}
