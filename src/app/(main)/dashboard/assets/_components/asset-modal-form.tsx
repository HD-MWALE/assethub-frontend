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
import { apiClient, type Asset, type AssetCategory, type Location } from "@/lib/api-client";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Asset name must be at least 2 characters." }),
  description: z.string().optional(),
  assetCode: z.string().min(2, { message: "Asset code must be at least 2 characters." }),
  categoryId: z.string().min(1, { message: "Please select a category." }),
  locationId: z.string().optional(),
  purchaseDate: z.string().optional(),
  purchasePrice: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "RETIRED"]),
  serialNumber: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface AssetModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetId?: string;
  onSuccess?: () => void;
}

export function AssetModalForm({
  open,
  onOpenChange,
  assetId,
  onSuccess,
}: AssetModalFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      assetCode: "",
      categoryId: "",
      locationId: "",
      purchaseDate: "",
      purchasePrice: "",
      status: "ACTIVE",
      serialNumber: "",
    },
  });

  useEffect(() => {
    if (open) {
      loadFormData();
    }
  }, [open, assetId]);

  const loadFormData = async () => {
    setIsLoading(true);
    try {
      const [categoriesResult, locationsResult] = await Promise.all([
        apiClient.getAssetCategories(),
        apiClient.getLocations(),
      ]);

      if (categoriesResult.categories) {
        setCategories(categoriesResult.categories);
      }
      if (locationsResult.locations) {
        setLocations(locationsResult.locations);
      }

      if (assetId) {
        const assetResult = await apiClient.getAsset(assetId);
        if (assetResult.asset) {
          const asset = assetResult.asset;
          form.reset({
            name: asset.name,
            description: asset.description || "",
            assetCode: asset.assetCode,
            categoryId: asset.categoryId,
            locationId: asset.locationId || "",
            purchaseDate: asset.purchaseDate ? asset.purchaseDate.split("T")[0] : "",
            purchasePrice: asset.purchasePrice?.toString() || "",
            status: asset.status as "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "RETIRED",
            serialNumber: asset.serialNumber || "",
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
      if (assetId) {
        await apiClient.updateAsset(assetId, data);
        toast.success("Asset updated successfully");
      } else {
        await apiClient.createAsset(data);
        toast.success("Asset created successfully");
      }
      onOpenChange(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save asset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalFormWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={assetId ? "Edit Asset" : "Create New Asset"}
      description={assetId ? "Update asset information" : "Add a new asset to your inventory"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Laptop, Desk, Monitor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ASSET-001" {...field} />
                </FormControl>
                <FormDescription>Unique identifier for this asset</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
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
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                      <SelectItem value="RETIRED">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., SN123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" step="0.01" {...field} />
                  </FormControl>
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
                  <Textarea placeholder="Add any additional details..." className="min-h-20" {...field} />
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
              {isLoading ? "Saving..." : assetId ? "Update Asset" : "Create Asset"}
            </Button>
          </div>
        </form>
      </Form>
    </ModalFormWrapper>
  );
}
