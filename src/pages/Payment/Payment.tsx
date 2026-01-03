import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useGetRideQuery, useInitiatePaymentMutation } from "@/redux/features/ride/ride.api";
import { CreditCard, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function Payment() {
    const { rideId } = useParams();
    const navigate = useNavigate();

    const { data: ride, isLoading, error } = useGetRideQuery(rideId as string, {
        skip: !rideId,
    });

    const [initiatePayment, { isLoading: isInitiating }] = useInitiatePaymentMutation();

    const handlePayment = async () => {
        if (!rideId) return;

        try {
            const result = await initiatePayment(rideId).unwrap();

            if (result.paymentUrl) {
                toast.loading("Redirecting to payment gateway...");
                window.location.href = result.paymentUrl;
            } else {
                toast.error("Failed to generate payment link. Please try again.");
            }
        } catch (err: any) {
            console.error("Payment initiation failed:", err);
            toast.error(err?.data?.message || "Payment initiation failed");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (error || !ride) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold text-red-500">Ride not found</h2>
                <Button onClick={() => navigate("/ride-history")}>Back to History</Button>
            </div>
        );
    }

    return (
        <div className="container max-w-lg mx-auto py-12 px-4">
            <Card className="w-full shadow-lg border-t-4 border-t-primary">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-fit">
                        <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Complete Payment</CardTitle>
                    <p className="text-muted-foreground">
                        Please review your ride details and proceed to payment
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium">
                                {new Date(ride.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Time</span>
                            <span className="font-medium">
                                {new Date(ride.createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">Total Amount</span>
                            <span className="font-bold text-2xl text-primary">
                                ৳{ride.totalFare || ride.fare || 0}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-green-500 mt-1" />
                            <div className="text-sm">
                                <p className="font-medium text-muted-foreground">Pickup</p>
                                <p>{ride.pickupLocation.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-red-500 mt-1" />
                            <div className="text-sm">
                                <p className="font-medium text-muted-foreground">Dropoff</p>
                                <p>{ride.dropLocation.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-muted/20 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Distance</p>
                            <p className="font-semibold">{ride.distance || "N/A"} km</p>
                        </div>
                        <div className="bg-muted/20 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-semibold">{ride.duration || "N/A"}</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    <Button
                        className="w-full text-lg h-12"
                        onClick={handlePayment}
                        disabled={isInitiating}
                    >
                        {isInitiating ? (
                            <>
                                <Spinner className="mr-2 h-4 w-4" /> Processing...
                            </>
                        ) : (
                            "Pay with SSL Commerz"
                        )}
                    </Button>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">Secure Payment</Badge>
                        <Badge variant="outline" className="text-xs">Encrypted</Badge>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
