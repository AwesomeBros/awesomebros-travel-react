import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthOpenStore } from "@/lib/stores";
import EmailForm from "./email-form";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export default function AuthDialog() {
  const { isOpen, onClose, type } = useAuthOpenStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            {type === "login"
              ? "로그인"
              : type === "register"
              ? "회원가입"
              : "비밀번호 찾기"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-10">
          {type === "login" ? (
            <LoginForm />
          ) : type === "register" ? (
            <RegisterForm />
          ) : (
            <EmailForm />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
