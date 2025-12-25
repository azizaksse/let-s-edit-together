import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  Filter,
  Download,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const customers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: "$24,890",
    status: "vip",
    joinDate: "Jan 2023",
    lastOrder: "2 days ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+1 (555) 234-5678",
    orders: 8,
    totalSpent: "$12,450",
    status: "active",
    joinDate: "Mar 2023",
    lastOrder: "1 week ago",
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma@example.com",
    phone: "+1 (555) 345-6789",
    orders: 23,
    totalSpent: "$45,230",
    status: "vip",
    joinDate: "Nov 2022",
    lastOrder: "3 days ago",
  },
  {
    id: "4",
    name: "James Brown",
    email: "james@example.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    totalSpent: "$5,670",
    status: "active",
    joinDate: "Aug 2024",
    lastOrder: "2 weeks ago",
  },
  {
    id: "5",
    name: "Olivia Davis",
    email: "olivia@example.com",
    phone: "+1 (555) 567-8901",
    orders: 1,
    totalSpent: "$890",
    status: "new",
    joinDate: "Dec 2024",
    lastOrder: "Today",
  },
  {
    id: "6",
    name: "William Taylor",
    email: "william@example.com",
    phone: "+1 (555) 678-9012",
    orders: 0,
    totalSpent: "$0",
    status: "inactive",
    joinDate: "Jun 2024",
    lastOrder: "Never",
  },
];

const statusStyles = {
  vip: "bg-accent/10 text-accent border-accent/20",
  active: "bg-success/10 text-success border-success/20",
  new: "bg-info/10 text-info border-info/20",
  inactive: "bg-muted text-muted-foreground border-muted",
};

const Customers = () => {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-semibold tracking-tight">
              Customers
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and view customer information
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-luxury p-4">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-heading font-semibold mt-1">
              {customers.length}
            </p>
          </div>
          <div className="card-luxury p-4">
            <p className="text-sm text-muted-foreground">VIP Customers</p>
            <p className="text-2xl font-heading font-semibold mt-1 text-accent">
              {customers.filter((c) => c.status === "vip").length}
            </p>
          </div>
          <div className="card-luxury p-4">
            <p className="text-sm text-muted-foreground">New This Month</p>
            <p className="text-2xl font-heading font-semibold mt-1">
              {customers.filter((c) => c.status === "new").length}
            </p>
          </div>
          <div className="card-luxury p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-heading font-semibold mt-1">$89,130</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 input-luxury"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Customers Table */}
        <div className="card-luxury overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, index) => (
                <TableRow
                  key={customer.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-accent/10 text-accent">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.phone}
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="font-semibold">
                    {customer.totalSpent}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        statusStyles[customer.status as keyof typeof statusStyles]
                      )}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;
