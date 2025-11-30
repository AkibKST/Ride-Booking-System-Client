//use this function to get sidebar items based on user role and  also use this into app-sidebar.tsx

import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import type { TRole } from "@/types";
import { riderSidebarItems } from "@/routes/riderSidebarItems";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    case role.driver:
      return [...driverSidebarItems];
    case role.rider:
      return [...riderSidebarItems];
    default:
      return [];
  }
};
