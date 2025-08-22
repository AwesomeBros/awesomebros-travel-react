import { useConfirm } from "@/hooks/use-confirm";
import { useLogout } from "@/lib/query";
import { usePostOpenStore } from "@/lib/stores";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  item: {
    href: string;
    icon: ReactNode;
    title: string;
    description: string;
  };
}

export default function MypageItem({ item }: Props) {
  const { onOpen } = usePostOpenStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 로그아웃 하시겠습니까?",
    ""
  );
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const handleClick = async (e: React.MouseEvent) => {
    if (item.title === "게시글 작성") {
      e.preventDefault();
      onOpen();
    } else if (item.title === "로그아웃") {
      e.preventDefault();
      const ok = await confirm();
      if (ok) {
        logout();
        navigate("/");
      }
    }
  };
  return (
    <>
      <ConfirmDialog />
      <Link
        to={item.href}
        className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
        onClick={handleClick}
      >
        {item.icon}
        <div>
          <h1 className="font-semibold">{item.title}</h1>
          <h2 className="text-sm text-gray-500">{item.description}</h2>
        </div>
      </Link>
    </>
  );
}
