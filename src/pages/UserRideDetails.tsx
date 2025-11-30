import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetRideQuery } from "@/redux/features/ride/ride.api";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { Link, useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";

export default function UserRideDetails() {
    const { id } = useParams();
    const { data: ride, isLoading } = useGetRideQuery(id as string, { skip: !id });

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
                                <Badge className="capitalize text-lg px-4 py-1">{ride.status.replace("_", " ")}</Badge>
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
                                <p className="text-muted-foreground">No driver assigned yet.</p>
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
