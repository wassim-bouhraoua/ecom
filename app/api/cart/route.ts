import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "carts.json"
);

// READ carts
function readCarts() {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(
    filePath,
    "utf-8"
  );

  return data ? JSON.parse(data) : [];
}

// WRITE carts
function writeCarts(carts: any[]) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(carts, null, 2)
  );
}

// GET cart by user
export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const user = searchParams.get("user");

  const carts = readCarts();

  const userCart = carts.find(
    (c: any) => c.user === user
  );

  return NextResponse.json(
    userCart || {
      user,
      items: [],
    }
  );
}

// SAVE cart
export async function POST(req: Request) {
  const body = await req.json();

  const carts = readCarts();

  const existingIndex = carts.findIndex(
    (c: any) => c.user === body.user
  );

  const updatedCart = {
    user: body.user,
    items: body.items,
  };

  if (existingIndex !== -1) {
    carts[existingIndex] = updatedCart;
  } else {
    carts.push(updatedCart);
  }

  writeCarts(carts);

  return NextResponse.json(updatedCart);
}