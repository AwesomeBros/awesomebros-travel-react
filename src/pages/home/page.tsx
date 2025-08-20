import CitiesPostsList from "@/components/home/cities-posts-list";
import PopularLatestPostsList from "@/components/home/popular-latest-posts-list";

export function Home() {
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl shadow-md px-8">
      <PopularLatestPostsList />
      <CitiesPostsList />
    </div>
  );
}
