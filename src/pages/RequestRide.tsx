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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    pickupLocation: z.string().min(2, {
        message: "Pickup location must be at least 2 characters.",
    }),
    dropoffLocation: z.string().min(2, {
        message: "Dropoff location must be at least 2 characters.",
    }),
    vehicleType: z.string({
        required_error: "Please select a vehicle type.",
    }),
    paymentMethod: z.enum(["cash", "card", "wallet"], {
        required_error: "Please select a payment method.",
    }),
});

export default function RequestRide() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pickupLocation: "",
            dropoffLocation: "",
        },
    });

    const vehicleType = form.watch("vehicleType");
    const [fare, setFare] = useState<number | null>(null);

    // Mock fare calculation
    useEffect(() => {
        if (vehicleType) {
            const baseRate = {
                standard: 50,
                premium: 80,
                van: 100,
            };
            // Random distance between 2 and 15 km
            const distance = Math.floor(Math.random() * 13) + 2;
            const rate = baseRate[vehicleType as keyof typeof baseRate] || 50;
            setFare(distance * rate);
        } else {
            setFare(null);
        }
    }, [vehicleType]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast.success(`Ride requested successfully! Estimated Fare: ৳${fare}`);
    }

    return (
        <div className="container mx-auto py-10 flex justify-center">
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
                                            <Input placeholder="123 Main St" {...field} />
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
                                            <Input placeholder="456 Elm St" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                                    <SelectValue placeholder="Select a vehicle" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="standard">Standard</SelectItem>
                                                <SelectItem value="premium">Premium</SelectItem>
                                                <SelectItem value="van">Van</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {fare !== null && (
                                <div className="p-4 bg-muted rounded-md flex justify-between items-center">
                                    <span className="font-medium">Estimated Fare:</span>
                                    <span className="text-xl font-bold text-primary">৳{fare}</span>
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Method</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select payment method" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="cash">Cash</SelectItem>
                                                <SelectItem value="card">Card</SelectItem>
                                                <SelectItem value="wallet">Wallet</SelectItem>
                                            </SelectContent>
                                        </Select>
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
