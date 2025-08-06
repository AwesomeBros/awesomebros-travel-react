import { useSessionStore } from "@/lib/stores";
import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSessionStore();
  if (session) {
    return <Navigate to="/" replace />;
  }
  return (
    <main className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center gap-6 px-6 md:px-10">
      <div className="flex w-full justify-center max-w-sm flex-col gap-6">
        {children}
      </div>
    </main>
  );
}
