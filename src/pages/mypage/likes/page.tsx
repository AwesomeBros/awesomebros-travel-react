import PostSearchFilter from "@/components/post/form/post-search-filter";
import { useConfirm } from "@/hooks/use-confirm";
import useFilterParams from "@/hooks/use-filter-params";
import { useFindLikedPostsByUserId, useToggleLike } from "@/lib/query";
import { useSessionStore } from "@/lib/stores";
import type { Post } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { HeartOffIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function MyLikedPosts() {
  const { session } = useSessionStore();
  const { mutate: toggleLike } = useToggleLike();
  const params = useFilterParams();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 좋아요 취소하시겠습니까?",
    ""
  );
  const { data, isError } = useFindLikedPostsByUserId(params.page, session?.id);
  const posts: Post[] = data || [];

  console.log("좋아요 목록 ", posts);

  if (isError) {
    return (
      <div className="w-full h-30 flex justify-center items-center">
        <p className="text-red-500">
          내 게시글 목록을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  const toggleLikeHandler = async (posts_id: number) => {
    const ok = await confirm();
    if (ok) {
      await toggleLike(posts_id);
    }
  };

  return (
    <div className="w-full mx-auto max-w-7xl px-4 md:px-0">
      <ConfirmDialog />
      <div className="mt-10 mb-40 w-full bg-white p-6 rounded-lg shadow-md px-4">
        <h1 className="mb-10 text-lg md:text-2xl font-semibold">나의 좋아요</h1>
        <PostSearchFilter />
        <table className="w-full text-sm text-left text-muted-foreground">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 min-w-[250px] md:min-w-[300px]"
              >
                제목
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-3 min-w-[100px]"
              >
                지역
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-3 min-w-[100px]"
              >
                등록일
              </th>
              <th scope="col" className="px-6 py-3 min-w-[80px]"></th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post: Post, index: number) => (
                <tr
                  className={`bg-white ${
                    index !== posts.length - 1 && "border-b"
                  } hover:bg-gray-50`}
                  key={post.id}
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/posts/${post.id}/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4">
                    {post.district?.name ?? "지역 정보 없음"}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4">
                    {post.created_at
                      ? formatDistanceToNow(post.created_at, { locale: ko }) +
                        " 전"
                      : "날짜 정보 없음"}
                  </td>

                  <td className="px-6 py-4 min-w-[80px]">
                    <button
                      className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full"
                      onClick={() => toggleLikeHandler(post.id)}
                    >
                      <HeartOffIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  좋아요한 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
