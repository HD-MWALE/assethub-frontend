"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceForm } from "../_components/maintenance-form";
import { apiClient } from "@/lib/api-client";

export default function NewMaintenancePage() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await apiClient.get("/assets");
        setAssets(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };
    fetchAssets();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Maintenance Record</h1>
        <p className="text-muted-foreground">Create a new maintenance record for an asset</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Details</CardTitle>
          <CardDescription>Fill in the details for the maintenance record</CardDescription>
        </CardHeader>
        <CardContent>
          <MaintenanceForm assets={assets} />
        </CardContent>
      </Card>
    </div>
  );
}
