export interface IRide {
  _id: string;
  userId: string;
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
  status: "requested" | "accepted" | "in_progress" | "completed" | "cancelled";
  fare?: number;
  distance?: number;
  duration?: string;
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
