import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";

const MENU_ITEMS = [
  "Grilled Cheese Rooties",
  "Classic Grilled Cheese Rootie",
  "Garlic Grilled Cheese Rootie",
  "Chilli Cheese Rootie",
  "BBQ Chicken-Mayo Rootie",
  "Classic Cheese",
  "Cheese & Tomato",
  "Chicken-Mayo",
  "Ham & Cheese",
  "Classic Boerie Roll",
  "Cheese & Onion Boerie",
  "Peri-Peri Boerie",
  "BBQ Hotdog",
  "Classic Cheese Burger",
  "Chilli Cheese Burger",
  "Mushroom & Swiss Cheese Burger",
  "BBQ Bacon Cheese Burger",
  "Classic Salted Chips",
  "Peri-Peri Spiced Chips",
  "Cheesy Loaded Fries",
  "Garlic-Mayo Chips",
  "Original Fried Chicken",
  "Hot & Crispy Fried Chicken",
  "Zinger Fried Chicken",
  "Cold Salami & Cream Cheese",
  "Cold Salami Mayo",
  "Cold Salami Mustard",
  "Toasted Salami & Cream Cheese",
  "Chocolate Chip Muffin",
  "Blueberry Muffin",
  "Bran & Raisin Muffin",
  "Banana Nut Muffin",
  "Coffee",
  "Americano",
  "Cappuccino",
  "Latte (Vanilla/Caramel/Mocha)",
  "Espresso/Double Shot",
  "Iced Coffee",
  "Milkshakes (Vanilla, Chocolate, Strawberry, Oreo/Cookies & Cream)",
  "Smoothies (Berry Blast, Tropical Mix, Green Energy)",
  "Cold Drinks/Sports/Energy Drinks (Coca-Cola, Fanta, Sprite, Powerade, Energade, Monster, Red Bull)",
  "Fresh Fruit Juices (Orange, Apple, Mango, Mixed Fruit)",
];

interface OrderFormProps {
  onAddOrder: (item: string, quantity: number, customerName: string) => void;
}

export const OrderForm = ({ onAddOrder }: OrderFormProps) => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem && customerName.trim()) {
      onAddOrder(selectedItem, quantity, customerName.trim());
      setSelectedItem("");
      setQuantity(1);
      setCustomerName("");
      setSearchTerm("");
    }
  };

  const filteredItems = MENU_ITEMS.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader className="border-b border-border bg-muted/50">
        <CardTitle className="text-2xl font-bold text-foreground">New Order</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="item" className="text-base font-semibold text-foreground">
              Select Item
            </Label>
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger id="item" className="h-12 text-base bg-background border-2">
                <SelectValue placeholder="Choose menu item..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border-2 border-border z-50">
                <div className="p-2 sticky top-0 bg-popover z-10">
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 border-2"
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredItems.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className="text-base py-3 cursor-pointer hover:bg-accent"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-base font-semibold text-foreground">
              Quantity
            </Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-12 w-12 border-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-5 w-5" />
              </Button>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-12 text-center text-xl font-bold border-2 w-24"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-12 w-12 border-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-base font-semibold text-foreground">
              Customer Name
            </Label>
            <Input
              id="customerName"
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-12 text-base border-2"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!selectedItem || !customerName.trim()}
          >
            Add Order
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
