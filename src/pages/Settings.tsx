/* ==================================================================
 * SETTINGS PAGE COMPONENT
 * ================================================================== 
 * 
 * Purpose:
 * - Centralized system settings and preferences management
 * - Works for all user roles: User, Rider, Driver, Admin
 * - Provides various configuration options for personalization
 * 
 * Features:
 * - Notification preferences (Email, SMS, Push)
 * - Privacy settings (Profile visibility, Data sharing)
 * - Appearance settings (Theme, Language)
 * - Security settings (Two-factor auth, Session management)
 * - Communication preferences
 * - Data management
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState } from "react";
import {
    Bell,
    Shield,
    Palette,
    Globe,
    Lock,
    Database,
    Mail,
    MessageSquare,
    Smartphone,
    Eye,
    Download,
    Trash2,
    Settings as SettingsIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";

/* ==================================================================
 * MAIN COMPONENT
 * ================================================================== */

export default function Settings() {
    /* ================================================================
     * STATE MANAGEMENT
     * ================================================================
     * All setting states - in production, these would be fetched from
     * backend and synced with user preferences
     */

    // Notification Settings
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [rideUpdates, setRideUpdates] = useState(true);
    const [promotionalEmails, setPromotionalEmails] = useState(false);

    // Privacy Settings
    const [profileVisibility, setProfileVisibility] = useState("public");
    const [shareData, setShareData] = useState(false);
    const [showOnlineStatus, setShowOnlineStatus] = useState(true);

    // Appearance Settings
    const [theme, setTheme] = useState("system");
    const [language, setLanguage] = useState("en");

    // Security Settings
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState(true);

    /* ================================================================
     * EVENT HANDLERS
     * ================================================================
     * Handle setting changes and save to backend
     */

    /**
     * Save all settings to backend
     * TODO: Implement API call to save settings
     */
    const handleSaveSettings = () => {
        console.log("Saving settings:", {
            notifications: {
                email: emailNotifications,
                sms: smsNotifications,
                push: pushNotifications,
                rideUpdates,
                promotional: promotionalEmails,
            },
            privacy: {
                profileVisibility,
                shareData,
                showOnlineStatus,
            },
            appearance: {
                theme,
                language,
            },
            security: {
                twoFactorAuth,
                loginAlerts,
            },
        });

        // TODO: API call here
        toast.success("Settings saved successfully!");
    };

    /**
     * Reset all settings to default values
     */
    const handleResetSettings = () => {
        setEmailNotifications(true);
        setSmsNotifications(false);
        setPushNotifications(true);
        setRideUpdates(true);
        setPromotionalEmails(false);
        setProfileVisibility("public");
        setShareData(false);
        setShowOnlineStatus(true);
        setTheme("system");
        setLanguage("en");
        setTwoFactorAuth(false);
        setLoginAlerts(true);

        toast.info("Settings reset to default");
    };

    /**
     * Export user data (GDPR compliance)
     * TODO: Implement data export functionality
     */
    const handleExportData = () => {
        console.log("Exporting user data...");
        toast.success("Data export started. You'll receive an email shortly.");
    };

    /**
     * Delete account (with confirmation)
     * TODO: Implement account deletion with proper confirmation flow
     */
    const handleDeleteAccount = () => {
        toast.error("Account deletion requires confirmation. Feature coming soon.");
    };

    /* ================================================================
     * RENDER
     * ================================================================
     */
    return (
        <div className="container mx-auto py-10 max-w-4xl space-y-6">
            {/* Page Header */}
            <PageHeader
                title="Settings"
                description="Manage your account settings and preferences"
                icon={<SettingsIcon className="h-6 w-6 text-white" />}
                action={
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        All Settings
                    </Badge>
                }
            />

            {/* ============================================================
       * NOTIFICATION SETTINGS
       * ============================================================
       * Configure how and when to receive notifications
       */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Preferences
                    </CardTitle>
                    <CardDescription>
                        Choose how you want to be notified about updates and activities
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Receive notifications via email
                            </p>
                        </div>
                        <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                        />
                    </div>

                    <Separator />

                    {/* SMS Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Receive notifications via text message
                            </p>
                        </div>
                        <Switch
                            id="sms-notifications"
                            checked={smsNotifications}
                            onCheckedChange={setSmsNotifications}
                        />
                    </div>

                    <Separator />

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                <Label htmlFor="push-notifications">Push Notifications</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Receive push notifications on your device
                            </p>
                        </div>
                        <Switch
                            id="push-notifications"
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                        />
                    </div>

                    <Separator />

                    {/* Ride Updates */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="ride-updates">Ride Updates</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified about ride status changes
                            </p>
                        </div>
                        <Switch
                            id="ride-updates"
                            checked={rideUpdates}
                            onCheckedChange={setRideUpdates}
                        />
                    </div>

                    <Separator />

                    {/* Promotional Emails */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="promotional-emails">Promotional Emails</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive updates about new features and offers
                            </p>
                        </div>
                        <Switch
                            id="promotional-emails"
                            checked={promotionalEmails}
                            onCheckedChange={setPromotionalEmails}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ============================================================
       * PRIVACY SETTINGS
       * ============================================================
       * Control data sharing and profile visibility
       */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Privacy & Data
                    </CardTitle>
                    <CardDescription>
                        Control your privacy and how your data is used
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Profile Visibility */}
                    <div className="space-y-2">
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                            <SelectTrigger id="profile-visibility">
                                <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Public - Everyone can see</SelectItem>
                                <SelectItem value="private">Private - Only you</SelectItem>
                                <SelectItem value="friends">Friends Only</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Control who can see your profile information
                        </p>
                    </div>

                    <Separator />

                    {/* Data Sharing */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="share-data">Share Usage Data</Label>
                            <p className="text-sm text-muted-foreground">
                                Help improve our service by sharing anonymous usage data
                            </p>
                        </div>
                        <Switch
                            id="share-data"
                            checked={shareData}
                            onCheckedChange={setShareData}
                        />
                    </div>

                    <Separator />

                    {/* Online Status */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="online-status">Show Online Status</Label>
                            <p className="text-sm text-muted-foreground">
                                Let others see when you're online
                            </p>
                        </div>
                        <Switch
                            id="online-status"
                            checked={showOnlineStatus}
                            onCheckedChange={setShowOnlineStatus}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ============================================================
       * APPEARANCE SETTINGS
       * ============================================================
       * Theme and language preferences
       */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Appearance
                    </CardTitle>
                    <CardDescription>
                        Customize how the application looks and feels
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Theme Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger id="theme">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System Default</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Choose your preferred color theme
                        </p>
                    </div>

                    <Separator />

                    {/* Language Selection */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="language">Language</Label>
                        </div>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                                <SelectItem value="es">Español (Spanish)</SelectItem>
                                <SelectItem value="fr">Français (French)</SelectItem>
                                <SelectItem value="de">Deutsch (German)</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Select your preferred language
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* ============================================================
       * SECURITY SETTINGS
       * ============================================================
       * Enhanced security options
       */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Security
                    </CardTitle>
                    <CardDescription>
                        Enhance your account security with additional features
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                        <Switch
                            id="two-factor"
                            checked={twoFactorAuth}
                            onCheckedChange={setTwoFactorAuth}
                        />
                    </div>

                    <Separator />

                    {/* Login Alerts */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="login-alerts">Login Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified when someone logs into your account
                            </p>
                        </div>
                        <Switch
                            id="login-alerts"
                            checked={loginAlerts}
                            onCheckedChange={setLoginAlerts}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ============================================================
       * DATA MANAGEMENT
       * ============================================================
       * Export and delete account data
       */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Data Management
                    </CardTitle>
                    <CardDescription>
                        Manage your personal data and account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Export Data */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Download className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium">Export Your Data</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Download a copy of all your data
                            </p>
                        </div>
                        <Button variant="outline" onClick={handleExportData}>
                            Export
                        </Button>
                    </div>

                    {/* Delete Account */}
                    <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <p className="font-medium text-destructive">Delete Account</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all data
                            </p>
                        </div>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* ============================================================
       * ACTION BUTTONS
       * ============================================================
       * Save or reset settings
       */}
            <div className="flex items-center gap-4">
                <Button onClick={handleSaveSettings} className="flex-1 md:flex-none">
                    Save Changes
                </Button>
                <Button
                    variant="outline"
                    onClick={handleResetSettings}
                    className="flex-1 md:flex-none"
                >
                    Reset to Default
                </Button>
            </div>
        </div>
    );
}
