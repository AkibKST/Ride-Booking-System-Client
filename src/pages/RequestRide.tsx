/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * ============================================================================
 * IMPORTS SECTION
 * ============================================================================
 * Component and UI library imports for form handling, notifications, and UI
 */
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
import PageHeader from "@/components/PageHeader";
import { Navigation } from "lucide-react";

/**
 * ============================================================================
 * FORM VALIDATION SCHEMA
 * ============================================================================
 * Zod schema for form validation and type safety
 *
 * Fields:
 * - pickupLocation: Starting point address (min 2 characters)
 * - dropoffLocation: Destination address (min 2 characters)
 * - distance: Calculated trip distance in kilometers
 * - fare: Calculated trip fare amount
 * - duration: Estimated trip duration
 * - status: Ride request status (default: "requested")
 */
const formSchema = z.object({
  pickupLocation: z.string().min(2, {
    message: "Pickup location must be at least 2 characters.",
  }),
  dropoffLocation: z.string().min(2, {
    message: "Dropoff location must be at least 2 characters.",
  }),
  distance: z.number().optional(),
  fare: z.number().optional(),
  duration: z.string().optional(),
  status: z
    .enum(["requested", "accepted", "in_progress", "completed", "cancelled"])
    .default("requested"),
});

/**
 * ============================================================================
 * REQUEST RIDE COMPONENT
 * ============================================================================
 * Main component for handling ride requests with interactive map-based
 * location selection and real-time fare estimation.
 *
 * Key Features:
 * • Interactive map-based location selection (pickup & dropoff)
 * • Real-time ride fare, distance, and duration estimation
 * • Form validation using Zod schema
 * • Role-based access control (riders only, not drivers)
 * • Automatic navigation to ride details page after successful booking
 *
 * @component
 * @returns {JSX.Element} The RequestRide component UI
 */
