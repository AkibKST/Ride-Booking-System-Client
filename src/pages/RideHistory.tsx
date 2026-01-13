import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router";
import { useGetRideHistoryQuery } from "@/redux/features/ride/ride.api";
import { Spinner } from "@/components/ui/spinner";
import PageHeader from "@/components/PageHeader";
import { History } from "lucide-react";

export default function RideHistory() {
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Fetch ride history from API
    const { data: rides, isLoading, error } = useGetRideHistoryQuery(
        filterStatus === "all" ? {} : { status: filterStatus },
        {
            pollingInterval: 30000, // Poll every 30 seconds for updates
            refetchOnMountOrArgChange: true,
        }
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-500">Completed</Badge>;
            case "cancelled":
                return <Badge variant="destructive">Cancelled</Badge>;
            case "in_progress":
            case "picked_up":
            case "accepted":
                return <Badge className="bg-blue-500">Ongoing</Badge>;
            case "requested":
                return <Badge className="bg-yellow-500">Requested</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getPickupAddress = (ride: any) => {
        return ride.pickupLocation?.address || "N/A";
    };

    const getDropoffAddress = (ride: any) => {
        return ride.dropLocation?.address || "N/A";
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Ride History"
                description="View all your past and ongoing rides"
                icon={<History className="h-6 w-6 text-white" />}
            />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Ride History</CardTitle>
                    <div className="w-[180px]">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Rides</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="picked_up">Picked Up</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Spinner />
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500">
                            Error loading ride history. Please try again later.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>User/Driver</TableHead>
                                    <TableHead>Pickup</TableHead>
                                    <TableHead>Dropoff</TableHead>
                                    <TableHead>Fare</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rides && rides.length > 0 ? (
                                    rides.map((ride: any) => (
                                        <TableRow key={ride._id}>
                                            <TableCell>
                                                {format(new Date(ride.createdAt), "PP p")}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    {ride.driverId && (
                                                        <span className="text-sm text-muted-foreground">
                                                            Driver: <span className="font-medium text-foreground">{ride.driverId.name || "Unknown"}</span>
                                                        </span>
                                                    )}
                                                    {ride.userId && (
                                                        <span className="text-sm text-muted-foreground">
                                                            User: <span className="font-medium text-foreground">{ride.userId.name || "Unknown"}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[150px] truncate">
                                                {getPickupAddress(ride)}
                                            </TableCell>
                                            <TableCell className="max-w-[150px] truncate">
                                                {getDropoffAddress(ride)}
                                            </TableCell>
                                            <TableCell>৳{ride.totalFare || ride.fare || "0"}</TableCell>
                                            <TableCell>{getStatusBadge(ride.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link to={`/ride-details/${ride._id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12">
                                            <div className="text-muted-foreground">
                                                No rides found.
                                                {filterStatus !== "all" && (
                                                    <p className="text-sm mt-2">
                                                        Try changing the filter or{" "}
                                                        <button
                                                            onClick={() => setFilterStatus("all")}
                                                            className="text-primary underline"
                                                        >
                                                            view all rides
                                                        </button>
                                                    </p>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
