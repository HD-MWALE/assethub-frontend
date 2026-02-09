"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";

export default function AssignmentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/asset-assignments/${id}`);
      setAssignment(response.data?.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch assignment");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "returned":
        return "bg-gray-100 text-gray-800";
      case "transferred":
        return "bg-blue-100 text-blue-800";
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

  if (!assignment) {
    return <div className="text-center text-muted-foreground py-8">Assignment not found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/asset-assignments">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assignment Details</h1>
            <p className="text-muted-foreground">View assignment information</p>
          </div>
        </div>
        <Link href={`/dashboard/asset-assignments/${id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{assignment.assetName}</CardTitle>
              <CardDescription>Assigned to {assignment.assignedToName}</CardDescription>
            </div>
            <Badge className={getStatusColor(assignment.status)}>
              {assignment.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset</h3>
              <p className="text-lg font-semibold mt-1">{assignment.assetName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
              <p className="text-lg font-semibold mt-1">{assignment.assignedToName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Assignment Date</h3>
              <p className="text-lg font-semibold mt-1">
                {new Date(assignment.assignmentDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Return Date</h3>
              <p className="text-lg font-semibold mt-1">
                {assignment.returnDate
                  ? new Date(assignment.returnDate).toLocaleDateString()
                  : "Not returned"}
              </p>
            </div>
          </div>

          {assignment.notes && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="mt-2 whitespace-pre-wrap">{assignment.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
