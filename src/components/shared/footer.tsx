import useFilterParams from "@/hooks/use-filter-params";
import { useFindPostsBySearch } from "@/lib/query";
import { PaginationWithLinks } from "../ui/pagination-with-links";

export default function Footer() {
  const href = window.location.href;
  const params = useFilterParams();
  const { data, isLoading } = useFindPostsBySearch(params);
  if (isLoading) return null;
  const totalCount = data.totalElements || 0;
  const page = data.page || 1;
  const size = data.size || 8;

  return (
    <footer className="bg-white h-16 px-2">
      <div className="size-full flex items-center justify-center border-b-gray-200 border-b">
        {href.includes("/posts?") && params ? (
          totalCount > 0 && (
            <PaginationWithLinks
              page={page}
              take={size}
              totalCount={totalCount}
            />
          )
        ) : (
          <p className="text-sm text-gray-800 sm:text-center">
            © 2025 <span className="hover:underline">awesomeBros.</span> All
            Rights Reserved.
          </p>
        )}
      </div>
    </footer>
    // <footer className="w-full h-16 border">
    //   <div>ddd</div>

    // </footer>
  );
}
