// components/LoadingScreen.tsx
"use client";

import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">Checking authentication...</p>
      </div>
    </div>
  );
}
