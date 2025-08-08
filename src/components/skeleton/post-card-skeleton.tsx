import { Skeleton } from "../ui/skeleton";

interface Props {
  index?: number;
}

export default function PostCardSkeleton({ index = 0 }: Props) {
  return (
    <div className="hover:bg-[#00000005] rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="relative aspect-[2/1.5] rounded-lg overflow-hidden">
        <Skeleton className="size-full" />
      </div>

      <div className="p-2">
        <div className="mt-2">
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="mt-2">
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>

          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
