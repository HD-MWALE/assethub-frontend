"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModalFormWrapper } from "@/components/modal-form-wrapper";
import { apiClient, type Asset } from "@/lib/api-client";

const FormSchema = z.object({
  assetId: z.string().min(1, { message: "Please select an asset." }),
  type: z.enum(["PREVENTIVE", "CORRECTIVE", "PREDICTIVE"]),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  scheduledDate: z.string(),
  completionDate: z.string().optional(),
  cost: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
});

type FormData = z.infer<typeof FormSchema>;

interface MaintenanceModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maintenanceId?: string;
  onSuccess?: () => void;
}

export function MaintenanceModalForm({
  open,
  onOpenChange,
  maintenanceId,
  onSuccess,
}: MaintenanceModalFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      assetId: "",
      type: "PREVENTIVE",
      description: "",
      scheduledDate: new Date().toISOString().split("T")[0],
      completionDate: "",
      cost: "",
      notes: "",
      status: "SCHEDULED",
    },
  });

  useEffect(() => {
    if (open) {
      loadFormData();
    }
  }, [open, maintenanceId]);

  const loadFormData = async () => {
    setIsLoading(true);
    try {
      const assetsResult = await apiClient.getAssets();
      if (assetsResult.assets) {
        setAssets(assetsResult.assets);
      }

      if (maintenanceId) {
        const result = await apiClient.getMaintenance(maintenanceId);
        if (result.maintenance) {
          const m = result.maintenance;
          form.reset({
            assetId: m.assetId,
            type: m.type as "PREVENTIVE" | "CORRECTIVE" | "PREDICTIVE",
            description: m.description,
            scheduledDate: m.scheduledDate.split("T")[0],
            completionDate: m.completionDate ? m.completionDate.split("T")[0] : "",
            cost: m.cost?.toString() || "",
            notes: m.notes || "",
            status: m.status as "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
          });
        }
      }
    } catch (error) {
      toast.error("Failed to load form data");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (maintenanceId) {
        await apiClient.updateMaintenance(maintenanceId, data);
        toast.success("Maintenance updated successfully");
      } else {
        await apiClient.createMaintenance(data);
        toast.success("Maintenance scheduled successfully");
      }
      onOpenChange(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save maintenance");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalFormWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={maintenanceId ? "Edit Maintenance" : "Schedule Maintenance"}
      description={maintenanceId ? "Update maintenance details" : "Schedule maintenance for an asset"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="assetId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an asset" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name} ({asset.assetCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PREVENTIVE">Preventive</SelectItem>
                      <SelectItem value="CORRECTIVE">Corrective</SelectItem>
                      <SelectItem value="PREDICTIVE">Predictive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the maintenance work..." className="min-h-20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" step="0.01" {...field} />
                </FormControl>
                <FormDescription>Maintenance cost in dollars</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any additional notes..." className="min-h-16" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : maintenanceId ? "Update Maintenance" : "Schedule Maintenance"}
            </Button>
          </div>
        </form>
      </Form>
    </ModalFormWrapper>
  );
}
