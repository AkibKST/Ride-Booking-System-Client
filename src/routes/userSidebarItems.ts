//use this file into getSidebarItems.ts

import UserDashboard from "@/pages/User/Dashboard";
import type { ISidebarItem } from "@/types";

import { History, LayoutDashboard, MapPin, User, Settings } from "lucide-react";

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
      {
        title: "Request Ride",
        url: "request-ride",
        icon: MapPin,
      },
      {
        title: "Ride History",
        url: "ride-history",
        icon: History,
      },
      {
        title: "Profile",
        url: "/user/profile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/user/settings",
        icon: Settings,
      },
    ],
  },
];
