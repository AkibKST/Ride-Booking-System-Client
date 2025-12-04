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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useNavigate } from "react-router";
import MapPicker from "@/components/MapPicker";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Spinner } from "@/components/ui/spinner";
import { useAddRideRequestMutation } from "@/redux/features/ride/ride.api";

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
