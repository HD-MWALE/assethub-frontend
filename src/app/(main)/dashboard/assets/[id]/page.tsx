"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient, type Asset } from "@/lib/api-client";
import { cn } from "@/lib/utils";

interface AssetDetailPageProps {
  params: {
    id: string;
  };
}

export default function AssetDetailPage({ params }: AssetDetailPageProps) {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAsset();
  }, [params.id]);

  const loadAsset = async () => {
    setIsLoading(true);
    try {
      const result = await apiClient.getAsset(params.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        setAsset(result.asset || null);
      }
    } catch (error) {
      toast.error("Failed to load asset");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      case "RETIRED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/assets">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assets
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/dashboard/assets/${params.id}/edit`}>
            <Button>Edit Asset</Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ) : asset ? (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{asset.name}</CardTitle>
                  <CardDescription>Asset Code: {asset.assetCode}</CardDescription>
                </div>
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium", getStatusColor(asset.status))}>
                  {asset.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {asset.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{asset.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <p className="text-muted-foreground">{asset.category?.name || "—"}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">{asset.location?.name || "—"}</p>
                </div>
              </div>

              {asset.serialNumber && (
                <div>
                  <h3 className="font-semibold mb-2">Serial Number</h3>
                  <p className="text-muted-foreground">{asset.serialNumber}</p>
                </div>
              )}

              {asset.purchasePrice && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Purchase Price</h3>
                    <p className="text-muted-foreground">${asset.purchasePrice.toFixed(2)}</p>
                  </div>
                  {asset.purchaseDate && (
                    <div>
                      <h3 className="font-semibold mb-2">Purchase Date</h3>
                      <p className="text-muted-foreground">
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 pt-6 border-t">
                <div>
                  <h3 className="font-semibold mb-2">Created</h3>
                  <p className="text-muted-foreground">
                    {new Date(asset.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Last Updated</h3>
                  <p className="text-muted-foreground">
                    {new Date(asset.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Asset not found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
