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
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MENU_ITEMS = [
  // Grilled Cheese Rooties
  "Classic Grilled Cheese Rootie",
  "Garlic Grilled Cheese Rootie",
  "Chilli Cheese Rootie",
  "BBQ Chicken-Mayo Rootie",
  
  // 🥪 Grilled Cheese Sandwiches
  "Classic Cheese Sandwiche",
  "Cheese & Tomato Sandwiche",
  "Chicken-Mayo Sandwiche",
  "Ham & Cheese Sandwiche",
  
  // 🌭 Grilled Boerewors & Hotdogs
  "Classic Boerie Roll",
  "Cheese & Onion Boerie",
  "Peri-Peri Boerie",
  "BBQ Hotdog",
  
  // 🍔 Grilled Cheese Burgers
  "Classic Cheese Burger",
  "Chilli Cheese Burger",
  "Mushroom & Swiss Cheese Burger",
  "BBQ Bacon Cheese Burger",
  
  // 🍟 Fried Chips
  "Classic Salted Chips",
  "Peri-Peri Spiced Chips",
  "Cheesy Loaded Fried Chips",
  "Garlic-Mayo Chips",
  
  // 🍗 Fried Chicken
  "Original Fried Chicken",
  "Hot & Crispy Fried Chicken",
  "Zinger Fried Chicken",
  
  // 🥪 Cold Sandwiches
  "Cold Salami & Cream Cheese Sandwiche",
  "Cold Salami Mayo Sandwiche",
  "Cold Salami Mustard Sandwiche",
  "Toasted Salami & Cream Cheese Sandwiche",
  
  // 🧁 Muffins
  "Chocolate Chip Muffin",
  "Blueberry Muffin",
  "Bran & Raisin Muffin",
  "Banana Nut Muffin",
  
  // ☕ Coffee
  "Americano",
  "Cappuccino",
  "Espresso",
  "Espresso Double Shot",
  "Iced Coffee",
  "Latte Vanilla",
  "Latte Caramel",
  "Latte Mocha",
  
  
  // 🥤 Milkshakes
  "Vanilla Milkshake",
  "Chocolate Milkshake",
  "Strawberry Milkshake",
  "Oreo Cookies & Cream Milkshake",
  
  // 🍹 Smoothies
  "Berry Blast Smoothie (strawberry, blueberry, banana)",
  "Tropical Mix Smoothie (mango, pineapple, orange)",
  "Green Energy Smoothie (spinach, apple, banana, ginger)",
  
  // 🥤 Cold Drinks / Sports / Energy Drinks
  "Coca-Cola",
  "Fanata",
  "Sprite",
  "Powerade",
  "Energade",
  "Monster",
  "Red Bull",
  // 🧃 Fresh Fruit Juices
  "Orange Juice",
  "Apple Juice",
  "Mango Juice",
  "Mixed Fruit Juice",
];

interface CartItem {
  item: string;
  quantity: number;
}

interface OrderFormProps {
  onAddOrder: (item: string, quantity: number, customerName: string) => void;
}

export const OrderForm = ({ onAddOrder }: OrderFormProps) => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = () => {
    if (selectedItem) {
      setCart((prev) => [...prev, { item: selectedItem, quantity }]);
      setSelectedItem("");
      setQuantity(1);
      setSearchTerm("");
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length > 0 && customerName.trim()) {
      cart.forEach((cartItem) => {
        onAddOrder(cartItem.item, cartItem.quantity, customerName.trim());
      });
      setCart([]);
      setCustomerName("");
    }
  };

  const filteredItems = MENU_ITEMS.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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

          <Button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
            disabled={!selectedItem}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Order
          </Button>

          {cart.length > 0 && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border-2 border-border">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Current Order
                </Label>
                <Badge className="bg-primary text-primary-foreground font-bold">
                  {totalItems} items
                </Badge>
              </div>
              <div className="space-y-2">
                {cart.map((cartItem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-card rounded border border-border"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {cartItem.quantity}x {cartItem.item}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromCart(index)}
                      className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            disabled={cart.length === 0 || !customerName.trim()}
          >
            Submit Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

