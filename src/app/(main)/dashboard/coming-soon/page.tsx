import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <Zap className="mx-auto size-12 text-primary" />
        <h1 className="font-bold text-3xl">Coming Soon</h1>
        <p className="text-muted-foreground max-w-sm">
          This feature is under development. We're working hard to bring new asset management capabilities to AssetHub.
        </p>
      </div>
      <Link href="/dashboard/overview">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Overview
        </Button>
      </Link>
    </div>
  );
}
