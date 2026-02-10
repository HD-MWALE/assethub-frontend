import {
  Banknote,
  Bell,
  Calendar,
  ChartBar,
  Fingerprint,
  Forklift,
  Gauge,
  GraduationCap,
  History,
  Kanban,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Receipt,
  ReceiptText,
  ShoppingBag,
  SquareArrowUpRight,
  Wrench,
  Users,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
        icon: LayoutDashboard,
      },
      {
        title: "Default",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/dashboard/coming-soon",
        icon: Gauge,
        comingSoon: true,
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "Analytics",
        url: "/dashboard/coming-soon",
        icon: Gauge,
        comingSoon: true,
      },
      {
        title: "E-commerce",
        url: "/dashboard/coming-soon",
        icon: ShoppingBag,
        comingSoon: true,
      },
      {
        title: "Academy",
        url: "/dashboard/coming-soon",
        icon: GraduationCap,
        comingSoon: true,
      },
      {
        title: "Logistics",
        url: "/dashboard/coming-soon",
        icon: Forklift,
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    label: "AssetHub",
    items: [
      {
        title: "Assets",
        url: "/dashboard/assets",
        icon: Package,
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Locations",
        url: "/dashboard/locations",
        icon: MapPin,
      },
      {
        title: "Categories",
        url: "/dashboard/asset-categories",
        icon: Receipt,
      },
      {
        title: "Assignments",
        url: "/dashboard/asset-assignments",
        icon: Forklift,
      },
      {
        title: "Maintenance",
        url: "/dashboard/maintenance",
        icon: Wrench,
      },
      {
        title: "Audit Logs",
        url: "/dashboard/audit-logs",
        icon: History,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: ChartBar,
      },
      {
        title: "Notifications",
        url: "/dashboard/notification-rules",
        icon: Bell,
      },
    ],
  },
  {
    id: 3,
    label: "Settings",
    items: [
      {
        title: "Organization",
        url: "/dashboard/coming-soon",
        icon: Lock,
        comingSoon: true,
      },
      {
        title: "Integrations",
        url: "/dashboard/coming-soon",
        icon: SquareArrowUpRight,
        comingSoon: true,
      },
      {
        title: "API Keys",
        url: "/dashboard/coming-soon",
        icon: Fingerprint,
        comingSoon: true,
      },
    ],
  },
  {
    id: 4,
    label: "Misc",
    items: [
      {
        title: "Others",
        url: "/dashboard/coming-soon",
        icon: SquareArrowUpRight,
        comingSoon: true,
      },
    ],
  },
];
