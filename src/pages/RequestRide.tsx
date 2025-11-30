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
import MapPicker from "@/components/MapPicker";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

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

export default function RequestRide() {
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
    },
  });

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

  // ------------------Transform Data for post in backend-----------------------
  const { data: userInfo } = useUserInfoQuery(undefined);

  const userId = userInfo?.data?.data?._id;
  const userRole = userInfo?.data?.data?.role;

  if (userRole !== "user") {
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
  } else {
    console.log("User ID:", userId);
  }
  // const transformRideData = (values, userId) => {
  //   return {
  //     userId: userId, // You need to get this from your auth state
  //     pickupLocation: {
  //       address: values.pickupLocation,
  //       latitude: values.pickupCoords.lat,
  //       longitude: values.pickupCoords.lng,
  //     },
  //     dropLocation: {
  //       address: values.dropoffLocation,
  //       latitude: values.dropoffCoords.lat,
  //       longitude: values.dropoffCoords.lng,
  //     },
  //     status: values.status,
  //   };
  // };
  // ---------------------------------------------------------------------------

  function onSubmit(values: z.input<typeof formSchema>) {
    console.log({ ...values, pickupCoords, dropoffCoords });
    toast.success(`Ride requested successfully!`);
  }

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
