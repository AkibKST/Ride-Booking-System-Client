/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useNavigate } from "react-router";
import MapPicker from "@/components/MapPicker";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Spinner } from "@/components/ui/spinner";
import { useAddRideRequestMutation } from "@/redux/features/ride/ride.api";
import { getRideEstimate, type RideEstimate } from "@/utils/rideCalculations";

// ------------------Form Schema using Zod-----------------------
const formSchema = z.object({
  pickupLocation: z.string().min(2, {
    message: "Pickup location must be at least 2 characters.",
  }),
  dropoffLocation: z.string().min(2, {
    message: "Dropoff location must be at least 2 characters.",
  }),
  status: z
    .enum(["requested", "accepted", "in_progress", "completed", "cancelled"])
    .default("requested"),
});
// ------------------------------------------------------------

// ------------------Request Ride Component-----------------------
export default function RequestRide() {
  const navigate = useNavigate();
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
    },
  });

  // ------------------Add Ride Request Mutation-----------------------
  const [addRideRequest] = useAddRideRequestMutation();

  // ------------------Map Location Selection-----------------------
  const [activeField, setActiveField] = useState<"pickup" | "dropoff">(
    "pickup"
  );
  const [pickupCoords, setPickupCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  // ------------------------------------------------------------

  // ------------------Ride Estimate State-----------------------
  const [rideEstimate, setRideEstimate] = useState<RideEstimate | null>(null);
  // ------------------------------------------------------------

  // ------------------Handle Location Selection from MapPicker-----------------------
  const handleLocationSelect = (lat: number, lng: number) => {
    const coords = { lat, lng };
    const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

    if (activeField === "pickup") {
      setPickupCoords(coords);
      form.setValue("pickupLocation", address);
    } else {
      setDropoffCoords(coords);
      form.setValue("dropoffLocation", address);
    }
  };
  // ------------------------------------------------------------

  // ------------------Calculate Ride Estimate-----------------------
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const estimate = getRideEstimate(pickupCoords, dropoffCoords);
      setRideEstimate(estimate);
    } else {
      setRideEstimate(null);
    }
  }, [pickupCoords, dropoffCoords]);
  // ------------------------------------------------------------

  // ------------------Transform Data for post in backend-----------------------
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  const userId = userInfo?.data?.data?._id;
  const userRole = userInfo?.data?.data?.role;

  //if user data is loading
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center gap-6">
        <Spinner></Spinner>
      </div>
    );
  }

  //if user is Driver role
  if (userRole === "Driver") {
    return (
      <section>
        <div className="container mx-auto py-10 flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-center max-w-md">
            You do not have permission to request a ride. Please log in as a
            user.
          </p>
        </div>
      </section>
    );
  }
  // ------------------------------------------------------------

  // ------------------On Submit Form-----------------------
  async function onSubmit(values: z.input<typeof formSchema>) {
    const transformRideData = (
      values: {
        pickupLocation: string;
        dropoffLocation: string;
        status?:
        | "requested"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
        | undefined;
      },
      userId: any,
      pickupCoords: { lat: number; lng: number } | null,
      dropoffCoords: { lat: number; lng: number } | null
    ) => {
      return {
        userId: userId,
        pickupLocation: {
          address: values.pickupLocation,
          latitude: pickupCoords?.lat,
          longitude: pickupCoords?.lng,
        },
        dropLocation: {
          address: values.dropoffLocation,
          latitude: dropoffCoords?.lat,
          longitude: dropoffCoords?.lng,
        },
        status: values.status,
      };
    };

    // prepare ride data
    const rideData = transformRideData(
      values,
      userId,
      pickupCoords,
      dropoffCoords
    );
    console.log("Ride Data:", rideData);

    // call add ride request mutation
    try {
      const res = await addRideRequest(rideData).unwrap();
      toast.success(`Ride requested successfully!`);
      form.reset();
      if (res?.data?._id) {
        navigate(`/ride-details/${res.data._id}`);
      }
    } catch (err: any) {
      console.error("Request Ride Error:", err);
      toast.error(err?.data?.message || "Failed to request ride");
    }
  }
  // ---------------------------------------------------------------------------

  return (
    <div className="container mx-auto py-10 flex flex-col items-center gap-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Select Location</CardTitle>
          <CardDescription>
            Click on the map to select your {activeField} location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              variant={activeField === "pickup" ? "default" : "outline"}
              onClick={() => setActiveField("pickup")}
              type="button"
            >
              Set Pickup
            </Button>
            <Button
              variant={activeField === "dropoff" ? "default" : "outline"}
              onClick={() => setActiveField("dropoff")}
              type="button"
            >
              Set Dropoff
            </Button>
          </div>
          <MapPicker
            onLocationSelect={handleLocationSelect}
            selectedLocation={
              activeField === "pickup" ? pickupCoords : dropoffCoords
            }
          />
        </CardContent>
      </Card>

      {/* Fare Estimate Card */}
      {rideEstimate && (
        <Card className="w-full max-w-4xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
          <CardHeader>
            <CardTitle className="text-violet-900 dark:text-violet-100">
              Ride Estimate
            </CardTitle>
            <CardDescription>
              Estimated fare and duration for your trip
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Distance */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-violet-100 dark:border-violet-900">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-8 h-8 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">
                      {rideEstimate.distance} km
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Distance
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-violet-100 dark:border-violet-900">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-8 h-8 text-violet-600 dark:text-violet-400"
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
                  <div className="text-center">
                    <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">
                      {rideEstimate.duration}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Duration
                    </p>
                  </div>
                </div>
              </div>

              {/* Fare */}
              <div className="bg-gradient-to-br from-violet-600 to-purple-600 p-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      ৳{rideEstimate.fare}
                    </p>
                    <p className="text-sm text-violet-100">Estimated Fare</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
              <p className="text-xs text-amber-800 dark:text-amber-200 text-center">
                ⓘ This is an estimated fare. Actual fare may vary based on
                traffic, route, and other factors.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Request a Ride</CardTitle>
          <CardDescription>
            Enter your trip details to book a ride.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Select on map"
                          {...field}
                          readOnly
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveField("pickup")}
                        >
                          Map
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropoffLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dropoff Location</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Select on map"
                          {...field}
                          readOnly
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveField("dropoff")}
                        >
                          Map
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Request Ride
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
