/* ==================================================================
 * PROFILE PAGE COMPONENT
 * ================================================================== 
 * 
 * Purpose:
 * - Displays and allows editing of user profile information
 * - Works for all user roles: User, Rider, Driver, Admin
 * - Provides password change functionality
 * - Shows role-specific information (e.g., Driver details for drivers)
 * 
 * Features:
 * - Profile information editing (name, phone, email)
 * - Password change with validation
 * - Role-based UI adaptation
 * - Avatar upload support (UI ready, backend integration needed)
 * - Responsive design with modern UI
 * 
 * ================================================================== */

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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyDriverProfileQuery } from "@/redux/features/driver/driver.api";
import { Spinner } from "@/components/ui/spinner";
import { User, Mail, Phone, Shield, Car, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";

/* ==================================================================
 * VALIDATION SCHEMAS
 * ================================================================== */

/**
 * Schema for Profile Information Form
 * Validates user's basic profile data
 */
const profileSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits." })
        .optional(),
});

/**
 * Schema for Password Change Form
 * Ensures secure password updates with confirmation matching
 */
const passwordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." }),
        newPassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." }),
        confirmPassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

/* ==================================================================
 * MAIN COMPONENT
 * ================================================================== */

export default function Profile() {
    /* ================================================================
     * DATA FETCHING
     * ================================================================
     * Fetch user information and driver profile (if user is a driver)
     */

    // Fetch general user information (works for all roles)
    const { data: userInfo, isLoading: isLoadingUser } =
        useUserInfoQuery(undefined);
    const user = userInfo?.data?.data;

    // Fetch driver-specific profile (only if role is Driver)
    const { data: driverProfile, isLoading: isLoadingDriver } =
        useGetMyDriverProfileQuery(undefined, {
            skip: user?.role !== "Driver", // Skip query if not a driver
        });

    /* ================================================================
     * FORM INITIALIZATION
     * ================================================================
     * Set up forms with validation and default values
     */

    // Profile form - for editing basic user information
    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            phone: user?.phone || "",
        },
    });

    // Password form - for changing user password
    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    /* ================================================================
     * FORM HANDLERS
     * ================================================================
     * Handle form submissions for profile and password updates
     */

    /**
     * Handle Profile Information Update
     * @param values - Updated profile data from form
     * 
     * TODO: Integrate with backend API to save profile changes
     * Current implementation: Logs data and shows success toast
     */
    function onProfileSubmit(values: z.infer<typeof profileSchema>) {
        console.log("Profile Update Request:", values);

        // TODO: Call API to update profile
        // Example: await updateProfile(values).unwrap();

        toast.success("Profile updated successfully!");
    }

    /**
     * Handle Password Change
     * @param values - Password change data from form
     * 
     * TODO: Integrate with backend API to change password
     * Current implementation: Logs data, resets form, shows success
     */
    function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
        console.log("Password Change Request:", {
            currentPassword: "***", // Don't log actual passwords
            newPassword: "***",
        });

        // TODO: Call API to change password
        // Example: await changePassword({ 
        //   currentPassword: values.currentPassword,
        //   newPassword: values.newPassword 
        // }).unwrap();

        toast.success("Password changed successfully!");
        passwordForm.reset();
    }

    /* ================================================================
     * LOADING STATE
     * ================================================================
     * Show spinner while fetching user data
     */
    if (isLoadingUser || (user?.role === "Driver" && isLoadingDriver)) {
        return (
            <div className="container mx-auto py-10 flex justify-center items-center min-h-[400px]">
                <Spinner />
            </div>
        );
    }

    /* ================================================================
     * ERROR STATE
     * ================================================================
     * Handle case where user data is not available
     */
    if (!user) {
        return (
            <div className="container mx-auto py-10 max-w-2xl">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">
                            Unable to load profile information. Please try again.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    /* ================================================================
     * RENDER
     * ================================================================
     */
    return (
        <div className="container mx-auto py-10 max-w-4xl space-y-6">
            {/* Page Header */}
            <PageHeader
                title="Profile"
                description="Manage your account information and settings"
                icon={<User className="h-6 w-6 text-white" />}
                action={
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        {user.role}
                    </Badge>
                }
            />

            {/* User Information Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Avatar Section */}
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            {/* TODO: Add avatar upload button here */}
                        </div>

                        {/* User Information */}
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100">
                                {user.name}
                            </h2>

                            <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-violet-700 dark:text-violet-300">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>

                                {user.phone && (
                                    <>
                                        <Separator
                                            orientation="vertical"
                                            className="hidden md:block h-4"
                                        />
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            <span>{user.phone}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ============================================================
       * DRIVER INFORMATION CARD (Driver Role Only)
       * ============================================================
       * Shows driver-specific details like vehicle info, license
       */}
            {user.role === "Driver" && driverProfile && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Car className="h-5 w-5" />
                            Driver Information
                        </CardTitle>
                        <CardDescription>
                            Your driver profile and vehicle details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* License Number */}
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">License Number</p>
                                <p className="font-medium">
                                    {driverProfile.licenseNumber || "Not provided"}
                                </p>
                            </div>

                            {/* Vehicle Type */}
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Vehicle Type</p>
                                <p className="font-medium capitalize">
                                    {driverProfile.vehicleType || "Not specified"}
                                </p>
                            </div>

                            {/* Vehicle Number */}
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Vehicle Number
                                </p>
                                <p className="font-medium">
                                    {driverProfile.vehicleNumber || "Not provided"}
                                </p>
                            </div>

                            {/* Vehicle Color */}
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Vehicle Color</p>
                                <p className="font-medium capitalize">
                                    {driverProfile.vehicleColor || "Not specified"}
                                </p>
                            </div>

                            {/* Availability Status */}
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Availability Status
                                </p>
                                <Badge
                                    variant={
                                        driverProfile.availabilityStatus === "online"
                                            ? "default"
                                            : "secondary"
                                    }
                                    className="capitalize"
                                >
                                    {driverProfile.availabilityStatus || "Offline"}
                                </Badge>
                            </div>

                            {/* Account Status */}
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Account Status</p>
                                <Badge
                                    variant={
                                        driverProfile.isBlocked ? "destructive" : "default"
                                    }
                                >
                                    {driverProfile.isBlocked ? "Blocked" : "Active"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ============================================================
       * PROFILE INFORMATION FORM
       * ============================================================
       * Editable form for basic profile details
       */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Information
                    </CardTitle>
                    <CardDescription>
                        Update your personal details and contact information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...profileForm}>
                        <form
                            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                            className="space-y-4"
                        >
                            {/* Name Field */}
                            <FormField
                                control={profileForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your full name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone Field */}
                            <FormField
                                control={profileForm.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+880 1700-000000"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Display (Read-only) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{user.email}</span>
                                    <Badge variant="outline" className="ml-auto">
                                        Verified
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Email address cannot be changed
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <Button type="submit" className="w-full md:w-auto">
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* ============================================================
       * PASSWORD CHANGE FORM
       * ============================================================
       * Secure password update with current password verification
       */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Change Password
                    </CardTitle>
                    <CardDescription>
                        Ensure your account is using a strong, unique password to stay
                        secure
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form
                            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                            className="space-y-4"
                        >
                            {/* Current Password */}
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter current password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* New Password */}
                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter new password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm New Password */}
                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm new password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Security Note */}
                            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
                                <p className="text-xs text-amber-800 dark:text-amber-200">
                                    ⓘ Use a strong password with at least 8 characters, including
                                    uppercase, lowercase, numbers, and symbols.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    className="w-full md:w-auto"
                                >
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
