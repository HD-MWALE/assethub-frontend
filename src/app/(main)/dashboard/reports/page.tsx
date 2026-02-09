"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/api-client";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("asset-register");
  const [isLoading, setIsLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const reportTypes = [
    {
      id: "asset-register",
      name: "Asset Register",
      description: "Complete list of all assets with details",
    },
    {
      id: "maintenance-history",
      name: "Maintenance History",
      description: "Maintenance activities and schedules",
    },
    {
      id: "depreciation",
      name: "Depreciation Report",
      description: "Asset depreciation and value analysis",
    },
  ];

  const handleGenerateReport = async () => {
    if (!reportType) {
      toast.error("Please select a report type");
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = `/reports/${reportType}`;
      const response = await apiClient.post(endpoint, {
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
        format: "pdf",
      });

      // Download the report
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${reportType}-${new Date().toISOString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Report generated successfully!");
    } catch (error) {
      toast.error("Failed to generate report");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate and download reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reportTypes.map((report) => (
          <Card
            key={report.id}
            className={`cursor-pointer transition-colors ${
              reportType === report.id ? "border-primary bg-primary/5" : ""
            }`}
            onClick={() => setReportType(report.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{report.name}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Options</CardTitle>
          <CardDescription>Configure and generate your report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date (Optional)</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date (Optional)</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleGenerateReport}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate & Download Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Descriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Asset Register</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Complete listing of all assets with their current values, locations, categories,
              and status information.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Maintenance History</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Detailed record of all maintenance activities including dates, costs, and vendor
              information.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Depreciation Report</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Analysis of asset depreciation over time with projected values and replacement
              recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
