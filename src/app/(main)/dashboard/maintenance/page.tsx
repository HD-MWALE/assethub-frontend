"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";

interface Maintenance {
  id: string;
  assetId: string;
  assetName?: string;
  type: string;
  description: string;
  status: string;
  startDate: string;
  endDate?: string;
  cost?: number;
  createdAt: string;
}

export default function MaintenancePage() {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    fetchMaintenance();
  }, [page]);

  const fetchMaintenance = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get("/maintenance", {
        params: { page, limit },
      });
      setMaintenance(response.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch maintenance records");
      console.error(error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">Manage asset maintenance records</p>
        </div>
        <Link href="/dashboard/maintenance/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Maintenance Record
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Records</CardTitle>
          <CardDescription>View and manage all maintenance activities</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : maintenance.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No maintenance records found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.assetName || record.assetId}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status?.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(record.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>${record.cost?.toFixed(2) || "0.00"}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/maintenance/${record.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
