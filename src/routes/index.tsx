import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unathorized";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Homepage from "@/pages/Homepage";
import Fail from "@/pages/Payment/Fail";
import Success from "@/pages/Payment/Success";
import Rides from "@/pages/Rides";
import RideDetails from "@/pages/RideDetails";
import { AboutPage } from "@/pages/About";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: AboutPage,
        path: "about",
      },
      {
        Component: Rides,
        path: "rides",
      },
      {
        Component: RideDetails,
        path: "rides/:id",
      },
      // {
      //   Component: withAuth(Booking),
      //   path: "booking/:id",
      // },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole), // Protected route for superAdmin
    path: "/admin",
    children: [
      // Redirect to a default admin page, e.g., analytics
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole), // Protected route for user
    path: "/user",
    children: [
      // Redirect to a default user page, e.g., bookings
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: Success,
    path: "/payment/success",
  },
  {
    Component: Fail,
    path: "/payment/fail",
  },
]);
