import { NO_THUMBNAIL } from "@/lib/constants";
import { useSessionStore } from "@/lib/stores";
import type { Post } from "@/lib/types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountSection from "./count-section";
import LikeButton from "./like-button";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface Props {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: Props) {
  const { isAuthenticated } = useSessionStore();

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="hover:bg-[#00000005] rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className="relative aspect-[2/1.5] rounded-lg overflow-hidden">
        <Link
          to={`posts/${post.id}/${encodeURIComponent(post.slug)}`}
          key={post.id}
        >
          <img
            src={post.url ? post.url : NO_THUMBNAIL}
            alt="Board Image"
            className="size-full object-cover object-center"
          />
        </Link>
        {isAuthenticated && <LikeButton post={post} />}
      </div>
      <Link
        to={`posts/${post.id}/${encodeURIComponent(post.slug)}`}
        key={post.id}
      >
        <div className="p-2">
          <h2 className="text-lg font-bold mt-2 line-clamp-1 hover:underline">
            {post.title}
          </h2>

          <div
            className="text-muted-foreground text-sm line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/<img.*?\/?>/g, ""),
            }}
          />
          <div className="flex justify-between items-center mt-3">
            <CountSection post={post} />
            <p className="text-primary font-bold">{post?.district?.name}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
