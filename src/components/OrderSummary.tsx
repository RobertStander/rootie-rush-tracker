import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "./OrdersTable";
import { ChefHat } from "lucide-react";

interface OrderSummaryProps {
  orders: Order[];
}

export const OrderSummary = ({ orders }: OrderSummaryProps) => {
  const activeOrders = orders.filter((order) => order.status !== "done");

  const summary = activeOrders.reduce((acc, order) => {
    if (!acc[order.item]) {
      acc[order.item] = 0;
    }
    acc[order.item] += order.quantity;
    return acc;
  }, {} as Record<string, number>);

  const summaryEntries = Object.entries(summary).sort(([a], [b]) => a.localeCompare(b));

  return (
    <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg">
      <CardHeader className="border-b border-border bg-primary/10">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-primary" />
          Cooking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {summaryEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-lg">No active orders to prepare</p>
          </div>
        ) : (
          <div className="space-y-3">
            {summaryEntries.map(([item, quantity]) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 rounded-lg bg-card border-2 border-border hover:border-primary transition-colors"
              >
                <span className="text-base font-semibold text-foreground">{item}</span>
                <span className="text-2xl font-bold text-primary bg-primary/10 px-4 py-1 rounded-full">
                  {quantity}
                </span>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t-2 border-border">
              <p className="text-sm text-muted-foreground text-center font-medium">
                Total Items: {summaryEntries.reduce((acc, [, quantity]) => acc + quantity, 0)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
