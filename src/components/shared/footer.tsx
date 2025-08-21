import useFilterParams from "@/hooks/use-filter-params";
import {
  useFindLikedPostsByUserId,
  useFindPostsBySearch,
  useFindPostsByUserId,
} from "@/lib/query";
import { useSessionStore } from "@/lib/stores";
import { PaginationWithLinks } from "../ui/pagination-with-links";

export default function Footer() {
  const href = window.location.href;
  const params = useFilterParams();
  const { session } = useSessionStore();

  const { data: searchData, isLoading: isSearchLoading } =
    useFindPostsBySearch(params);

  const { data: userData, isLoading: isUserLoading } = useFindPostsByUserId(
    params.page,
    session?.id
  );

  const { data: likeData, isLoading: isLikeLoading } =
    useFindLikedPostsByUserId(params.page, session?.id);

  const paginationRoutes = ["/posts?", "/mypage/posts", "/mypage/likes"];
  const isPaginationRoute = paginationRoutes.some((route) =>
    href.includes(route)
  );

  let data, isLoading;
  if (href.includes("/mypage/posts")) {
    data = userData;
    isLoading = isUserLoading;
  } else if (href.includes("/posts?")) {
    data = searchData;
    isLoading = isSearchLoading;
  } else if (href.includes("/mypage/likes")) {
    data = likeData;
    isLoading = isLikeLoading;
  } else {
    data = null;
    isLoading = false;
  }

  if (isLoading || !data) return null;

  const totalCount = data.totalElements || 0;
  const page = data.page || 1;
  const size = data.size || 8;

  return (
    <footer className="bg-white h-16 px-2">
      <div className="size-full flex items-center justify-center border-b-gray-200 border-b">
        {isPaginationRoute ? (
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
