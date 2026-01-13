import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetRideQuery } from "@/redux/features/ride/ride.api";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserRideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previousStatus, setPreviousStatus] = useState<string | null>(null);

  // Poll every 5 seconds when status is "requested"
  const { data: ride, isLoading } = useGetRideQuery(id as string, {
    skip: !id,
    pollingInterval: 5000, // Poll every 5 seconds
    refetchOnMountOrArgChange: true,
  });

  // Detect status changes and show notifications
  // This must be before any conditional returns to follow Rules of Hooks
  useEffect(() => {
    if (ride?.status && previousStatus && ride.status !== previousStatus) {
      // Show different notifications for different status transitions
      if (previousStatus === "requested" && ride.status === "accepted") {
        toast.success("🎉 Driver accepted your ride!");
        navigate(`/rider/active-ride/${ride._id}`);
      } else if (previousStatus === "accepted" && ride.status === "picked_up") {
        toast.success("🚗 Driver has picked you up!");
      } else if (
        previousStatus === "picked_up" &&
        ride.status === "in_progress"
      ) {
        toast.info("🛣️ Your ride is now in progress!");
      } else if (
        previousStatus === "in_progress" &&
        ride.status === "completed"
      ) {
        toast.success("✅ Ride completed! Redirecting to payment...");
        // Navigate to payment page after a short delay
        setTimeout(() => {
          navigate(`/payment/${ride._id}`);
        }, 2000);
      } else if (ride.status === "cancelled") {
        toast.error("❌ Ride has been cancelled");
      }
    }
    if (ride?.status) {
      setPreviousStatus(ride.status);
    }
  }, [ride?.status, previousStatus, ride?._id, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold">Ride not found</h2>
        <Button variant="ghost" asChild className="mt-4">
          <Link to="/ride-history">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/ride-history">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
        </Link>
      </Button>

      {/* Waiting for Driver Banner - Only shown when status is "requested" */}
      {ride.status === "requested" && (
        <Card className="mb-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {/* Animated waiting indicator */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-violet-200 dark:bg-violet-800 flex items-center justify-center animate-pulse">
                    <svg
                      className="w-8 h-8 text-violet-600 dark:text-violet-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-violet-400 dark:bg-violet-600 animate-ping opacity-20"></div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100 mb-2">
                  🚗 Waiting for Driver to Accept
                </h2>
                <p className="text-violet-700 dark:text-violet-300">
                  We're finding a driver for you. This usually takes less than a
                  minute...
                </p>
              </div>

              {/* Ride Estimate Summary */}
              <div className="flex justify-center gap-6 pt-4">
                {ride.distance && (
                  <div className="text-center">
                    <p className="text-sm text-violet-600 dark:text-violet-400">
                      Distance
                    </p>
                    <p className="text-lg font-bold text-violet-900 dark:text-violet-100">
                      {ride.distance} km
                    </p>
                  </div>
                )}
                {ride.duration && (
                  <div className="text-center">
                    <p className="text-sm text-violet-600 dark:text-violet-400">
                      Duration
                    </p>
                    <p className="text-lg font-bold text-violet-900 dark:text-violet-100">
                      {ride.duration}
                    </p>
                  </div>
                )}
                {ride.fare && (
                  <div className="text-center">
                    <p className="text-sm text-violet-600 dark:text-violet-400">
                      Fare
                    </p>
                    <p className="text-lg font-bold text-violet-900 dark:text-violet-100">
                      ৳{ride.fare}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Map & Route Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Map Placeholder */}
              <div className="bg-muted h-64 rounded-md flex items-center justify-center mb-6">
                <span className="text-muted-foreground">
                  Map View Placeholder
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">{ride.pickupLocation.address}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Dropoff</p>
                    <p className="font-medium">{ride.dropLocation.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ride Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current Status</span>
                <Badge className="capitalize text-lg px-4 py-1">
                  {ride.status.replace("_", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Driver & Fare Info */}
        <div className="space-y-6">
          {ride.driver ? (
            <Card>
              <CardHeader>
                <CardTitle>Driver Details</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-muted overflow-hidden">
                    <img
                      src={ride.driver.image || "https://github.com/shadcn.png"}
                      alt={ride.driver.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold">{ride.driver.name}</h3>
                {ride.driver.rating && (
                  <div className="flex justify-center items-center gap-1 mb-2">
                    <span className="text-yellow-500">★</span>
                    <span>{ride.driver.rating}</span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-4">
                  {ride.driver.vehicleModel} - {ride.driver.vehicleNumber}
                </p>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" /> {ride.driver.phone}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Driver Details</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                {ride.status === "requested" ? (
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center animate-pulse">
                        <svg
                          className="w-6 h-6 text-violet-600 dark:text-violet-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-violet-600 dark:text-violet-400 font-medium">
                      Searching for nearby drivers...
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No driver assigned yet.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Total Fare</span>
                <span className="text-xl font-bold">৳{ride.fare || "0"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
