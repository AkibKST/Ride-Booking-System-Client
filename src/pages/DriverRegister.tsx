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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAddDriverMutation } from "@/redux/features/driver/driver.api";
import { useNavigate } from "react-router";
import PageHeader from "@/components/PageHeader";
import { Car } from "lucide-react";

const driverRegisterSchema = z.object({
  licenseNumber: z
    .string()
    .min(5, { message: "License number must be at least 5 characters" })
    .max(20, { message: "License number is too long" })
    .regex(/^[A-Z0-9]+$/, {
      message: "License number must contain only uppercase letters and numbers",
    }),
  vehicleType: z.enum(["car", "bike", "suv", "cng"], {
    message: "Please select a valid vehicle type",
  }),
  vehicleNumber: z
    .string()
    .min(3, { message: "Vehicle number is required" })
    .max(15, { message: "Vehicle number is too long" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Vehicle number must contain only uppercase letters and numbers",
    }),
  vehicleColor: z.string().min(1, { message: "Please select a vehicle color" }),
  vehicleModel: z
    .string()
    .min(2, { message: "Vehicle model must be at least 2 characters" })
    .max(50, { message: "Vehicle model is too long" }),
});

export default function DriverRegister() {
  const form = useForm<z.infer<typeof driverRegisterSchema>>({
    resolver: zodResolver(driverRegisterSchema),
    defaultValues: {
      licenseNumber: "",
      vehicleType: "car",
      vehicleNumber: "",
      vehicleColor: "",
      vehicleModel: "",
    },
  });

  const [registerDriver, { isLoading }] = useAddDriverMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof driverRegisterSchema>) => {
    if (!userInfo?.data?.data?._id) {
      toast.error("You must be logged in to register as a driver");
      return;
    }

    // Get current location
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    //for getting current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const driverData = {
          user_id: userInfo.data.data._id,
          licenseNumber: data.licenseNumber,
          isBlocked: false,
          vehicleType: data.vehicleType,
          vehicleNumber: data.vehicleNumber,
          vehicleColor: data.vehicleColor,
          vehicleModel: data.vehicleModel,
          availabilityStatus: "online",
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };

        try {
          const res = await registerDriver(driverData).unwrap();
          console.log("Driver registration response:", res);
          toast.success(
            "Driver registration successful! Wait for admin approval."
          );
          form.reset();
          navigate("/driver-approval-pending");
        } catch (error: any) {
          console.error("Driver Registration Failed:", error);

          // Show specific error messages
          if (error?.data?.message) {
            if (
              error.data.message.includes("already registered") ||
              error.data.message.includes("existing driver")
            ) {
              toast.error("You are already registered as a driver.");
            } else if (error.data.message.includes("license")) {
              toast.error(
                "Invalid license number. Please check and try again."
              );
            } else if (error.data.message.includes("vehicle")) {
              toast.error(
                "Invalid vehicle information. Please check your details."
              );
            } else {
              toast.error(error.data.message);
            }
          } else if (error?.status === 400) {
            toast.error("Invalid driver information. Please check all fields.");
          } else if (error?.status === 401) {
            toast.error("You must be logged in to register as a driver.");
          } else if (error?.status === 409) {
            toast.error("A driver profile already exists for your account.");
          } else if (error?.status >= 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error("Failed to register driver. Please try again.");
          }
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error(
              "Location permission denied. Please enable location access to continue."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error(
              "Location information is unavailable. Please try again."
            );
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out. Please try again.");
            break;
          default:
            toast.error(
              "An unknown error occurred while getting your location."
            );
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <PageHeader
        title="Register as Driver"
        description="Complete your driver profile to start accepting rides"
        icon={<Car className="h-6 w-6 text-white" />}
      />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Driver Details</CardTitle>
          <CardDescription>
            Enter your license and vehicle information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* License Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">License Information</h2>
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver License Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="DL5X9T2R8Y"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                          maxLength={20}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Vehicle Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Vehicle Details</h2>

                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="bike">Bike</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="cng">CNG</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="vehicleNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ABC1234"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.toUpperCase())
                            }
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Color</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="silver">Silver</SelectItem>
                            <SelectItem value="gray">Gray</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="yellow">Yellow</SelectItem>
                            <SelectItem value="brown">Brown</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Model 3, Corolla, etc."
                          {...field}
                          maxLength={50}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Notice */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
                <p className="font-medium">📍 Location Access Required</p>
                <p className="mt-1 text-xs">
                  Your current location will be captured when you submit this
                  form. Please ensure location services are enabled.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register as Driver"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
