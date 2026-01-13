//use this file into getSidebarItems.ts

import RequestRide from "@/pages/RequestRide";
import RiderDashboard from "@/pages/Rider/Dashboard";
import type { ISidebarItem } from "@/types";

import { History, LayoutDashboard, Navigation, User, Settings } from "lucide-react";

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
        title: "Request Ride",
        url: "/rider/request-ride",
        component: RequestRide,
        icon: Navigation,
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
      {
        title: "Profile",
        url: "/rider/profile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/rider/settings",
        icon: Settings,
      },
    ],
  },
];
