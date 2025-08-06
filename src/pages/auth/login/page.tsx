import { LoginForm } from "@/components/auth/login-form";
import AuthLayout from "../layout";

export function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
