import { NextResponse } from "next/server";
import connectDB from "@/src/lib/mongodb";
import Enquiry from "@/src/app/models/Enquiry";
import Subscriber from "@/src/app/models/Subscriber";
import User from "@/src/app/models/User";
import Contact from "@/src/app/models/Contact";

const getModel = (type: string) => {
  switch (type) {
    case "enquiries":
      return Enquiry;
    case "subscribers":
      return Subscriber;
    case "contacts":
      return Contact;
    case "users":
      return User;
    default:
      throw new Error("Invalid model type");
  }
};

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    await connectDB();

    const Model = getModel(params.type);
    const data = await Model.find().sort({ createdAt: -1 });

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}