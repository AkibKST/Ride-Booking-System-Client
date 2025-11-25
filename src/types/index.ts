/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";

// re-exporting types for easier imports from auth
export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

// re-exporting types for easier imports from tour
export type { ITourPackage } from "./tour.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

// Sidebar Item Interface use in generateRoutes.tsx and adminSidebarItems.ts
export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component?: ComponentType;
    icon?: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "DRIVER" | "RIDER";

// Zod issue type for error handling
type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

// General error response interface
export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  isBlocked: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  isActive?: "BLOCKED" | "ACTIVE";
}

export interface IDriver {
  availabilityStatus: string;
  createdAt: Date;
  currentLocation: CurrentLocation;
  isApproved: boolean;
  isBlocked: boolean;
  licenseNumber: string;
  rides: any[];
  updatedAt: Date;
  user_id: UserID;
  vehicleColor: string;
  vehicleModel: string;
  vehicleNumber: string;
  vehicleType: string;
  _id: string;
}

export interface CurrentLocation {
  latitude: number;
  longitude: number;
}

export interface UserID {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: string;
}
