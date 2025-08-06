import { useGetMe } from "@/lib/query";
import { useSessionStore } from "@/lib/stores";

export function Home() {
  const { data: user } = useGetMe();
  const { session } = useSessionStore();
  console.log("session", session);
  console.log("user", user);
  return <div>Home</div>;
}
