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
import { ModalFormWrapper } from "@/components/modal-form-wrapper";
import { apiClient, type Location } from "@/lib/api-client";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Location name must be at least 2 characters." }),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface LocationModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locationId?: string;
  onSuccess?: () => void;
}

export function LocationModalForm({
  open,
  onOpenChange,
  locationId,
  onSuccess,
}: LocationModalFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      loadFormData();
    }
  }, [open, locationId]);

  const loadFormData = async () => {
    if (!locationId) return;
    
    setIsLoading(true);
    try {
      const result = await apiClient.getLocation(locationId);
      if (result.location) {
        const loc = result.location;
        form.reset({
          name: loc.name,
          address: loc.address || "",
          city: loc.city || "",
          state: loc.state || "",
          zipCode: loc.zipCode || "",
          description: loc.description || "",
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
      if (locationId) {
        await apiClient.updateLocation(locationId, data);
        toast.success("Location updated successfully");
      } else {
        await apiClient.createLocation(data);
        toast.success("Location created successfully");
      }
      onOpenChange(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalFormWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={locationId ? "Edit Location" : "Create New Location"}
      description={locationId ? "Update location information" : "Add a new facility or office"}
    >
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
                  <Input placeholder="e.g., 123 Main Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP/Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} />
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
                  <Textarea placeholder="Add any additional details about this location..." className="min-h-20" {...field} />
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
              {isLoading ? "Saving..." : locationId ? "Update Location" : "Create Location"}
            </Button>
          </div>
        </form>
      </Form>
    </ModalFormWrapper>
  );
}
