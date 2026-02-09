"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface AssetFormProps {
  assetId?: string;
}

export function AssetForm({ assetId }: AssetFormProps) {
  const router = useRouter();
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
    loadFormData();
  }, [assetId]);

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
            status: asset.status,
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
      const payload: Partial<Asset> = {
        name: data.name,
        description: data.description,
        assetCode: data.assetCode,
        categoryId: data.categoryId,
        locationId: data.locationId,
        status: data.status,
        serialNumber: data.serialNumber,
      };

      if (data.purchaseDate) {
        payload.purchaseDate = data.purchaseDate;
      }
      if (data.purchasePrice) {
        payload.purchasePrice = parseFloat(data.purchasePrice);
      }

      let result;
      if (assetId) {
        result = await apiClient.updateAsset(assetId, payload);
      } else {
        result = await apiClient.createAsset(payload);
      }

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(assetId ? "Asset updated successfully" : "Asset created successfully");
        router.push("/dashboard/assets");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save asset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{assetId ? "Edit Asset" : "Create New Asset"}</CardTitle>
        <CardDescription>
          {assetId ? "Update asset details" : "Add a new asset to your inventory"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., MacBook Pro 14" {...field} />
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
                    <Textarea placeholder="Asset description" {...field} />
                  </FormControl>
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
                          <SelectValue placeholder="Select a category" />
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
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
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
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Device serial number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Asset"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
