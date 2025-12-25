import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X, ImageIcon, Upload, Link } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductVariant } from "@/hooks/useProducts";
import { toast } from "sonner";

const CATEGORIES = [
  "Dresses",
  "Shoes",
  "Outerwear",
  "Jewelry",
  "Knitwear",
  "Accessories",
  "Bags",
  "Watches",
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const COLORS = [
  "Black",
  "White",
  "Navy",
  "Beige",
  "Brown",
  "Gold",
  "Silver",
  "Red",
  "Green",
  "Blue",
];

interface AddProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (product: {
    name: string;
    price: number;
    category: string;
    image: string;
    variants: ProductVariant[];
  }) => void;
}

export const AddProductForm = ({
  open,
  onOpenChange,
  onSubmit,
}: AddProductFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [variants, setVariants] = useState<ProductVariant[]>([
    { size: "M", color: "Black", stock: 0 },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { size: "M", color: "Black", stock: 0 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const updateVariant = (
    index: number,
    field: keyof ProductVariant,
    value: string | number
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a product name");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }

    onSubmit({
      name: name.trim(),
      price: parseFloat(price),
      category,
      image: image || "/placeholder.svg",
      variants,
    });

    // Reset form
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setVariants([{ size: "M", color: "Black", stock: 0 }]);
    onOpenChange(false);
    toast.success("Product added successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Basic Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Silk Evening Gown"
                className="input-luxury"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="input-luxury"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="input-luxury">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Product Image</Label>
              <Tabs value={imageTab} onValueChange={(v) => setImageTab(v as "upload" | "url")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="url" className="gap-2">
                    <Link className="h-4 w-4" />
                    URL
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-3">
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {image && imageTab === "upload" ? (
                      <div className="relative">
                        <img
                          src={image}
                          alt="Preview"
                          className="h-24 w-24 mx-auto object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImage("");
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload image
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Max 5MB
                        </p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-3">
                  <div className="flex gap-2">
                    <Input
                      value={imageTab === "url" ? image : ""}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://..."
                      className="input-luxury"
                    />
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                      {image && imageTab === "url" ? (
                        <img
                          src={image}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Size & Color Variants</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addVariant}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Variant
              </Button>
            </div>

            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-end p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Size
                    </Label>
                    <Select
                      value={variant.size}
                      onValueChange={(v) => updateVariant(index, "size", v)}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Color
                    </Label>
                    <Select
                      value={variant.color}
                      onValueChange={(v) => updateVariant(index, "color", v)}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COLORS.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Stock
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={variant.stock}
                      onChange={(e) =>
                        updateVariant(index, "stock", parseInt(e.target.value) || 0)
                      }
                      className="h-9"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => removeVariant(index)}
                    disabled={variants.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
