import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "users.json"
);

// READ users
function readUsers() {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(
    filePath,
    "utf-8"
  );

  return data ? JSON.parse(data) : [];
}

// WRITE users
function writeUsers(users: any[]) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2)
  );
}

// GET users
export async function GET() {
  const users = readUsers();

  return NextResponse.json(users);
}

// CREATE user
export async function POST(req: Request) {
  const body = await req.json();

  const users = readUsers();

  const existingUser = users.find(
    (u: any) => u.name === body.name
  );

  if (existingUser) {
    return NextResponse.json(
      {
        error: "User already exists",
      },
      { status: 400 }
    );
  }

  const newUser = {
    id: Math.random()
      .toString(36)
      .substring(2, 8),

    name: body.name,

    password: body.password,
  };

  users.push(newUser);

  writeUsers(users);

  return NextResponse.json(newUser);
}