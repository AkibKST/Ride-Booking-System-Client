import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/userApi";
import { toast } from "sonner";
import type { IUser } from "@/types";
import PageHeader from "@/components/PageHeader";
import { Users } from "lucide-react";

export default function UserManagement() {
  const { data: users, isLoading } = useGetAllUsersQuery({});

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleStatusChange = async (user: IUser, checked: boolean) => {
    try {
      console.log(user._id);
      await updateUserStatus({ id: user._id }).unwrap();
      toast.success(`User ${checked ? "blocked" : "unblocked"} successfully`);
    } catch (error) {
      toast.error("Failed to update user status");
      console.error("Failed to update user status", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage all users and their account status"
        icon={<Users className="h-6 w-6 text-white" />}
      />
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
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${user.isActive === "BLOCKED"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                  >
                    {user.isActive === "BLOCKED" ? "Blocked" : "Active"}
                  </span>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.isActive === "BLOCKED"}
                    onCheckedChange={(checked) =>
                      handleStatusChange(user, checked)
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
