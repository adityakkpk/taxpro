import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/src/lib/mongodb";
import User from "@/src/app/models/User";
import { sign } from "jsonwebtoken";

const ADMIN_KEY = process.env.ADMIN_KEY || "aartaxindia@admin";
const JWT_SECRET = process.env.JWT_SECRET || "aartaxindia#@#@";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const adminKey = formData.get("adminKey") as string;

    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json(
        { error: "Invalid admin key" },
        { status: 403 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials or not an admin user" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      message: "Admin logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}