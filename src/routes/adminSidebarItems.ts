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

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
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
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
