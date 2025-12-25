import { AdminLayout } from "@/components/layout/AdminLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-heading font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$128,450"
            change={12.5}
            changeLabel="vs last month"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <MetricCard
            title="Total Orders"
            value="1,429"
            change={8.2}
            changeLabel="vs last month"
            icon={<ShoppingCart className="h-5 w-5" />}
          />
          <MetricCard
            title="New Customers"
            value="892"
            change={-2.4}
            changeLabel="vs last month"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            title="Products Sold"
            value="3,847"
            change={18.7}
            changeLabel="vs last month"
            icon={<Package className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <TopProducts />
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
