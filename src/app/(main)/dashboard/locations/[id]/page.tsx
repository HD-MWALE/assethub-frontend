"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient, type Location } from "@/lib/api-client";

interface LocationDetailPageProps {
  params: {
    id: string;
  };
}

export default function LocationDetailPage({ params }: LocationDetailPageProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLocation();
  }, [params.id]);

  const loadLocation = async () => {
    setIsLoading(true);
    try {
      const result = await apiClient.getLocation(params.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        setLocation(result.location || null);
      }
    } catch (error) {
      toast.error("Failed to load location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/locations">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/dashboard/locations/${params.id}/edit`}>
            <Button>Edit Location</Button>
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
      ) : location ? (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-muted-foreground mt-1" />
                <div>
                  <CardTitle>{location.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {location.address && (
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground">{location.address}</p>
                </div>
              )}

              {location.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{location.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 pt-6 border-t">
                <div>
                  <h3 className="font-semibold mb-2">Created</h3>
                  <p className="text-muted-foreground">
                    {new Date(location.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Last Updated</h3>
                  <p className="text-muted-foreground">
                    {new Date(location.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Location not found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
