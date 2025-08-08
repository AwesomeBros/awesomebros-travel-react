import { NO_IMG, NO_THUMBNAIL } from "@/lib/constants";
import type { Post } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountSection from "./count-section";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function PostItem({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
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
    >
      <Link
        to={`/posts/${post.id}/${encodeURIComponent(post.slug)}`}
        className="relative p-4 bg-white flex items-center md:gap-[30px] cursor-pointer hover:bg-[#00000005] rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="relative size-8 rounded-full overflow-hidden shadow-md">
              <img
                src={post.users?.url || NO_IMG}
                alt="profile"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[#000000b3] text-xs font-medium leading-[140%]">
                {post.users?.nickname}
              </div>
              <div className="text-[#00000066] text-xs font-normal leading-[140%]">
                {formatDistanceToNow(post.created_at, { locale: ko })} 전
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-md font-medium leading-[140%]">
              {post.title}
            </div>
            <div
              className="text-xs font-medium leading-[140%] line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/<img.*?\/?>/g, ""),
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <CountSection post={post} />
            <p className="text-end text-primary font-bold">
              {post.district?.name}
            </p>
          </div>
        </div>
        <div className="hidden md:block relative w-[180px] h-[130px] overflow-hidden">
          <img
            src={post.url ? post.url : NO_THUMBNAIL}
            alt="Board Image"
            className="rounded-[10px] object-cover object-center"
          />
          {/* <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <LikeButton post={post} />
          </div> */}
        </div>
        {/* <div
          className="md:hidden"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <LikeButton post={post} />
        </div> */}
      </Link>
    </motion.div>
  );
}
