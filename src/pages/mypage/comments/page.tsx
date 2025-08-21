import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import useFilterParams from "@/hooks/use-filter-params";
import { NO_IMG } from "@/lib/constants";
import { useFindCommentsByUserId } from "@/lib/query";
import { useSessionStore } from "@/lib/stores";
import type { Comment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { BiChevronRight } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

export function MyComments() {
  // const deleteComment = useDeleteComment();
  // const { onOpen } = useCommentEditOpenStore();
  const { session } = useSessionStore();
  const params = useFilterParams();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  const { data, isError } = useFindCommentsByUserId(params.page, session?.id);

  const comments: Comment[] = data || [];

  console.log("댓글 목록 ", comments);

  if (isError) {
    return (
      <div className="w-full h-30 flex justify-center items-center">
        <p className="text-red-500">
          내 게시글 목록을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  const handleDelete = async (comments_id: number) => {
    const ok = await confirm();
    if (ok) {
      // deleteComment.mutate(commentId);
      console.log(`${comments_id} 댓글 삭제 완료`);
    }
  };
  return (
    <div className="w-full mx-auto max-w-7xl px-4 md:px-0">
      <ConfirmDialog />
      <div className="my-10 w-full bg-white p-6 rounded-lg shadow-md px-4">
        <h1 className="mb-10 text-lg md:text-2xl font-semibold">나의 댓글</h1>
        {/* <PostSearchFilter /> */}
        <div className="mt-12 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {comments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-2 p-4 hover:shadow-md rounded-lg cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex gap-2 items-center">
                <div className="relative overflow-hidden size-[48px] rounded-full shadow">
                  <img
                    src={comment.url ? comment.url : NO_IMG}
                    alt={`Profile`}
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h1 className="font-semibold">
                    {comment?.nickname || "알수없음"}
                  </h1>
                  <div className="text-gray-500 text-xs">
                    {formatDistanceToNow(comment?.created_at, { locale: ko }) +
                      " 전"}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="max-w-lg text-gray-600">{comment.content}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full">
                      <BsThreeDotsVertical />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => {}}>수정</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(comment.id)}>
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <button
                onClick={() => {}}
                type="button"
                className="underline flex gap-1 items-center justify-start hover:text-gray-500 cursor-pointer font-semibold"
              >
                게시글 보기 <BiChevronRight className="text-xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
