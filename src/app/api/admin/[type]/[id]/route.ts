import { NextResponse } from "next/server";
import connectDB from "@/src/lib/mongodb";
import Enquiry from "@/src/app/models/Enquiry";
import Subscriber from "@/src/app/models/Subscriber";
import User from "@/src/app/models/User";
import { getServerSession } from "next-auth";
import { enquirySchema, subscriberSchema, userSchema } from "../../../../../lib/validation";
import { ZodError } from "zod";

const getValidationSchema = (type: string) => {
  switch (type) {
    case "enquiries":
      return enquirySchema;
    case "subscribers":
      return subscriberSchema;
    case "users":
      return userSchema;
    default:
      throw new Error("Invalid type");
  }
};

const getModel = (type: string) => {
  switch (type) {
    case "enquiries":
      return Enquiry;
    case "subscribers":
      return Subscriber;
    case "users":
      return User;
    default:
      throw new Error("Invalid model type");
  }
};

const isAdmin = async (session: any) => {
  if (!session?.user?.email) return false;
  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  return user?.role === "admin";
};

export async function PUT(
  request: Request,
  { params }: { params: { type: string; id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const isAdminUser = await isAdmin(session);
    if (!isAdminUser) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();
    const body = await request.json();
    
    // Validate input data
    const schema = getValidationSchema(params.type);
    const validatedData: Partial<typeof body> = schema.parse(body);

    const Model = getModel(params.type);

    // Check if item exists before updating
    const existingItem = await Model.findById(params.id);
    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    // Prevent updating critical user fields
    if (params.type === "users") {
      // delete validatedData.password;
      delete validatedData.email; // Prevent email changes
    }

    const updatedItem = await Model.findByIdAndUpdate(
      params.id,
      { $set: validatedData },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      data: updatedItem,
      message: "Item updated successfully"
    });

  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: "Validation error",
        details: error.errors
      }, { status: 400 });
    }

    console.error("Update error:", error);
    return NextResponse.json({
      error: "Failed to update item",
      message: error.message
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { type: string; id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const isAdminUser = await isAdmin(session);
    if (!isAdminUser) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();
    const Model = getModel(params.type);

    // Check if item exists and has no dependencies
    const existingItem = await Model.findById(params.id);
    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    // Prevent deleting the last admin user
    if (params.type === "users" && existingItem.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return NextResponse.json({
          error: "Cannot delete the last admin user"
        }, { status: 403 });
      }
    }

    await Model.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Item deleted successfully"
    });

  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({
      error: "Failed to delete item",
      message: error.message
    }, { status: 500 });
  }
}