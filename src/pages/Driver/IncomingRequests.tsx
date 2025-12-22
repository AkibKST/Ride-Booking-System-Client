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

export default function IncomingRequests() {
    const navigate = useNavigate();

    // Fetch rides with status="requested" from API
    const { data: requestedRides, isLoading, error } = useGetRequestedRidesQuery(undefined, {
        pollingInterval: 10000, // Poll every 10 seconds for new requests
        refetchOnMountOrArgChange: true,
    });

    const handleAccept = (id: string) => {
        toast.success("Ride Accepted! Navigating to active ride...");
        // TODO: Call API to accept ride
        // In a real app, this would update the backend
        navigate("/driver/active-ride");
    };

    const handleReject = (id: string) => {
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
                                            {ride.user?.name || "User"}
                                        </CardTitle>
                                        <CardDescription>
                                            Status: {ride.status}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="text-lg font-bold">
                                        ${ride.totalFare || "N/A"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Pickup</p>
                                        <p className="font-medium">{ride.pickup?.address || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Navigation className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Dropoff</p>
                                        <p className="font-medium">{ride.destination?.address || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground pt-2 border-t">
                                    Vehicle Type: <span className="font-medium text-foreground capitalize">{ride.vehicleType}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={() => handleReject(ride._id)}>
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
