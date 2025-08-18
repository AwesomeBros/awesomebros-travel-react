import type { Comment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function CommentItem({
  comment,
  index,
}: {
  comment: Comment;
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
      className="flex flex-col gap-2 w-full min-h-[150px] shadow rounded-lg p-5"
    >
      <div>
        <div className="flex gap-2 items-center">
          <div className="relative overflow-hidden size-[48px] rounded-full shadow">
            <img
              src={comment.url ? comment.url : "/images/noProfileImage.jpg"}
              alt={`Profile`}
              className="object-cover object-center"
            />
          </div>
          <div>
            <h1 className="font-semibold">{comment.nickname || "-"}</h1>
            <div className="text-gray-500 text-xs">
              {comment?.created_at
                ? formatDistanceToNow(comment.created_at, { locale: ko }) +
                  " 전"
                : "-"}
            </div>
          </div>
        </div>
        <div className="max-w-md mt-2 text-gray-600">{comment?.content}</div>
      </div>
    </motion.div>
  );
}
