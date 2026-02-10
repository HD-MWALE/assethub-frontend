"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-6 text-center px-4">
      <div className="space-y-3">
        <div className="space-y-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png"
            alt="AssetHub"
            width={48}
            height={48}
            className="mx-auto opacity-50"
          />
          <AlertCircle className="mx-auto size-12 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="font-bold text-4xl">404</h1>
          <p className="font-semibold text-xl">Page Not Found</p>
          <p className="text-muted-foreground">The asset management page you're looking for doesn't exist.</p>
        </div>
      </div>
      <Link prefetch={false} replace href="/dashboard/overview">
        <Button className="gap-2">Return to Dashboard</Button>
      </Link>
    </div>
  );
}
