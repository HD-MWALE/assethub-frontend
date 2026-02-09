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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiClient, type Location } from "@/lib/api-client";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Location name must be at least 2 characters." }),
  address: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface LocationFormProps {
  locationId?: string;
}

export function LocationForm({ locationId }: LocationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
    },
  });

  useEffect(() => {
    if (locationId) {
      loadLocation();
    }
  }, [locationId]);

  const loadLocation = async () => {
    if (!locationId) return;
    setIsLoading(true);
    try {
      const result = await apiClient.getLocation(locationId);
      if (result.error) {
        toast.error(result.error);
      } else if (result.location) {
        const location = result.location;
        form.reset({
          name: location.name,
          address: location.address || "",
          description: location.description || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load location");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const payload: Partial<Location> = {
        name: data.name,
        address: data.address,
        description: data.description,
      };

      let result;
      if (locationId) {
        result = await apiClient.updateLocation(locationId, payload);
      } else {
        result = await apiClient.createLocation(payload);
      }

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(locationId ? "Location updated successfully" : "Location created successfully");
        router.push("/dashboard/locations");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locationId ? "Edit Location" : "Create New Location"}</CardTitle>
        <CardDescription>
          {locationId ? "Update location details" : "Add a new facility location"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York Office" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Location description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Location"}
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
