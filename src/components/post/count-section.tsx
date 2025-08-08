import { useFindCountsByPostsId } from "@/lib/query";
import type { Post } from "@/lib/types";
import { EyeIcon, HeartIcon, MessageCircleMoreIcon } from "lucide-react";

export default function CountSection({ post }: { post: Post }) {
  const { data: count, isLoading } = useFindCountsByPostsId(post.id);
  // console.log("CountSection post:", count);

  if (isLoading) return null;

  return (
    <div className="text-md font-medium text-muted-foreground flex items-center gap-3">
      <p className="flex items-center gap-1">
        <MessageCircleMoreIcon className="size-4" /> {count.comment_count}
      </p>
      <p className="flex items-center gap-1">
        <HeartIcon className="size-4" /> {count.like_count}
      </p>
      <p className="flex items-center gap-1">
        <EyeIcon className="size-4" /> {count.view_count}
      </p>
    </div>
  );
}
