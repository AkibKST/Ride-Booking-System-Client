import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unathorized";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
// import { withAuth } from "@/utils/withAuth";
// import { role } from "@/constants/role";
// import type { TRole } from "@/types";
import Homepage from "@/pages/Homepage";
import Fail from "@/pages/Payment/Fail";
import Success from "@/pages/Payment/Success";
import Rides from "@/pages/Rides";
import RideDetails from "@/pages/RideDetails";
import RequestRide from "@/pages/RequestRide";
import RideHistory from "@/pages/RideHistory";
import UserRideDetails from "@/pages/UserRideDetails";
import Profile from "@/pages/Profile";
import Features from "@/pages/Features";
import Contact from "@/pages/Contact";
import Faq from "@/pages/Faq";
import { AboutPage } from "@/pages/About";
import DriverDashboard from "@/pages/Driver/Dashboard";
import AdminDashboard from "@/pages/Admin/Dashboard";
import IncomingRequests from "@/pages/Driver/IncomingRequests";
import ActiveRide from "@/pages/Driver/ActiveRide";

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
      {
        Component: RequestRide,
        path: "request-ride",
      },
      {
        Component: RideHistory,
        path: "ride-history",
      },
      {
        Component: UserRideDetails,
        path: "ride-details/:id",
      },
      {
        Component: Profile,
        path: "profile",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Faq,
        path: "faq",
      },
      // {
      //   Component: withAuth(Booking),
      //   path: "booking/:id",
      // },
    ],
  },
  {
    Component: DashboardLayout, // Protected route for superAdmin
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", Component: AdminDashboard },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: DashboardLayout, // Protected route for user
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: DashboardLayout, // Protected route for driver
    path: "/driver",
    children: [
      { index: true, element: <Navigate to="/driver/dashboard" /> },
      { path: "dashboard", Component: DriverDashboard },
      { path: "incoming-requests", Component: IncomingRequests },
      { path: "active-ride", Component: ActiveRide },
      ...generateRoutes(driverSidebarItems),
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
  // {
  //   Component: Verify,
  //   path: "/verify",
  // },
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
