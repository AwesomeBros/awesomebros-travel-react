import type { Post } from "@/lib/types";
import PostItem from "./post-item";

interface Props {
  posts: Post[];
}

export default function PostItemList({ posts }: Props) {
  return (
    <div className="w-full min-h-[639px] grid gap-6">
      {posts.length > 0 ? (
        posts.map((post: Post, index: number) => (
          <PostItem key={post.id} post={post} index={index} />
        ))
      ) : (
        <div className="w-full h-[639px] flex items-center justify-center">
          <p className="text-muted-foreground">후기가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
}
