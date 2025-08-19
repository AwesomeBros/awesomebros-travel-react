import { NO_IMG } from "@/lib/constants";
import { useGetProfile } from "@/lib/query";
import type { Session } from "@/lib/types";

export default function ProfileSection() {
  const { data } = useGetProfile();
  const session: Session = data;

  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-10 mb-28">
      <div className="flex justify-center items-center">
        <div className="relative overflow-hidden size-[150px] rounded-full shadow">
          <img
            src={session.url || NO_IMG}
            alt={`Profile`}
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
        <h1 className="font-semibold">닉네임</h1>
        <div className="text-gray-500 text-sm">{session.nickname}</div>
      </div>
      <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
        <h1 className="font-semibold">이메일</h1>
        <div className="text-gray-500 text-sm">{session.email}</div>
      </div>
      <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
        <h1 className="font-semibold">계정 유형</h1>
        <div className="text-gray-500 text-sm">{session.provider ?? "-"}</div>
      </div>
    </div>
  );
}
