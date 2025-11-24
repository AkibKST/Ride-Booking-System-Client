//use this file into getSidebarItems.ts

// import AddTour from "@/pages/Admin/AddTour";
// import AddTourType from "@/pages/Admin/AddTourType";
// import Analytics from "@/pages/Admin/Analytics";

import AddDivision from "@/pages/Admin/AddDivision";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

//UX and Performance Enhancements with Lazy Loading
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AddTour = lazy(() => import("@/pages/Admin/AddTour"));
const AddTourType = lazy(() => import("@/pages/Admin/AddTourType"));
const UserManagement = lazy(() => import("@/pages/Admin/UserManagement"));

import { BarChart3, Map, MapPin, PlusCircle, Users } from "lucide-react";

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
    title: "Tour Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
        icon: PlusCircle,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
        icon: MapPin,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
        icon: Map,
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
