//use this file into getSidebarItems.ts

import UserDashboard from "@/pages/User/Dashboard";
import type { ISidebarItem } from "@/types";

import { LayoutDashboard } from "lucide-react";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/rider/dashboard",
        component: UserDashboard,
        icon: LayoutDashboard,
      },
    ],
  },
];
