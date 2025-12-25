import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Grid3X3,
  List,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "1",
    name: "Silk Evening Gown",
    category: "Dresses",
    price: "$2,450",
    stock: 24,
    status: "in-stock",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Italian Leather Loafers",
    category: "Shoes",
    price: "$890",
    stock: 45,
    status: "in-stock",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Cashmere Blend Coat",
    category: "Outerwear",
    price: "$1,500",
    stock: 8,
    status: "low-stock",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Diamond Tennis Bracelet",
    category: "Jewelry",
    price: "$5,000",
    stock: 0,
    status: "out-of-stock",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Merino Wool Sweater",
    category: "Knitwear",
    price: "$320",
    stock: 67,
    status: "in-stock",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Silk Pocket Square Set",
    category: "Accessories",
    price: "$180",
    stock: 120,
    status: "in-stock",
    image: "/placeholder.svg",
  },
];

const statusStyles = {
  "in-stock": "bg-success/10 text-success border-success/20",
  "low-stock": "bg-warning/10 text-warning border-warning/20",
  "out-of-stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const Products = () => {
  const [view, setView] = useState<"grid" | "table">("table");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-semibold tracking-tight">
              Products
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your product inventory
            </p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 input-luxury"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("table")}
                className={cn(
                  "rounded-none",
                  view === "table" && "bg-secondary"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("grid")}
                className={cn(
                  "rounded-none",
                  view === "grid" && "bg-secondary"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products View */}
        {view === "table" ? (
          <div className="card-luxury overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px]">Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-secondary overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.category}
                    </TableCell>
                    <TableCell className="font-semibold">{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          statusStyles[product.status as keyof typeof statusStyles]
                        )}
                      >
                        {product.status.replace("-", " ")}
                      </Badge>
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
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="card-luxury hover-lift overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square bg-secondary relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  <Badge
                    variant="outline"
                    className={cn(
                      "absolute top-3 right-3 capitalize",
                      statusStyles[product.status as keyof typeof statusStyles]
                    )}
                  >
                    {product.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-heading text-lg font-semibold">
                      {product.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;
