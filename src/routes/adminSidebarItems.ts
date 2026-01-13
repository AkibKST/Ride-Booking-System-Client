//use this file into getSidebarItems.ts

import type { ISidebarItem } from "@/types";
import { lazy } from "react";

//UX and Performance Enhancements with Lazy Loading
const Analytics = lazy(() => import("@/pages/Admin/Dashboard"));
const UserManagement = lazy(() => import("@/pages/Admin/UserManagement"));

import { BarChart3, Car, MapPin, PlusCircle, Users, User, Settings } from "lucide-react";
import RequestRide from "@/pages/RequestRide";
import DriverRegister from "@/pages/DriverRegister";
import DriverManagement from "@/pages/Admin/DriverManagement";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/dashboard",
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
  {
    title: "Driver Management",
    items: [
      {
        title: "All Drivers",
        url: "/admin/drivers",
        component: DriverManagement,
        icon: Car,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
