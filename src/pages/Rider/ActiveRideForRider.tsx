/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, MapPin, Navigation, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import {
  useGetActiveRideQuery,
  useGetRideQuery,
} from "@/redux/features/ride/ride.api";
import { Spinner } from "@/components/ui/spinner";
import RideMapPreview from "@/components/RideMapPreview";
import LocationAddress from "@/components/LocationAddress";

export default function ActiveRideForRider() {
  const navigate = useNavigate();
  const { rideId } = useParams();

  // Fetch active ride with polling for real-time updates
  const {
    data: activeRide,
    isLoading: isLoadingActive,
    error: activeError,
  } = useGetActiveRideQuery(undefined, {
    pollingInterval: 5000, // Poll every 5 seconds
    skip: !!rideId, // Skip if we have a specific rideId
  });

  // Fetch specific ride if rideId is provided
  const {
    data: specificRide,
    isLoading: isLoadingSpecific,
    error: specificError,
  } = useGetRideQuery(rideId as string, {
    skip: !rideId,
    pollingInterval: 5000,
  });

  const ride = rideId ? specificRide : activeRide;
  const isLoading = rideId ? isLoadingSpecific : isLoadingActive;
  const error = rideId ? specificError : activeError;

  const handleSOS = () => {
    toast.error("SOS Alert Sent! Emergency contacts notified.");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Active Ride</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {error
                  ? "Error loading ride details"
                  : "No active ride at the moment"}
              </p>
              <Button onClick={() => navigate("/driver/incoming-requests")}>
                View Incoming Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get rider info - handle both object and string userId
  const riderInfo = typeof ride.userId === "object" ? ride.userId : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Active Ride</h1>
        <Button variant="destructive" onClick={handleSOS} className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          SOS Emergency
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ride Details */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Rider Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">
                  {riderInfo?.name || "Rider"}
                </p>
                <p className="text-muted-foreground text-sm">
                  {riderInfo?.email || ""}
                </p>
              </div>
              {riderInfo?.phone && (
                <Button size="icon" variant="outline" className="ml-auto">
                  <Phone className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Pickup
                  </p>
                  {ride.pickupLocation?.latitude &&
                  ride.pickupLocation?.longitude ? (
                    <LocationAddress
                      latitude={ride.pickupLocation.latitude}
                      longitude={ride.pickupLocation.longitude}
                      fallback={ride.pickupLocation?.address || "N/A"}
                    />
                  ) : (
                    <p className="font-medium">
                      {ride.pickupLocation?.address || "N/A"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Navigation className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Dropoff
                  </p>
                  {ride.dropLocation?.latitude &&
                  ride.dropLocation?.longitude ? (
                    <LocationAddress
                      latitude={ride.dropLocation.latitude}
                      longitude={ride.dropLocation.longitude}
                      fallback={ride.dropLocation?.address || "N/A"}
                    />
                  ) : (
                    <p className="font-medium">
                      {ride.dropLocation?.address || "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-semibold">
                  {ride.distance || "N/A"} km
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Fare</span>
                <span className="font-bold text-lg">
                  ৳{ride.totalFare || ride.fare || "0"}
                </span>
              </div>
              {ride.vehicleType && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Vehicle Type</span>
                  <Badge variant="secondary" className="capitalize">
                    {ride.vehicleType}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <p>Have a safe journey!</p>
          </CardFooter>
        </Card>

        {/* Map and Status */}
        <Card className="lg:col-span-2 min-h-[400px] flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Live Route</CardTitle>
              <Badge className="capitalize">{ride.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-6">
            {/* Map Preview */}
            {ride.pickupLocation && ride.dropLocation ? (
              <div className="flex-1 min-h-[300px]">
                <RideMapPreview
                  pickupLocation={ride.pickupLocation}
                  dropLocation={ride.dropLocation}
                  height="100%"
                />
              </div>
            ) : (
              <div className="flex-1 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <Navigation className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Map View</p>
                  <p className="text-sm">Real-time tracking</p>
                </div>
              </div>
            )}

            {/* Status Progress Indicator */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Ride Progress</span>
                <span className="text-sm text-muted-foreground"></span>
                {/* {currentStatusIndex + 1} / {statusProgression.length}
                </span>
              </div>
              <div className="flex gap-2">
                {statusProgression.map((status, index) => (
                  <div
                    key={status}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      index <= currentStatusIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {statusProgression.map((status) => (
                  <span key={status} className="capitalize">
                    {statusLabels[status as keyof typeof statusLabels]}
                  </span>
                ))} */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
