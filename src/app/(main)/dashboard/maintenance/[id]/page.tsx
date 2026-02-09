"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";

export default function MaintenanceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [maintenance, setMaintenance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMaintenance();
  }, [id]);

  const fetchMaintenance = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/maintenance/${id}`);
      setMaintenance(response.data?.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch maintenance record");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this maintenance record?")) return;
    try {
      await apiClient.delete(`/maintenance/${id}`);
      toast.success("Maintenance record deleted successfully");
      window.location.href = "/dashboard/maintenance";
    } catch (error) {
      toast.error("Failed to delete maintenance record");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!maintenance) {
    return <div className="text-center text-muted-foreground py-8">Maintenance record not found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/maintenance">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Record</h1>
            <p className="text-muted-foreground">View maintenance details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/maintenance/${id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{maintenance.assetName || "Asset Maintenance"}</CardTitle>
              <CardDescription>{maintenance.type} maintenance</CardDescription>
            </div>
            <Badge className={getStatusColor(maintenance.status)}>
              {maintenance.status?.replace(/_/g, " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
              <p className="text-lg font-semibold mt-1">{maintenance.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p className="text-lg font-semibold mt-1">{maintenance.status?.replace(/_/g, " ")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
              <p className="text-lg font-semibold mt-1">
                {new Date(maintenance.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
              <p className="text-lg font-semibold mt-1">
                {maintenance.endDate ? new Date(maintenance.endDate).toLocaleDateString() : "Not completed"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Cost</h3>
              <p className="text-lg font-semibold mt-1">${maintenance.cost?.toFixed(2) || "0.00"}</p>
            </div>
            {maintenance.vendor && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Vendor</h3>
                <p className="text-lg font-semibold mt-1">{maintenance.vendor}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-2 whitespace-pre-wrap">{maintenance.description}</p>
          </div>

          {maintenance.notes && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="mt-2 whitespace-pre-wrap">{maintenance.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
