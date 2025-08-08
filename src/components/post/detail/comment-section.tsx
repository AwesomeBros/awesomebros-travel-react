import { useCreateComment } from "@/lib/query";
import { useSessionStore } from "@/lib/stores";
import type { Post } from "@/lib/types";
import type { CommentFormSchema } from "@/lib/validations";
import type z from "zod/v3";
import CommentList from "../../comment/comment-list";
import CommentForm from "../../comment/form/comment-form";

interface Props {
  post: Post;
}

export default function CommentSection({ post }: Props) {
  const { isAuthenticated } = useSessionStore();
  const createComment = useCreateComment(post.id);
  const defaultValues: z.infer<typeof CommentFormSchema> = {
    content: "",
  };
  const onSubmit = (values: z.infer<typeof CommentFormSchema>) => {
    createComment.mutate(values);
  };

  return (
    <div className="flex flex-col p-4 rounded-xl shadow-md bg-white">
      <h1 className="font-semibold text-xl mb-2">댓글</h1>
      {isAuthenticated && (
        <CommentForm
          onSubmit={onSubmit}
          disabled={createComment.isPending}
          defaultValues={defaultValues}
        />
      )}
      <CommentList posts_id={post.id} />
    </div>
  );
}
