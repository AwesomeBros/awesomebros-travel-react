import { useFindPostsBySearch } from "@/lib/query";
import type { PostFilterParams } from "@/lib/types";
import { Loader } from "../shared/loader";
import PostCardList from "./post-card-list";
import PostItemList from "./post-item-list";

interface Props {
  params: PostFilterParams;
  postType: "list" | "gallery";
}

export default function PostsList({ params, postType }: Props) {
  const { data, isLoading } = useFindPostsBySearch(params);

  if (isLoading) {
    return (
      <div className="w-full min-h-[639px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const posts = data.content || [];
  return (
    <div>
      {postType === "list" ? (
        <PostItemList posts={posts} />
      ) : (
        <PostCardList posts={posts} />
      )}
    </div>
  );
}
