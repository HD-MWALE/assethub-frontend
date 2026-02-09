"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient, type UserData } from "@/lib/api-client";
import { cn } from "@/lib/utils";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [params.id]);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const result = await apiClient.getUser(params.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        setUser(result.user || null);
      }
    } catch (error) {
      toast.error("Failed to load user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/dashboard/users/${params.id}/edit`}>
            <Button>Edit User</Button>
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
      ) : user ? (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Role</h3>
                  <p className="text-muted-foreground capitalize">{user.role}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email Verified</h3>
                  <p className="text-muted-foreground">{user.isEmailVerified ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t">
                <div>
                  <h3 className="font-semibold mb-2">Joined</h3>
                  <p className="text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User ID</h3>
                  <p className="text-muted-foreground text-sm font-mono">{user.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">User not found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
