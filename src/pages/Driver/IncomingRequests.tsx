/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Navigation, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useGetRequestedRidesQuery } from "@/redux/features/ride/ride.api";
import RideMapPreview from "@/components/RideMapPreview";
import LocationAddress from "@/components/LocationAddress";

export default function IncomingRequests() {
  const navigate = useNavigate();

  // Fetch rides with status="requested" from API
  const {
    data: requestedRides,
    isLoading,
    error,
  } = useGetRequestedRidesQuery(undefined, {
    pollingInterval: 10000, // Poll every 10 seconds for new requests
    refetchOnMountOrArgChange: true,
  });

  const handleAccept = (_id: string) => {
    toast.success("Ride Accepted! Navigating to active ride...");
    // TODO: Call API to accept ride
    // In a real app, this would update the backend
    navigate("/driver/active-ride");
  };

  const handleReject = (_id: string) => {
    toast.info("Ride Rejected");
    // TODO: Call API to reject ride
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Incoming Requests</h1>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading ride requests...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          Error loading ride requests. Please try again later.
        </div>
      ) : !requestedRides || requestedRides.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No new requests at the moment. Stay online!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requestedRides.map((ride: any) => (
            <Card key={ride._id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {ride.userId?.name || "User"}
                    </CardTitle>
                    <CardDescription>Status: {ride.status}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg font-bold">
                    ${ride.totalFare || "N/A"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                {/* Map Preview */}
                {ride.pickupLocation && ride.dropLocation && (
                  <RideMapPreview
                    pickupLocation={ride.pickupLocation}
                    dropLocation={ride.dropLocation}
                    height="180px"
                  />
                )}

                {/* Pickup Location */}
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

                {/* Dropoff Location */}
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
                <div className="text-sm text-muted-foreground pt-2 border-t">
                  Vehicle Type:{" "}
                  <span className="font-medium text-foreground capitalize">
                    {ride.vehicleType}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleReject(ride._id)}
                >
                  Reject
                </Button>
                <Button onClick={() => handleAccept(ride._id)}>Accept</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
