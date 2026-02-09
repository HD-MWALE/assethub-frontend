"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RuleForm } from "../../_components/rule-form";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

export default function EditRulePage() {
  const params = useParams();
  const id = params.id as string;
  const [rule, setRule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRule = async () => {
      try {
        const response = await apiClient.get(`/notification-rules/${id}`);
        setRule(response.data?.data || response.data);
      } catch (error) {
        console.error("Failed to fetch rule:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRule();
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Notification Rule</h1>
        <p className="text-muted-foreground">Update the notification rule</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Details</CardTitle>
          <CardDescription>Update the notification rule configuration</CardDescription>
        </CardHeader>
        <CardContent>
          {rule && <RuleForm initialData={rule} />}
        </CardContent>
      </Card>
    </div>
  );
}
