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
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Mock data for incoming requests
const mockRequests = [
    {
        id: "req_1",
        rider: "Alice Johnson",
        pickup: "Central Station",
        dropoff: "City Mall",
        distance: "3.5 km",
        fare: "$12.50",
        rating: 4.8,
    },
    {
        id: "req_2",
        rider: "Bob Smith",
        pickup: "Airport Terminal 1",
        dropoff: "Grand Hotel",
        distance: "15.2 km",
        fare: "$45.00",
        rating: 4.5,
    },
];

export default function IncomingRequests() {
    const [requests, setRequests] = useState(mockRequests);
    const navigate = useNavigate();

    const handleAccept = (id: string) => {
        toast.success("Ride Accepted! Navigating to active ride...");
        // In a real app, this would update the backend
        setRequests((prev) => prev.filter((req) => req.id !== id));
        navigate("/driver/active-ride");
    };

    const handleReject = (id: string) => {
        toast.info("Ride Rejected");
        setRequests((prev) => prev.filter((req) => req.id !== id));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Incoming Requests</h1>

            {requests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No new requests at the moment. Stay online!
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {requests.map((request) => (
                        <Card key={request.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            {request.rider}
                                        </CardTitle>
                                        <CardDescription>Rating: {request.rating} ⭐</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="text-lg font-bold">
                                        {request.fare}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Pickup</p>
                                        <p className="font-medium">{request.pickup}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Navigation className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Dropoff</p>
                                        <p className="font-medium">{request.dropoff}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground pt-2 border-t">
                                    Est. Distance: <span className="font-medium text-foreground">{request.distance}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={() => handleReject(request.id)}>
                                    Reject
                                </Button>
                                <Button onClick={() => handleAccept(request.id)}>Accept</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
