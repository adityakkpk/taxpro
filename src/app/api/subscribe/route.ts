import { NextResponse } from "next/server";
import { appendToSheet } from "@/src/lib/googleSheets";
import connectDB from "@/src/lib/mongodb";
import Subscriber from "../../models/Subscriber";
import { sendSubscriptionEmail } from "@/src/lib/nodemailer";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    console.log(body)
    const { email, phone } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { message: "Either email or phone is required" },
        { status: 400 }
      );
    }

    const existingUser = await Subscriber.findOne({
      $or: [{ email }, { phone }]
    })

    if(existingUser) {
      return NextResponse.json(
        { message: "User already exist. Try different email or phone number" },
        { status: 400 }
      );
    }

    // Save Subscription information into DB
    const newSubscriber = new Subscriber({
      email: email || undefined,
      phone: phone || undefined,
      subscriptionDate: new Date()
    });
    await newSubscriber.save();

    // Format data for Google Sheets
    const currentDate = new Date().toISOString();
    const sheetData = [
      currentDate,
      email || "",
      phone || "",
      "Subscription"  // Type of entry
    ];

    // Append to Google Sheets (Sheet2)
    await appendToSheet(sheetData, "Sheet2!A:D");

    // Send Email to the admin
    await sendSubscriptionEmail(
      "New Subscription",
      `New subscription made by ${email || phone} on ${currentDate}`
    );

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}