export default function RequestRide() {
  const navigate = useNavigate();

  /**
   * ========================================================================
   * FORM INITIALIZATION
   * ========================================================================
   * Initializes form with react-hook-form and Zod validation resolver
   * Sets default values for all form fields
   */
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      distance: 0,
      fare: 0,
      duration: "",
    },
  });

  /**
   * ========================================================================
   * API MUTATIONS & QUERIES
   * ========================================================================
   */

  /**
   * Mutation hook for submitting ride request to backend
   * Handles the API call to create a new ride request
   */
  const [addRideRequest] = useAddRideRequestMutation();

  /**
   * ========================================================================
   * STATE MANAGEMENT - LOCATION SELECTION
   * ========================================================================
   * Tracks user interactions with the map picker and selected coordinates
   */

  /**
   * Active field state: determines which location (pickup/dropoff) is
   * currently being edited on the interactive map
   */
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

  /**
   * ========================================================================
   * STATE MANAGEMENT - RIDE ESTIMATION
   * ========================================================================
   */

  /**
   * Ride estimate state containing calculated fare, distance, and duration
   * Updated automatically when both pickup and dropoff coordinates are set
   */
  const [rideEstimate, setRideEstimate] = useState<RideEstimate | null>(null);

  /**
   * ========================================================================
   * EVENT HANDLERS
   * ========================================================================
   */

  /**
   * Handle Location Selection from MapPicker Component
   *
   * Processes map click events to set either pickup or dropoff location
   * Stores GPS coordinates and updates form field with formatted address
   *
   * @param lat - Latitude coordinate selected on map
   * @param lng - Longitude coordinate selected on map
   */
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

  /**
   * ========================================================================
   * EFFECT HOOKS
   * ========================================================================
   */

  /**
   * Calculate Ride Estimate Effect
   *
   * Triggered whenever pickup or dropoff coordinates change
   * Calculates distance, fare, and duration using the getRideEstimate utility
   * Automatically populates form fields with calculated values
   *
   * Dependencies: [pickupCoords, dropoffCoords, form]
   */
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const estimate = getRideEstimate(pickupCoords, dropoffCoords);
      setRideEstimate(estimate);
      // Set form values with ride estimate data
      form.setValue("distance", estimate.distance);
      form.setValue("fare", estimate.fare);
      form.setValue("duration", estimate.duration);
    } else {
      setRideEstimate(null);
    }
  }, [pickupCoords, dropoffCoords, form]);

  /**
   * ========================================================================
   * AUTHENTICATION & AUTHORIZATION
   * ========================================================================
   */

  /**
   * User authentication query hook
   * Fetches current user information including role and ID
   */
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  const userId = userInfo?.data?.data?._id;
  const userRole = userInfo?.data?.data?.role;

  /**
   * Loading State Handler
   * Display loading spinner while fetching user information
   */
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center gap-6">
        <Spinner></Spinner>
      </div>
    );
  }

  /**
   * Role-Based Access Control
   * Prevents drivers from accessing the ride request feature
   * Only riders (non-driver users) can request rides
   */
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

  /**
   * ========================================================================
   * FORM SUBMISSION HANDLER
   * ========================================================================
   */

  /**
   * Handle Ride Request Form Submission
   *
   * Main form submission handler that processes ride request data
   *
   * Process Flow:
   * 1. Transform form values into backend-compatible format
   * 2. Include location coordinates and calculated ride estimates
   * 3. Submit ride request to backend API
   * 4. Handle success/error responses with user notifications
   * 5. Navigate to ride details page on successful submission
   *
   * @param values - Validated form field values from react-hook-form
   */
  async function onSubmit(values: z.input<typeof formSchema>) {
    /**
     * Transform Ride Request Data
     *
     * Converts form input and state values into the API request format
     * Structures location data with both address and GPS coordinates
     * Includes calculated fare, distance, and duration estimates
     *
     * @param values - Form values including addresses and status
     * @param fare - Calculated fare amount
     * @param distance - Calculated distance in kilometers
     * @param duration - Estimated duration string
     * @param userId - Current user's ID for ride association
     * @param pickupCoords - Pickup location GPS coordinates
     * @param dropoffCoords - Dropoff location GPS coordinates
     * @returns Formatted ride data object for backend submission
     */
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
      fare: number,
      distance: number,
      duration: string,
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
        fare: fare,
        distance: distance,
        duration: duration,
        status: values.status,
      };
    };

    // Prepare ride data with current form values and estimates
    const rideData = transformRideData(
      values,
      rideEstimate ? rideEstimate.fare : 0,
      rideEstimate ? rideEstimate.distance : 0,
      rideEstimate ? rideEstimate.duration : "",
      userId,
      pickupCoords,
      dropoffCoords
    );

    /**
     * Debug Logging (Commented out)
     * Uncomment for development/testing purposes
     */
    // console.log("=== RIDE REQUEST DEBUG ===");
    // console.log("Ride Estimate:", rideEstimate);
    // console.log("Prepared Ride Data:", rideData);
    // console.log("Fare being sent:", rideData.fare);

    /**
     * Submit Ride Request to Backend
     * Handle success and error scenarios with user feedback
     */
    try {
      const res = await addRideRequest(rideData).unwrap();
      console.log("Backend Response:", res);

      // Show success notification
      toast.success(`Ride requested successfully!`);

      // Reset form fields
      form.reset();

      // Navigate to ride details page if ride was created
      if (res?.data?._id) {
        navigate(`/user-ride-details/${res.data._id}`);
      }
    } catch (err: any) {
      console.error("Request Ride Error:", err);
      // Show error notification with backend message or fallback message
      toast.error(err?.data?.message || "Failed to request ride");
    }
  }

  /**
   * ========================================================================
   * COMPONENT RENDER
   * ========================================================================
   */

  return (
    <div className="container mx-auto py-6 flex flex-col items-center gap-6">
      {/* Page Header Section */}
      <PageHeader
        className="w-full max-w-4xl"
        title="Request a Ride"
        description="Book your ride by selecting pickup and dropoff locations"
        icon={<Navigation className="h-6 w-6 text-white" />}
      />

      {/* Map Location Picker Card */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Select Location</CardTitle>
          <CardDescription>
            Click on the map to select your {activeField} location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Toggle Buttons for Pickup/Dropoff Selection */}
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

          {/* Interactive Map Component */}
          <MapPicker
            onLocationSelect={handleLocationSelect}
            selectedLocation={
              activeField === "pickup" ? pickupCoords : dropoffCoords
            }
          />
        </CardContent>
      </Card>

      {/* Fare Estimate Display Card */}
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
              {/* Distance Card */}
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

              {/* Duration Card */}
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

              {/* Fare Card (Highlighted) */}
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

            {/* Disclaimer Message */}
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
              <p className="text-xs text-amber-800 dark:text-amber-200 text-center">
                ⓘ This is an estimated fare. Actual fare may vary based on
                traffic, route, and other factors.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ride Request Form Card */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Request a Ride</CardTitle>
          <CardDescription>
            Enter your trip details to book a ride.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Pickup Location Field */}
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

              {/* Dropoff Location Field */}
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!rideEstimate || !rideEstimate.fare}
              >
                {!rideEstimate
                  ? "Select locations to continue"
                  : "Request Ride"}
              </Button>

              {/* Helper Message */}
              {!rideEstimate && (
                <p className="text-sm text-muted-foreground text-center">
                  Please select both pickup and dropoff locations on the map
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
