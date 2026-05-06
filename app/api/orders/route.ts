import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "orders.json");

// read orders
function readOrders() {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(filePath, "utf-8");

  return data ? JSON.parse(data) : [];
}

// save orders
function writeOrders(orders: any[]) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(orders, null, 2)
  );
}

// GET orders
export async function GET() {
  const orders = readOrders();

  return NextResponse.json(orders);
}

// CREATE order
export async function POST(req: Request) {
  const body = await req.json();

  const orders = readOrders();

  const total = body.items.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

  const newOrder = {
    id: Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase(),

    date: new Date().toLocaleDateString(),

    items: body.items,

    total,

    user: body.user || "guest",

    status: "Pending",
  };

  orders.unshift(newOrder);

  writeOrders(orders);

  return NextResponse.json(newOrder);
}