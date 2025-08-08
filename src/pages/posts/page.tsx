import { findPostById } from "@/lib/api";
import type { Post } from "@/lib/types";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

export function PostRedirect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts_id = id ? Number(id) : undefined;

  useEffect(() => {
    async function fetchAndRedirect() {
      if (posts_id !== undefined) {
        const post: Post = await findPostById(posts_id);
        navigate(`/posts/${id}/${encodeURIComponent(post.slug)}`);
      }
    }
    fetchAndRedirect();
  }, [id, posts_id, navigate]);

  return null;
}
