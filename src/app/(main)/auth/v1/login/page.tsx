import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "../../_components/login-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function LoginV1() {
  return (
    <div className="flex h-dvh">
      <div className="hidden bg-primary lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png"
              alt="AssetHub Logo"
              width={48}
              height={48}
              className="mx-auto"
            />
            <div className="space-y-2">
              <h1 className="font-bold text-5xl text-primary-foreground">AssetHub</h1>
              <p className="text-primary-foreground/80 text-xl">Welcome back</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-semibold tracking-tight text-2xl">Sign In</div>
            <div className="mx-auto max-w-xl text-muted-foreground">
              Access your asset management dashboard to track and manage all your company assets.
            </div>
          </div>
          <div className="space-y-4">
            <LoginForm />
            <GoogleButton className="w-full" variant="outline" />
            <p className="text-center text-muted-foreground text-xs">
              Don&apos;t have an account?{" "}
              <Link prefetch={false} href="register" className="text-primary font-medium">
                Create one
              </Link>
            </p>
            <p className="text-center text-muted-foreground text-xs">
              <Link prefetch={false} href="/auth/forgot-password" className="text-primary font-medium">
                Forgot your password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
