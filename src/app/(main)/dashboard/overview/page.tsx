"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Users, MapPin, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient, type Asset, type UserData, type Location } from "@/lib/api-client";

export default function OverviewPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [assetsResult, usersResult, locationsResult] = await Promise.all([
        apiClient.getAssets(),
        apiClient.getUsers(),
        apiClient.getLocations(),
      ]);

      if (!assetsResult.error && assetsResult.assets) {
        setAssets(assetsResult.assets);
      }
      if (!usersResult.error && usersResult.users) {
        setUsers(usersResult.users);
      }
      if (!locationsResult.error && locationsResult.locations) {
        setLocations(locationsResult.locations);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const activeAssets = assets.filter((a) => a.status === "ACTIVE").length;
  const activeUsers = users.filter((u) => u.isActive).length;

  const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    href,
  }: {
    title: string;
    value: number;
    description: string;
    icon: React.ReactNode;
    href: string;
  }) => (
    <Link href={href}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to AssetHub. Here's your overview.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Assets"
            value={assets.length}
            description={`${activeAssets} active`}
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
            href="/dashboard/assets"
          />
          <StatCard
            title="Team Members"
            value={users.length}
            description={`${activeUsers} active`}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            href="/dashboard/users"
          />
          <StatCard
            title="Locations"
            value={locations.length}
            description="Facilities"
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
            href="/dashboard/locations"
          />
          <StatCard
            title="System Status"
            value={100}
            description="All systems operational"
            icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            href="#"
          />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Assets */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assets</CardTitle>
            <CardDescription>Latest assets added to inventory</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : assets.length === 0 ? (
              <p className="text-sm text-muted-foreground">No assets yet</p>
            ) : (
              <div className="space-y-3">
                {assets.slice(0, 3).map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                    <div>
                      <p className="font-sm font-medium">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">{asset.assetCode}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        asset.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Link href="/dashboard/assets">
              <Button variant="outline" className="w-full mt-4">
                View All Assets
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Team Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>Team member statistics</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : users.length === 0 ? (
              <p className="text-sm text-muted-foreground">No team members yet</p>
            ) : (
              <div className="space-y-3">
                {users.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                    <div>
                      <p className="font-sm font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Link href="/dashboard/users">
              <Button variant="outline" className="w-full mt-4">
                Manage Team
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Link href="/dashboard/assets/new">
              <Button variant="outline" className="w-full justify-center">
                <Package className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </Link>
            <Link href="/dashboard/users/new">
              <Button variant="outline" className="w-full justify-center">
                <Users className="mr-2 h-4 w-4" />
                Invite User
              </Button>
            </Link>
            <Link href="/dashboard/locations/new">
              <Button variant="outline" className="w-full justify-center">
                <MapPin className="mr-2 h-4 w-4" />
                New Location
              </Button>
            </Link>
            <Link href="/dashboard/assets">
              <Button variant="outline" className="w-full justify-center">
                View All
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
