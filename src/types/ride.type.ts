export interface IRide {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  } | string;
  driverId?: string;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dropLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  status: "requested" | "accepted" | "picked_up" | "in_progress" | "completed" | "cancelled";
  fare?: number;
  totalFare?: number;
  distance?: number;
  duration?: string;
  vehicleType?: string;
  createdAt: string;
  updatedAt: string;
  driver?: {
    _id: string;
    name: string;
    phone: string;
    vehicleModel?: string;
    vehicleNumber?: string;
    vehicleColor?: string;
    rating?: number;
    image?: string;
  };
}
