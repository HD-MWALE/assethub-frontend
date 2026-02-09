"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "@/lib/api-client";

const FormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().optional(),
  eventType: z.string({ message: "Event type is required" }),
  notificationChannel: z.string({ message: "Notification channel is required" }),
  isActive: z.boolean().default(true),
});

interface RuleFormProps {
  initialData?: any;
}

export function RuleForm({ initialData }: RuleFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [triggers, setTriggers] = useState<string[]>(initialData?.triggers || []);
  const [recipients, setRecipients] = useState<string[]>(initialData?.recipients || []);
  const [triggerInput, setTriggerInput] = useState("");
  const [recipientInput, setRecipientInput] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      eventType: initialData?.eventType || "",
      notificationChannel: initialData?.notificationChannel || "email",
      isActive: initialData?.isActive !== false,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (recipients.length === 0) {
      toast.error("Please add at least one recipient");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        ...data,
        triggers,
        recipients,
      };

      if (initialData?.id) {
        await apiClient.put(`/notification-rules/${initialData.id}`, payload);
        toast.success("Rule updated successfully!");
      } else {
        await apiClient.post("/notification-rules", payload);
        toast.success("Rule created successfully!");
      }
      router.push("/dashboard/notification-rules");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const addTrigger = () => {
    if (triggerInput.trim() && !triggers.includes(triggerInput.trim())) {
      setTriggers([...triggers, triggerInput.trim()]);
      setTriggerInput("");
    }
  };

  const removeTrigger = (trigger: string) => {
    setTriggers(triggers.filter((t) => t !== trigger));
  };

  const addRecipient = () => {
    if (recipientInput.trim() && !recipients.includes(recipientInput.trim())) {
      setRecipients([...recipients, recipientInput.trim()]);
      setRecipientInput("");
    }
  };

  const removeRecipient = (recipient: string) => {
    setRecipients(recipients.filter((r) => r !== recipient));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., High Value Asset Alert" {...field} />
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
                <Textarea placeholder="Describe when this rule should trigger..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="asset_created">Asset Created</SelectItem>
                  <SelectItem value="asset_updated">Asset Updated</SelectItem>
                  <SelectItem value="maintenance_due">Maintenance Due</SelectItem>
                  <SelectItem value="warranty_expiring">Warranty Expiring</SelectItem>
                  <SelectItem value="asset_assigned">Asset Assigned</SelectItem>
                  <SelectItem value="asset_returned">Asset Returned</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Triggers</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add trigger condition"
              value={triggerInput}
              onChange={(e) => setTriggerInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTrigger();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addTrigger}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {triggers.map((trigger) => (
              <div key={trigger} className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
                {trigger}
                <button
                  type="button"
                  onClick={() => removeTrigger(trigger)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="notificationChannel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification Channel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="in_app">In-App</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Recipients</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add email or phone number"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addRecipient();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addRecipient}>
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {recipients.map((recipient) => (
              <div key={recipient} className="flex items-center justify-between rounded-lg border p-2 text-sm">
                {recipient}
                <button
                  type="button"
                  onClick={() => removeRecipient(recipient)}
                  className="text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Active</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Rule"}
        </Button>
      </form>
    </Form>
  );
}
