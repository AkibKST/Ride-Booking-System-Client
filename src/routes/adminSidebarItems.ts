//use this file into getSidebarItems.ts

import type { ISidebarItem } from "@/types";
import { lazy } from "react";

//UX and Performance Enhancements with Lazy Loading
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const UserManagement = lazy(() => import("@/pages/Admin/UserManagement"));

import { BarChart3, MapPin, PlusCircle, Users } from "lucide-react";
import RequestRide from "@/pages/RequestRide";
import DriverRegister from "@/pages/DriverRegister";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Ride Management",
    items: [
      {
        title: "Add Ride",
        url: "/admin/request-ride",
        component: RequestRide,
        icon: PlusCircle,
      },
      {
        title: "Register Driver",
        url: "/admin/driver-register",
        component: DriverRegister,
        icon: MapPin,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/users",
        component: UserManagement,
        icon: Users,
      },
    ],
  },
];
