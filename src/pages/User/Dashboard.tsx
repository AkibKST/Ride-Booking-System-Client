import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export default function UserDashboard() {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const user = userInfo?.data?.data;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.name}</div>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </CardContent>
        </Card>
        {/* Add more summary cards here later */}
      </div>
    </div>
  );
}
