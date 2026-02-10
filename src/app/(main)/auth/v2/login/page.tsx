import Image from "next/image";
import Link from "next/link";

import { Globe } from "lucide-react";

import { APP_CONFIG } from "@/config/app-config";

import { LoginForm } from "../../_components/login-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function LoginV2() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px]">
        <div className="space-y-6 text-center">
          <div className="space-y-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png"
              alt="AssetHub Logo"
              width={48}
              height={48}
              className="mx-auto"
            />
            <div className="space-y-1">
              <h1 className="font-bold text-3xl tracking-tight">{APP_CONFIG.name}</h1>
              <p className="text-muted-foreground text-sm">Asset Management Made Simple</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-lg">Welcome back</p>
            <p className="text-muted-foreground text-sm">Sign in to your account to manage your assets</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <GoogleButton className="w-full" />
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
          <LoginForm />
          
          <div className="space-y-2 text-center text-sm">
            <Link prefetch={false} href="/auth/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link prefetch={false} className="text-primary font-medium hover:underline" href="register">
            Create one now
          </Link>
        </div>
      </div>

      <div className="absolute top-5 left-5 flex items-center gap-2 lg:hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png"
          alt="AssetHub"
          width={28}
          height={28}
        />
        <span className="font-bold text-lg">{APP_CONFIG.name}</span>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-xs text-muted-foreground">{APP_CONFIG.copyright}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Globe className="size-3" />
          ENG
        </div>
      </div>
    </>
  );
}
