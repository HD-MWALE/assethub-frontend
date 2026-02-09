"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RuleForm } from "../_components/rule-form";

export default function NewRulePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Notification Rule</h1>
        <p className="text-muted-foreground">Create a new notification or alert rule</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Details</CardTitle>
          <CardDescription>Configure the notification rule</CardDescription>
        </CardHeader>
        <CardContent>
          <RuleForm />
        </CardContent>
      </Card>
    </div>
  );
}
