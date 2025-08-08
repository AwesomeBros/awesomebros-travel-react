import { Loader } from "@/components/ui/loader";
import { useFindCommentsByPostsId } from "@/lib/query";
import type { Comment } from "@/lib/types";
import CommentItem from "./comment-item";

interface Props {
  posts_id?: number;
}

export default function CommentList({ posts_id }: Props) {
  const { data: comments, isLoading } = useFindCommentsByPostsId(posts_id);
  return (
    <>
      <div className="mt-8 grid md:grid-cols-2 gap-12 min-h-10">
        {isLoading ? (
          <div className="flex items-center justify-center md:col-span-2 h-10">
            <Loader />
          </div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment: Comment, index: number) => (
            <CommentItem key={comment.id} comment={comment} index={index} />
          ))
        ) : (
          <p className="text-center md:col-span-2 text-muted-foreground">
            작성된 댓글이 없습니다.
          </p>
        )}
      </div>
    </>
  );
}
