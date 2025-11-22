import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Phone, User } from "lucide-react";
import { Link, useParams } from "react-router";

// Mock Data (in a real app, fetch based on ID)
const mockRideDetails = {
    id: "1",
    date: "March 10, 2024",
    time: "10:30 AM",
    pickup: "123 Main St, City Center",
    dropoff: "456 Elm St, Suburbia",
    fare: 150,
    status: "completed",
    driver: {
        name: "Rahim Uddin",
        rating: 4.8,
        phone: "+8801712345678",
        vehicle: "Toyota Corolla (Blue) - DHAKA METRO GA 12-3456",
        image: "https://github.com/shadcn.png", // Placeholder
    },
    timeline: [
        { time: "10:30 AM", event: "Ride Requested" },
        { time: "10:35 AM", event: "Driver Assigned" },
        { time: "10:45 AM", event: "Driver Arrived" },
        { time: "10:46 AM", event: "Trip Started" },
        { time: "11:15 AM", event: "Trip Completed" },
    ],
};

export default function UserRideDetails() {
    const { id } = useParams();
    // In a real app, use id to fetch data. Using mock data for now.
    const ride = mockRideDetails;

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <Button variant="ghost" asChild className="mb-6">
                <Link to="/ride-history">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
                </Link>
            </Button>

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
                                <span className="text-muted-foreground">Map View Placeholder</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-green-500 mt-1" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pickup</p>
                                        <p className="font-medium">{ride.pickup}</p>
                                        <p className="text-xs text-muted-foreground">{ride.time}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-red-500 mt-1" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Dropoff</p>
                                        <p className="font-medium">{ride.dropoff}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Status Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {ride.timeline.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-20 text-sm text-muted-foreground text-right">
                                            {item.time}
                                        </div>
                                        <div className="relative border-l pl-4 pb-4 last:pb-0 last:border-l-0">
                                            <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                                            <p className="text-sm font-medium">{item.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Driver & Fare Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Driver Details</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="h-20 w-20 rounded-full bg-muted overflow-hidden">
                                    <img
                                        src={ride.driver.image}
                                        alt={ride.driver.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold">{ride.driver.name}</h3>
                            <div className="flex justify-center items-center gap-1 mb-2">
                                <span className="text-yellow-500">★</span>
                                <span>{ride.driver.rating}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                {ride.driver.vehicle}
                            </p>
                            <Button variant="outline" className="w-full">
                                <Phone className="mr-2 h-4 w-4" /> Call Driver
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-muted-foreground">Total Fare</span>
                                <span className="text-xl font-bold">৳{ride.fare}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Status</span>
                                <Badge className="bg-green-500 capitalize">{ride.status}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
