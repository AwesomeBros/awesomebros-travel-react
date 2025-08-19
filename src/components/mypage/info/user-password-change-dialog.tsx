import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChangePassword } from "@/lib/query";
import { useUserPasswordChangeDialogStore } from "@/lib/stores";
import type { PasswordChangeFormSchema } from "@/lib/validations";
import type z from "zod/v3";
import PasswordChangeForm from "./form/password-change-form";

export default function UserPasswordChangeDialog() {
  const { isOpen, onClose } = useUserPasswordChangeDialogStore();
  const { mutate: changePassword } = useChangePassword();

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  function onSubmit(values: z.infer<typeof PasswordChangeFormSchema>) {
    changePassword(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            비밀번호 변경
          </DialogTitle>
        </DialogHeader>
        <div>
          <PasswordChangeForm
            onSubmit={onSubmit}
            onClose={onClose}
            defaultValues={defaultValues}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
