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

const driverRegisterSchema = z.object({
    name: z.string().min(3, { error: "Name is too short" }).max(50),
    email: z.email(),
    address: z.string().min(5, { error: "Address is too short" }),
    contactNumber: z.string().min(10, { error: "Contact number is too short" }),
    phoneNumber: z.string().min(10, { error: "Phone number is too short" }),
    vehicleType: z.string().min(1, { error: "Vehicle type is required" }),
    vehicleModel: z.string().min(2, { error: "Vehicle model is required" }),
    licensePlate: z.string().min(5, { error: "License plate is required" }),
});

export default function DriverRegister() {
    const form = useForm<z.infer<typeof driverRegisterSchema>>({
        resolver: zodResolver(driverRegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            contactNumber: "",
            phoneNumber: "",
            vehicleType: "",
            vehicleModel: "",
            licensePlate: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof driverRegisterSchema>) => {
        console.log("Driver Registration Data:", data);
        // TODO: Integrate with backend API
        toast.success("Driver registration submitted! (Mock)");
    };

    return (
        <div className="container mx-auto flex justify-center py-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Register as Driver</CardTitle>
                    <CardDescription>
                        Enter your details to start driving
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Details */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Personal Details</h2>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@example.com"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123 Main St, City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="contactNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1234567890" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0987654321" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                        name="vehicleModel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vehicle Model</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Toyota Corolla" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="licensePlate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>License Plate</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="ABC-1234" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
                                Register Driver
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
