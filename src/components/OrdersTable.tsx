import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type OrderStatus = "pending" | "in-progress" | "done";

export interface Order {
  id: string;
  item: string;
  quantity: number;
  customerName: string;
  status: OrderStatus;
}

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-warning text-warning-foreground";
    case "in-progress":
      return "bg-info text-info-foreground";
    case "done":
      return "bg-success text-success-foreground";
  }
};

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "in-progress":
      return "In Progress";
    case "done":
      return "Done";
  }
};

export const OrdersTable = ({ orders, onUpdateStatus }: OrdersTableProps) => {
  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader className="border-b border-border bg-muted/50">
        <CardTitle className="text-2xl font-bold text-foreground">Active Orders</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No active orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="font-bold text-foreground text-base">Order</TableHead>
                  <TableHead className="font-bold text-foreground text-base">Name</TableHead>
                  <TableHead className="font-bold text-foreground text-base">Status</TableHead>
                  <TableHead className="font-bold text-foreground text-base text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-border">
                    <TableCell className="font-semibold text-foreground">
                      {order.quantity}x {order.item}
                    </TableCell>
                    <TableCell className="text-foreground">{order.customerName}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} font-semibold px-3 py-1`}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-info text-info-foreground hover:bg-info/90 font-semibold"
                            onClick={() => onUpdateStatus(order.id, "in-progress")}
                          >
                            Start
                          </Button>
                        )}
                        {order.status === "in-progress" && (
                          <Button
                            size="sm"
                            className="bg-success text-success-foreground hover:bg-success/90 font-semibold"
                            onClick={() => onUpdateStatus(order.id, "done")}
                          >
                            Complete
                          </Button>
                        )}
                        {order.status === "done" && (
                          <Badge className="bg-success text-success-foreground font-semibold px-3 py-1">
                            ✓ Completed
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
