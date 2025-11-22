import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, MapPin, Navigation, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const steps = ["Picked Up", "In Transit", "Completed"];

export default function ActiveRide() {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const handleStatusUpdate = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
            toast.success(`Status updated to: ${steps[currentStep + 1]}`);
        } else {
            toast.success("Ride Completed!");
            navigate("/driver/dashboard");
        }
    };

    const handleSOS = () => {
        toast.error("SOS Alert Sent! Emergency contacts notified.");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Active Ride</h1>
                <Button variant="destructive" onClick={handleSOS} className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    SOS Emergency
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Ride Details */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Rider Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Alice Johnson</p>
                                <p className="text-muted-foreground">4.8 ⭐</p>
                            </div>
                            <Button size="icon" variant="outline" className="ml-auto">
                                <Phone className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pickup</p>
                                    <p className="font-medium">Central Station</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Navigation className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Dropoff</p>
                                    <p className="font-medium">City Mall</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-muted-foreground">Estimated Fare</span>
                                <span className="font-bold text-lg">$12.50</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Payment Method</span>
                                <Badge variant="secondary">Cash</Badge>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={handleStatusUpdate}>
                            {currentStep < steps.length - 1
                                ? `Mark as ${steps[currentStep + 1]}`
                                : "Complete Ride"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Map Placeholder */}
                <Card className="lg:col-span-2 min-h-[400px] flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Live Route</CardTitle>
                            <Badge>{steps[currentStep]}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 bg-muted/50 m-6 rounded-lg flex items-center justify-center border-2 border-dashed">
                        <div className="text-center text-muted-foreground">
                            <Navigation className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Map View Placeholder</p>
                            <p className="text-sm">Real-time tracking would be implemented here</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
