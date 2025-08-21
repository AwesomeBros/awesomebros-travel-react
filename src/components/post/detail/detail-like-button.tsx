import { Icon } from "@/components/ui/icon";
import { useIsLiked, useToggleLike } from "@/lib/query";
import { useSessionStore } from "@/lib/stores";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DetailLikeButton({ post }: { post: Post }) {
  const { session } = useSessionStore();

  const { mutate: toggleLike } = useToggleLike();
  const { data: isLiked } = useIsLiked(post.id);
  const navigate = useNavigate();

  function toggleLikeHandler() {
    if (!session) {
      toast.error("로그인이 필요한 서비스입니다.");
      navigate("/login");
    } else {
      toggleLike(post.id);
    }
  }

  return (
    <button
      className={cn(
        "group border px-4 py-2.5 flex h-full w-fit items-center gap-2 text-lg rounded-xl hover:border-primary cursor-pointer",
        {
          "border-primary": isLiked,
        }
      )}
      onClick={toggleLikeHandler}
    >
      <Icon.like
        className={cn({
          "size-6 stroke-2 stroke-white fill-[#00000080] like-drop-shadow group-hover:fill-[#ff385c]":
            true,
          "fill-[#ff385c]": isLiked,
        })}
      />{" "}
      좋아요
    </button>
  );
}
