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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModalFormWrapper } from "@/components/modal-form-wrapper";
import { apiClient, type User } from "@/lib/api-client";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  role: z.enum(["ADMIN", "MANAGER", "USER"]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

type FormData = z.infer<typeof FormSchema>;

interface UserModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  onSuccess?: () => void;
}

export function UserModalForm({
  open,
  onOpenChange,
  userId,
  onSuccess,
}: UserModalFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "USER",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (open) {
      loadFormData();
    }
  }, [open, userId]);

  const loadFormData = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const result = await apiClient.getUser(userId);
      if (result.user) {
        const user = result.user;
        form.reset({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role as "ADMIN" | "MANAGER" | "USER",
          status: user.status as "ACTIVE" | "INACTIVE",
        });
      }
    } catch (error) {
      toast.error("Failed to load user");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (userId) {
        await apiClient.updateUser(userId, data);
        toast.success("User updated successfully");
      } else {
        await apiClient.createUser(data);
        toast.success("User created successfully");
      }
      onOpenChange(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalFormWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={userId ? "Edit User" : "Create New User"}
      description={userId ? "Update user information" : "Add a new team member"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormDescription>User's email address for login</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrator</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
              {isLoading ? "Saving..." : userId ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </Form>
    </ModalFormWrapper>
  );
}
