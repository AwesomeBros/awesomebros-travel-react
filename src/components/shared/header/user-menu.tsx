import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NO_IMG } from "@/lib/constants";
import { useLogout } from "@/lib/query";
import { usePostOpenStore } from "@/lib/stores";
import { useSessionStore } from "@/lib/stores/session";
import { Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const publicRoute = [
  {
    label: "로그인",
    href: "/login",
  },
  {
    label: "회원가입",
    href: "/register",
  },
];

const privateRoute = [
  {
    label: "마이페이지",
    href: "/mypage",
  },
  {
    label: "로그아웃",
    href: "#",
    logout: true,
  },
];

export default function UserMenu() {
  const { session } = useSessionStore();
  const { onOpen } = usePostOpenStore();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {session ? (
          <button
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => onOpen()}
          >
            글작성 하기
          </button>
        ) : (
          <button
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => navigate("/login")}
          >
            로그인 후 글작성 하기
          </button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <Menu className="cursor-pointer sm:ml-2" />

              {session ? (
                <div className="relative overflow-hidden size-[32px] rounded-full">
                  <img
                    src={session.url ? session.url ?? NO_IMG : NO_IMG}
                    alt={`Profile`}
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="p-0 sm:p-1.5">
                  <User className="size-5" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {session ? (
              <div className="flex flex-col">
                {privateRoute.map((item) => (
                  <DropdownMenuItem
                    onClick={() => {
                      navigate(item.href);
                      item.logout && logout();
                    }}
                    key={item.label}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {publicRoute.map((item) => (
                  <DropdownMenuItem
                    onClick={() => navigate(item.href)}
                    key={item.label}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
