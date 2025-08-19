import ProfileSection from "@/components/mypage/info/profile-section";
import UserButton from "@/components/mypage/info/user-button";

export function UserInfo() {
  return (
    <main className="max-w-5xl h-full mx-auto pt-20 px-4 flex items-center justify-center">
      <div className="my-auto w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between gap-4">
          <h1 className="text-3xl font-semibold">유저 정보</h1>
        </div>
        <ProfileSection />
        <UserButton />
      </div>
    </main>
  );
}
