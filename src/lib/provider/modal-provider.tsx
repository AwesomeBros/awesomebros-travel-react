import AuthDialog from "@/components/auth/auth-dialog";
import UserEditDialog from "@/components/mypage/info/user-edit-dialog";
import UserPasswordChangeDialog from "@/components/mypage/info/user-password-change-dialog";
import ShareDialog from "@/components/post/detail/share-dialog";
import PostWriteDialog from "@/components/post/form/post-write-dialog";

export default function ModalProvider() {
  return (
    <>
      <PostWriteDialog />
      <ShareDialog />
      <UserEditDialog />
      <UserPasswordChangeDialog />
      <AuthDialog />
    </>
  );
}
