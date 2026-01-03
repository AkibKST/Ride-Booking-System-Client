//use this file into getSidebarItems.ts

import RiderDashboard from "@/pages/Rider/Dashboard";
import type { ISidebarItem } from "@/types";

import { History, LayoutDashboard, Navigation } from "lucide-react";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/rider/dashboard",
        component: RiderDashboard,
        icon: LayoutDashboard,
      },
      {
        title: "Ride History",
        url: "ride-history",
        icon: History,
      },
      {
        title: "Active Ride",
        url: "/rider/active-ride",
        icon: Navigation,
      },
    ],
  },
];
