"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export default function AuthListenerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initAuthListener } = useAuth();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  return <>{children}</>;
}
