import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Clock, Home, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useGetMyDriverProfileQuery } from "@/redux/features/driver/driver.api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DriverApprovalPending() {
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Poll every 5 seconds to check if driver is approved
    const { data: driverProfile, isLoading } = useGetMyDriverProfileQuery(undefined, {
        pollingInterval: 5000, // Poll every 5 seconds
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        // Check if driver is approved
        if (driverProfile?.isApproved && !isRedirecting) {
            setIsRedirecting(true);
            toast.success("🎉 Your driver profile has been approved!");

            // Redirect after a short delay to let user see the success message
            setTimeout(() => {
                navigate("/driver/incoming-requests");
            }, 2000);
        }
    }, [driverProfile, navigate, isRedirecting]);

    return (
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                            <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Waiting for Admin Approval</CardTitle>
                    <CardDescription className="text-base">
                        Your driver registration has been successfully submitted
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Redirecting Message (shown when approved) */}
                    {isRedirecting && (
                        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950 animate-pulse">
                            <Loader2 className="mt-0.5 h-5 w-5 flex-shrink-0 animate-spin text-green-600 dark:text-green-400" />
                            <div className="space-y-1">
                                <p className="font-medium text-green-800 dark:text-green-200">
                                    🎉 Approved! Redirecting to Incoming Requests...
                                </p>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                    Your driver profile has been approved. Taking you to view available rides...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Success Message (shown when pending) */}
                    {!isRedirecting && (
                        <>
                            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                                <div className="space-y-1">
                                    <p className="font-medium text-green-800 dark:text-green-200">
                                        Registration Submitted Successfully!
                                    </p>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        Thank you for registering as a driver. Your profile has been
                                        created and is currently pending admin approval.
                                    </p>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
                                <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    Checking approval status automatically...
                                </p>
                            </div>
                        </>
                    )}

                    {/* What Happens Next */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg">What Happens Next?</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-600 dark:bg-violet-900 dark:text-violet-400">
                                    1
                                </div>
                                <div>
                                    <p className="font-medium">Admin Review</p>
                                    <p className="text-sm text-muted-foreground">
                                        Our admin team will review your driver profile and verify
                                        your information.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-600 dark:bg-violet-900 dark:text-violet-400">
                                    2
                                </div>
                                <div>
                                    <p className="font-medium">Approval Notification</p>
                                    <p className="text-sm text-muted-foreground">
                                        You'll receive a notification once your profile is approved.
                                        This usually takes 24-48 hours.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-600 dark:bg-violet-900 dark:text-violet-400">
                                    3
                                </div>
                                <div>
                                    <p className="font-medium">Start Driving</p>
                                    <p className="text-sm text-muted-foreground">
                                        Once approved, you can access your driver dashboard and
                                        start accepting ride requests.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950">
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            ⚠️ Important Notice
                        </p>
                        <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                            Please ensure your contact information is correct. We may reach
                            out if we need any additional information or clarification.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            onClick={() => navigate("/")}
                            className="flex-1"
                            variant="default"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Go to Homepage
                        </Button>
                        <Button
                            onClick={() => navigate("/contact")}
                            className="flex-1"
                            variant="outline"
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Support
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="rounded-lg bg-muted p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Need help?{" "}
                            <button
                                onClick={() => navigate("/faq")}
                                className="font-medium text-violet-600 hover:underline dark:text-violet-400"
                            >
                                Visit our FAQ
                            </button>{" "}
                            or{" "}
                            <button
                                onClick={() => navigate("/contact")}
                                className="font-medium text-violet-600 hover:underline dark:text-violet-400"
                            >
                                contact support
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
