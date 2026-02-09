import type { ReactNode } from "react";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config/app-config";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="relative order-2 hidden h-full rounded-3xl bg-primary lg:flex">
          <div className="absolute top-10 space-y-1 px-10 text-primary-foreground">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png"
              alt="AssetHub Logo"
              width={40}
              height={40}
              className="mb-2"
            />
            <h1 className="font-bold text-2xl">{APP_CONFIG.name}</h1>
            <p className="text-sm">Asset Management Made Simple</p>
          </div>

          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="flex-1 space-y-1 text-primary-foreground">
              <h2 className="font-medium">Track Your Assets</h2>
              <p className="text-sm">Manage, organize, and maintain all your company assets in one place with ease.</p>
            </div>
            <Separator orientation="vertical" className="mx-3 h-auto!" />
            <div className="flex-1 space-y-1 text-primary-foreground">
              <h2 className="font-medium">Real-time Insights</h2>
              <p className="text-sm">
                Get instant visibility into asset status, maintenance schedules, and location information.
              </p>
            </div>
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
