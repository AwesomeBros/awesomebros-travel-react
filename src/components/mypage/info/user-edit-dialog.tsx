import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetProfile, useUpdateUser } from "@/lib/query";
import { useSessionStore, useUserEditOpenStore } from "@/lib/stores";
import type { Session } from "@/lib/types";
import type { UserFormSchema } from "@/lib/validations";
import type z from "zod/v3";
import UserForm from "./form/user-form";

export default function UserEditDialog() {
  const { isOpen, onClose } = useUserEditOpenStore();
  const { data: user, isLoading } = useGetProfile();
  const { mutate: updateUser } = useUpdateUser();
  const { setSession } = useSessionStore();

  if (isLoading || !user) return null;

  const defaultValues = {
    nickname: user.nickname,
    url: user.url || "",
    email: user.email,
  };

  function onSubmit(values: z.infer<typeof UserFormSchema>) {
    updateUser(values, {
      onSuccess: async (data: Session) => {
        setSession(data);
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            유저정보 수정
          </DialogTitle>
        </DialogHeader>
        <div>
          <UserForm
            onSubmit={onSubmit}
            onClose={onClose}
            defaultValues={defaultValues}
            user={user}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
