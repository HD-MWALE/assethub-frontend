import Image from "next/image";
import Link from "next/link";

import { Lock } from "lucide-react";

export default function page() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center space-y-6">
        <div className="space-y-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png"
            alt="AssetHub"
            width={56}
            height={56}
            className="mx-auto opacity-50"
          />
          <Lock className="mx-auto size-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to view this asset management resource. Contact your administrator to request access.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-xs transition-colors hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
