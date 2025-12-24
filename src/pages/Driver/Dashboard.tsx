import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MapPin, Navigation, Power } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  useSetDriverAvailabilityMutation,
  useGetMyDriverProfileQuery,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";

export default function DriverDashboard() {
  // Fetch current driver profile data
  const { data: driverData } = useGetMyDriverProfileQuery(undefined);
  const [setAvailability, { isLoading }] = useSetDriverAvailabilityMutation();
  const driverId = driverData?._id;
  const [isOnline, setIsOnline] = useState<string | undefined>(undefined);

  /**
   * Sync local state with fetched backend data.
   * This ensures the toggle reflects the actual database status when the page loads.
   */
  useEffect(() => {
    if (driverData?.availabilityStatus) {
      setIsOnline(driverData.availabilityStatus);
    }
  }, [driverData]);

  const handleAvailabilityChange = async (value: boolean) => {
    try {
      if (!driverId) {
        toast.error("Driver ID not found");
        return;
      }

      const newStatus = value ? "online" : "offline";

      // Optimistic update: Update UI immediately before API response
      setIsOnline(newStatus);

      // Send the new status to the backend
      await setAvailability({
        id: driverId,
        data: { availabilityStatus: newStatus },
      }).unwrap();

      toast.success(
        value ? "You are now online" : "You are now offline"
      );
    } catch (error) {
      // Revert state on error if the API call fails
      setIsOnline(value ? "offline" : "online");
      toast.error("Failed to update availability status");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <div className="flex items-center gap-4 bg-muted p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Power
              className={`h-5 w-5 ${isOnline ? "text-green-500" : "text-muted-foreground"
                }`}
            />
            <Label htmlFor="availability-mode" className="font-medium">
              {isOnline === "online" ? "You are Online" : "You are Offline"}
            </Label>
          </div>
          <Switch
            id="availability-mode"
            checked={isOnline === "online" ? true : false}
            onCheckedChange={handleAvailabilityChange}
            disabled={isLoading}
          />
        </div>
      </div>

      {isOnline !== "online" && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-sm"
          role="alert"
        >
          <p className="font-bold">You are currently offline</p>
          <p>Go online to start receiving ride requests.</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234.56</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rides</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Currently in transit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Rides
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+12 since last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
