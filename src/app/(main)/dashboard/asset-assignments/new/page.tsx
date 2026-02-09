"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AssignmentForm } from "../_components/assignment-form";
import { apiClient } from "@/lib/api-client";

export default function NewAssignmentPage() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetsRes, usersRes] = await Promise.all([
          apiClient.get("/assets"),
          apiClient.get("/users"),
        ]);
        setAssets(assetsRes.data?.data || []);
        setUsers(usersRes.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Assignment</h1>
        <p className="text-muted-foreground">Assign an asset to a user</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
          <CardDescription>Fill in the details for the new assignment</CardDescription>
        </CardHeader>
        <CardContent>
          <AssignmentForm assets={assets} users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
