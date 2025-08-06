import { RegisterForm } from "@/components/auth/register-form";
import AuthLayout from "../layout";

export function Register() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
