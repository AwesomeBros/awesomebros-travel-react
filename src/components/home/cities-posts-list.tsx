import { CITIES } from "@/lib/constants";
import { useFindPostsByCities } from "@/lib/query";
import type { HomeCities, Post } from "@/lib/types";
import { useEffect, useState } from "react";
import PostItem from "../post/post-item";
import PostItemSkeleton from "../skeleton/post-item-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CitiesPostsList() {
  const [city, setCity] = useState<HomeCities>("서울");
  const { data: postsAll, isLoading } = useFindPostsByCities(city);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 756);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="text-black text-2xl font-medium mb-5">도시별 후기</div>
      {isDesktop ? (
        <Tabs value={city}>
          <TabsList className="w-full flex flex-wrap">
            {CITIES.map((city) => (
              <TabsTrigger
                value={city}
                onClick={() => setCity(city as HomeCities)}
                key={city}
              >
                {city}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={city}>
            <div className="w-full flex flex-col py-3 gap-6">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <PostItemSkeleton key={index} index={index} />
                ))
              ) : postsAll.length > 0 ? (
                postsAll.map((post: Post, index: number) => (
                  <PostItem key={post.id} post={post} index={index} />
                ))
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    후기가 존재하지 않습니다.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <Select
            value={city}
            onValueChange={(value) => setCity(value as HomeCities)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="도시 선택" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="w-full flex flex-col py-3 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <PostItemSkeleton key={index} index={index} />
              ))
            ) : postsAll.length > 0 ? (
              postsAll.map((post: Post, index: number) => (
                <PostItem key={post.id} post={post} index={index} />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  후기가 존재하지 않습니다.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
