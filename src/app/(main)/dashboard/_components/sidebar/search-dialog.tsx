"use client";
import * as React from "react";

import { ChartBar, Forklift, Gauge, GraduationCap, LayoutDashboard, Search, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const searchItems = [
  { group: "Dashboards", icon: LayoutDashboard, label: "Overview", url: "/dashboard/overview" },
  { group: "Dashboards", icon: ChartBar, label: "Default", url: "/dashboard/default" },
  { group: "Dashboards", icon: Gauge, label: "Analytics", disabled: true },
  { group: "Assets", icon: ShoppingBag, label: "Assets", url: "/dashboard/assets" },
  { group: "Assets", icon: Forklift, label: "Assignments", url: "/dashboard/asset-assignments" },
  { group: "Assets", icon: GraduationCap, label: "Categories", url: "/dashboard/asset-categories" },
  { group: "Management", icon: Forklift, label: "Maintenance", url: "/dashboard/maintenance" },
  { group: "Management", icon: ChartBar, label: "Reports", url: "/dashboard/reports" },
  { group: "Management", label: "Audit Logs", url: "/dashboard/audit-logs" },
  { group: "Team", label: "Users", url: "/dashboard/users" },
  { group: "Team", label: "Locations", url: "/dashboard/locations" },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="link"
        className="!px-0 font-normal text-muted-foreground hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Search Assets
        <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium text-[10px]">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search assets, users, locations, and more…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem 
                      className="!py-1.5" 
                      key={item.label} 
                      onSelect={() => {
                        if (item.url && !item.disabled) {
                          window.location.href = item.url;
                        }
                        setOpen(false);
                      }}
                      disabled={item.disabled}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
