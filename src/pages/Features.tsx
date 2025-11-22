import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Car, ShieldCheck, User } from "lucide-react";
import { useState } from "react";

export default function Features() {
    const [activeTab, setActiveTab] = useState("rider");

    return (
        <div className="container mx-auto py-16 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">
                    Platform <span className="text-primary">Features</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover what makes our ride booking system the best choice for riders,
                    drivers, and administrators.
                </p>
            </div>

            <div className="w-full max-w-4xl mx-auto">
                <div className="grid w-full grid-cols-3 mb-8 bg-muted p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab("rider")}
                        className={cn(
                            "py-2.5 text-sm font-medium rounded-md transition-all",
                            activeTab === "rider"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-background/50"
                        )}
                    >
                        For Riders
                    </button>
                    <button
                        onClick={() => setActiveTab("driver")}
                        className={cn(
                            "py-2.5 text-sm font-medium rounded-md transition-all",
                            activeTab === "driver"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-background/50"
                        )}
                    >
                        For Drivers
                    </button>
                    <button
                        onClick={() => setActiveTab("admin")}
                        className={cn(
                            "py-2.5 text-sm font-medium rounded-md transition-all",
                            activeTab === "admin"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-background/50"
                        )}
                    >
                        For Admins
                    </button>
                </div>

                {/* Rider Features */}
                {activeTab === "rider" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <User className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Easy Booking</CardTitle>
                                    <CardDescription>
                                        Request a ride in seconds with our intuitive interface.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        <li>Instant ride requests</li>
                                        <li>Scheduled bookings</li>
                                        <li>Multiple vehicle types</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <ShieldCheck className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Safety First</CardTitle>
                                    <CardDescription>
                                        Your safety is our top priority with tracked rides.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        <li>Real-time ride tracking</li>
                                        <li>SOS Emergency Button</li>
                                        <li>Verified drivers</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Car className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Transparent Pricing</CardTitle>
                                    <CardDescription>
                                        Know your fare before you ride. No hidden fees.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        <li>Upfront fare estimation</li>
                                        <li>Multiple payment methods</li>
                                        <li>Ride history & receipts</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Driver Features */}
                {activeTab === "driver" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <Car className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Flexible Earnings</CardTitle>
                                    <CardDescription>
                                        Drive when you want and earn what you need.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        <li>Online/Offline toggle</li>
                                        <li>Instant payout options</li>
                                        <li>Earnings dashboard</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <User className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Ride Management</CardTitle>
                                    <CardDescription>
                                        Full control over your ride requests.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        <li>Accept/Reject requests</li>
                                        <li>Navigation integration</li>
                                        <li>Trip history</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Admin Features */}
                {activeTab === "admin" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <ShieldCheck className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>User Management</CardTitle>
                                    <CardDescription>
                                        Oversee all users on the platform.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        <li>Block/Unblock users</li>
                                        <li>Verify driver documents</li>
                                        <li>Manage roles</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Car className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>Analytics & Oversight</CardTitle>
                                    <CardDescription>
                                        Data-driven insights for better decision making.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        <li>Ride volume trends</li>
                                        <li>Revenue analytics</li>
                                        <li>System-wide settings</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
