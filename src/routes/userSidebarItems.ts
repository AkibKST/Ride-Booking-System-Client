//use this file into getSidebarItems.ts

import UserDashboard from "@/pages/User/Dashboard";
import type { ISidebarItem } from "@/types";

import { LayoutDashboard } from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: UserDashboard,
        icon: LayoutDashboard,
      },
    ],
  },

];
