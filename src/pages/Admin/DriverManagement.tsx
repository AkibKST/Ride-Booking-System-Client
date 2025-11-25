/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { IDriver } from "@/types";
import {
  useApprovedSuspendToggleMutation,
  useGetDriversQuery,
} from "@/redux/features/driver/driver.api";

export default function DriverManagement() {
  const { data: drivers, isLoading } = useGetDriversQuery({});
  console.log(drivers);

  const [approvedSuspendToggle] = useApprovedSuspendToggleMutation();

  const handleStatusChange = async (driver: IDriver, checked: boolean) => {
    try {
      await approvedSuspendToggle({ id: driver._id }).unwrap();
      toast.success(`Driver ${checked ? "blocked" : "unblocked"} successfully`);
    } catch (error) {
      toast.error("Failed to update driver status");
      console.error("Failed to update driver status", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Driver Management</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Block User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers?.map((driver: any) => (
              <TableRow key={driver?._id}>
                <TableCell className="font-medium">
                  {driver?.user_id?.name}
                </TableCell>
                <TableCell>{driver?.user_id?.email}</TableCell>
                <TableCell>{driver?.user_id?.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      driver.isActive === "false"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {driver.isApproved === "false" ? "Blocked" : "Approved"}
                  </span>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={driver.isApproved === "false"}
                    onCheckedChange={(checked) =>
                      handleStatusChange(driver, checked)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
