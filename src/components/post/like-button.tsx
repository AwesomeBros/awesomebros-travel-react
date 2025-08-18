import { useIsLiked, useToggleLike } from "@/lib/query";
import { useSessionStore } from "@/lib/stores";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Icon } from "../ui/icon";

export default function LikeButton({ post }: { post: Post }) {
  const { session } = useSessionStore();
  const toggleLike = useToggleLike(post.id);
  const { data: isLiked } = useIsLiked(post.id);
  console.log("session", session);
  const navigate = useNavigate();
  function toggleLikeHandler() {
    if (!session) {
      toast.error("로그인이 필요한 서비스입니다.");
      navigate("/login");
    } else {
      toggleLike.mutate();
    }
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
