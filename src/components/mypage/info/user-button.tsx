import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteUser, useLogout } from "@/lib/query";
import {
  useUserEditOpenStore,
  useUserPasswordChangeDialogStore,
} from "@/lib/stores";

export default function UserButton() {
  const { onOpen: userEditOpen } = useUserEditOpenStore();
  const { onOpen: userPasswordChangeOpen } = useUserPasswordChangeDialogStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 탈퇴하시겠습니까?",
    "삭제된 유저는 복구할 수 없습니다."
  );
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: logout } = useLogout();

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteUser();
      await logout();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <ConfirmDialog />
      <div className="flex gap-4">
        <Button onClick={userEditOpen}>유저정보 수정</Button>
        <Button onClick={userPasswordChangeOpen}>비밀번호 변경</Button>
      </div>
      <div>
        <Button variant={"destructive"} onClick={() => handleDelete()}>
          탈퇴
        </Button>
      </div>
    </div>
  );
}
