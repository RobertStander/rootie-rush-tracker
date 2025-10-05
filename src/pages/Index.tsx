import { useState } from "react";
import { OrderForm } from "@/components/OrderForm";
import { OrdersTable, Order, OrderStatus } from "@/components/OrdersTable";
import { OrderSummary } from "@/components/OrderSummary";
import { UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddOrder = (item: string, quantity: number, customerName: string) => {
    const newOrder: Order = {
      id: `${Date.now()}-${Math.random()}`,
      item,
      quantity,
      customerName,
      status: "pending",
    };

    setOrders((prev) => [...prev, newOrder]);
    toast.success(`Order added for ${customerName}`);
  };

  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );

    const order = orders.find((o) => o.id === id);
    if (order) {
      if (status === "in-progress") {
        toast.info(`Started preparing order for ${order.customerName}`);
      } else if (status === "done") {
        toast.success(`Order completed for ${order.customerName}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold">Food Trailer Order Tracker</h1>
              <p className="text-sm opacity-90">Session-based tracking • Resets on refresh</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <OrderForm onAddOrder={handleAddOrder} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <OrdersTable orders={orders} onUpdateStatus={handleUpdateStatus} />
            <OrderSummary orders={orders} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
