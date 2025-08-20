import type { Post } from "@/lib/types";
import PostCard from "./post-card";

interface Props {
  posts: Post[];
}

export default function PostCardList({ posts }: Props) {
  return (
    <div className="w-full min-h-[639px] grid grid-cols-1 md:grid-cols-4 gap-6">
      {posts.length > 0 ? (
        posts.map((post: Post, index: number) => (
          <PostCard key={post.id} post={post} index={index} />
        ))
      ) : (
        <div className="w-full h-[639px] flex items-center justify-center">
          <p className="text-muted-foreground">후기가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
}
