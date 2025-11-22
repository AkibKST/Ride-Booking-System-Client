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

// Mock Data
const mockRides = [
    {
        id: "1",
        date: new Date("2024-03-10T10:30:00"),
        pickup: "123 Main St",
        dropoff: "456 Elm St",
        fare: 150,
        status: "completed",
    },
    {
        id: "2",
        date: new Date("2024-03-12T14:15:00"),
        pickup: "789 Oak Ave",
        dropoff: "101 Pine Rd",
        fare: 200,
        status: "cancelled",
    },
    {
        id: "3",
        date: new Date("2024-03-15T09:00:00"),
        pickup: "Central Station",
        dropoff: "City Mall",
        fare: 120,
        status: "completed",
    },
    {
        id: "4",
        date: new Date("2024-03-18T18:45:00"),
        pickup: "Airport Terminal 1",
        dropoff: "Grand Hotel",
        fare: 450,
        status: "ongoing",
    },
];

export default function RideHistory() {
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const filteredRides =
        filterStatus === "all"
            ? mockRides
            : mockRides.filter((ride) => ride.status === filterStatus);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-500">Completed</Badge>;
            case "cancelled":
                return <Badge variant="destructive">Cancelled</Badge>;
            case "ongoing":
                return <Badge className="bg-blue-500">Ongoing</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="container mx-auto py-10">
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
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Pickup</TableHead>
                                <TableHead>Dropoff</TableHead>
                                <TableHead>Fare</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRides.map((ride) => (
                                <TableRow key={ride.id}>
                                    <TableCell>{format(ride.date, "PP p")}</TableCell>
                                    <TableCell>{ride.pickup}</TableCell>
                                    <TableCell>{ride.dropoff}</TableCell>
                                    <TableCell>৳{ride.fare}</TableCell>
                                    <TableCell>{getStatusBadge(ride.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link to={`/ride-details/${ride.id}`}>View Details</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredRides.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">
                                        No rides found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
