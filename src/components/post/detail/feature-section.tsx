// import DetailLikeButton from "./detail-like-button";

import type { Post } from "@/lib/types";
import DetailMap from "./detail-map";

export default function FeatureSection({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-5">
      <div className=" md:relative md:flex-row flex flex-col-reverse gap-5">
        <div className="md:sticky md:top-30 z-10 md:max-w-2/6 h-80 w-full rounded-lg shadow-md">
          <DetailMap post={post} />
        </div>
        <div className="w-full flex flex-col gap-2.5">
          <div
            className="text-accent-foreground text-lg min-h-[200px] md:min-h-[500px]"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
          {/* <div className="flex md:hidden justify-center">
            <DetailLikeButton postId={post.id} />
          </div> */}
        </div>
      </div>
      {/* <div className="hidden md:flex justify-center">
        <DetailLikeButton postId={post.id} />
      </div> */}
    </div>
  );
}
