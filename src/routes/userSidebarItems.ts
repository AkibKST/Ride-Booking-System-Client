//use this file into getSidebarItems.ts

import Bookings from "@/pages/User/Bookings";
import type { ISidebarItem } from "@/types";

import { History } from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
        icon: History,
      },
    ],
  },
];
