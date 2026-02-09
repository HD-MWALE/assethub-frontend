"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceForm } from "../../_components/maintenance-form";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

export default function EditMaintenancePage() {
  const params = useParams();
  const id = params.id as string;
  const [maintenance, setMaintenance] = useState(null);
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maintenanceRes, assetsRes] = await Promise.all([
          apiClient.get(`/maintenance/${id}`),
          apiClient.get("/assets"),
        ]);
        setMaintenance(maintenanceRes.data?.data || maintenanceRes.data);
        setAssets(assetsRes.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Maintenance Record</h1>
        <p className="text-muted-foreground">Update maintenance record details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Details</CardTitle>
          <CardDescription>Update the maintenance record information</CardDescription>
        </CardHeader>
        <CardContent>
          {maintenance && <MaintenanceForm initialData={maintenance} assets={assets} />}
        </CardContent>
      </Card>
    </div>
  );
}
