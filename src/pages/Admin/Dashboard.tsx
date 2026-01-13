import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDriversQuery } from "@/redux/features/driver/driver.api";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import {
  BarChart3,
  Users,
  Car,
  TrendingUp,
  Activity,
  PieChart as PieIcon,
  BarChart3 as BarChartIcon,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 7000 },
];

const userGrowthData = [
  { name: "Mon", users: 120, drivers: 5 },
  { name: "Tue", users: 132, drivers: 8 },
  { name: "Wed", users: 101, drivers: 3 },
  { name: "Thu", users: 134, drivers: 9 },
  { name: "Fri", users: 190, drivers: 12 },
  { name: "Sat", users: 230, drivers: 15 },
  { name: "Sun", users: 210, drivers: 10 },
];

const rideStatsData = [
  { name: "Completed", value: 450 },
  { name: "Cancelled", value: 50 },
  { name: "Active", value: 30 },
];

export default function AdminDashboard() {
  const { data: users, isLoading } = useGetAllUsersQuery({});
  const { data: drivers } = useGetDriversQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        description="Overview of your platform performance and statistics"
        icon={<BarChartIcon className="h-6 w-6 text-white" />}
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length}</div>
            <p className="text-xs text-muted-foreground">
              +180 new users this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Drivers
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drivers?.length}</div>
            <p className="text-xs text-muted-foreground">
              +12 approved this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              User & Driver Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="drivers"
                    stroke="#ffc658"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ride Stats Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieIcon className="h-5 w-5" />
              Ride Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rideStatsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    barSize={30}
                    radius={[0, 4, 4, 0]}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
