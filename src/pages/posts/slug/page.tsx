import CommentSection from "@/components/post/detail/comment-section";
import FeatureSection from "@/components/post/detail/feature-section";
import HeaderSection from "@/components/post/detail/header-section";
import { useFindPostById } from "@/lib/query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function PostDetails() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const posts_id = id ? Number(id) : undefined;
  const { data: post, isLoading, isError, error } = useFindPostById(posts_id);

  useEffect(() => {
    if (post && slug !== encodeURIComponent(post.slug)) {
      const targetURL = `/posts/${posts_id}/${encodeURIComponent(post.slug)}`;
      navigate(targetURL, { replace: true });
    }
  }, [post, slug, posts_id, navigate]);

  if (isError) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
  if(isLoading) return null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-5 p-4 rounded-xl shadow-md bg-white mb-2.5">

            <HeaderSection post={post} />
            <FeatureSection post={post} />
      </div>
      <CommentSection post={post} />
    </div>
  );
}
