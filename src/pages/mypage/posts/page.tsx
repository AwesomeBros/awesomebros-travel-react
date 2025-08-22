import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import useFilterParams from "@/hooks/use-filter-params";
import { useFindPostsByUserId } from "@/lib/query";
import { usePostEditOpenStore, useSessionStore } from "@/lib/stores";
import type { Post } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

export function MyPosts() {
  const { session } = useSessionStore();
  const params = useFilterParams();
  const { onOpen } = usePostEditOpenStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  // const deletePost = useDeletePost();

  const { data, isError } = useFindPostsByUserId(params.page, session?.id);
  const posts: Post[] = data?.content || [];

  if (isError) {
    return (
      <div className="w-full h-30 flex justify-center items-center">
        <p className="text-red-500">
          내 게시글 목록을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  const handleDelete = async (posts_id: number) => {
    const ok = await confirm();
    if (ok) {
      // deletePost.mutate(posts_id);
      console.log(`${posts_id} 게시글 삭제완료`);
    }
  };

  return (
    <div className="w-full mx-auto max-w-7xl px-4 md:px-0">
      <ConfirmDialog />
      <div className="mt-10 w-full bg-white p-6 rounded-lg shadow-md px-4">
        <h1 className="mb-10 text-lg md:text-2xl font-semibold">나의 게시글</h1>
        {/* <PostSearchFilter /> */}
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
            {posts.map((post: Post, index: number) => (
              <tr
                className={`bg-white ${
                  index !== posts.length - 1 && "border-b"
                } hover:bg-gray-50`}
                key={post.id}
              >
                <td className="px-6 py-4">
                  <Link to={`/posts/${post.id}`} className="hover:underline">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <td className="px-6 py-4 min-w-[80px]">
                      <button className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full">
                        <BsThreeDotsVertical />
                      </button>
                    </td>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onOpen(post.id)}>
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(post.id)}>
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
