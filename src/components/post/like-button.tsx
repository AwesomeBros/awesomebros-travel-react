import { useIsLiked, useToggleLike } from "@/lib/query";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/icon";

export default function LikeButton({ post }: { post: Post }) {
  const { mutate: toggleLike } = useToggleLike();
  const { data: isLiked } = useIsLiked(post.id);
  function toggleLikeHandler() {
    toggleLike(post.id);
  }

  return (
    <button
      className="absolute top-2 right-2 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={toggleLikeHandler}
    >
      <Icon.like
        className={cn({
          "size-6 stroke-2 stroke-white fill-[#00000080] like-drop-shadow":
            true,
          "fill-[#ff385c]": isLiked,
        })}
      />
    </button>
  );
}
