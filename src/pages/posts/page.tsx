import PostsList from "@/components/post/posts-list";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFilterParams from "@/hooks/use-filter-params";
import { usePostTypeStore } from "@/lib/stores";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

export function Posts() {
  const params = useFilterParams();
  const { postType, setPostType } = usePostTypeStore();
  return (
    <div className="flex flex-col gap-8 mt-7 bg-white p-4 rounded-xl shadow-md px-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-medium">{"후기 목록"}</div>
          <div>
            <p className="text-muted-foreground text-sm">
              {"여행 후기를 작성하고 공유해보세요!"}
            </p>
          </div>
        </div>
        <Tabs value={postType}>
          <TabsList className="w-full">
            <TabsTrigger value="list" onClick={() => setPostType("list")}>
              <FaThList />
            </TabsTrigger>
            <TabsTrigger value="gallery" onClick={() => setPostType("gallery")}>
              <IoGrid />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <PostsList params={params} postType={postType} />
    </div>
  );
}
