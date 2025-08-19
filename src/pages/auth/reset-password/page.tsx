import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Loader } from "@/components/shared/loader";
import { useVerifyToken } from "@/lib/query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isValidating, setIsValidating] = useState(true);

  const { data: email, isError, error, isLoading } = useVerifyToken(token);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      setIsValidating(false);
      return;
    }

    if (isError && error instanceof Error) {
      toast.error(error.message);
      navigate("/", { replace: true });
      setIsValidating(false);
      return;
    }

    if (!isLoading) {
      setIsValidating(false);
    }
  }, [token, isError, error, isLoading, navigate]);

  if (isValidating || isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-161px)] flex-col items-center justify-center">
        <Loader />
      </main>
    );
  }

  if (!token || isError) {
    return null;
  }
  return (
    <main className="flex min-h-[calc(100vh-161px)] flex-col items-center justify-center gap-6 px-6 md:px-10">
      <div className="flex w-full justify-center max-w-sm flex-col gap-6">
        <ResetPasswordForm token={token} email={email} />
      </div>
    </main>
  );
}
