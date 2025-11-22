import type { ISidebarItem } from "@/types";
import { Car, History, LayoutDashboard, Navigation, User } from "lucide-react";

export const driverSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/driver/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Incoming Requests",
                url: "/driver/incoming-requests",
                icon: Car,
            },
            {
                title: "Active Ride",
                url: "/driver/active-ride",
                icon: Navigation,
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Ride History",
                url: "/driver/ride-history",
                icon: History,
            },
            {
                title: "Profile",
                url: "/driver/profile",
                icon: User,
            },
        ],
    },
];
