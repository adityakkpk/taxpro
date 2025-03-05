import { NextResponse } from "next/server";
import { appendToSheet } from "@/src/lib/googleSheets";
import connectDB from "@/src/lib/mongodb";
import Subscriber from "../../models/Subscriber";
import { sendSubscriptionEmail } from "@/src/lib/nodemailer";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    // console.log(body.email + " " + body.phone);
    const { email, phone } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { message: "Either email or phone is required" },
        { status: 400 }
      );
    }

    const sanitizedEmail = email?.toLowerCase().trim();
    const sanitizedPhone = phone?.trim();

    const query = {
      $or: [
        ...(sanitizedEmail ? [{ email: sanitizedEmail }] : []),
        ...(sanitizedPhone ? [{ phone: sanitizedPhone }] : []),
      ],
    };

    // Make sure we have at least one condition
    if (query.$or.length === 0) {
      return NextResponse.json(
        { message: "Either email or phone is required" },
        { status: 400 }
      );
    }

    console.log("Query:", JSON.stringify(query, null, 2));
    
    const existingUser = await Subscriber.findOne(query);

    console.log("Found user:", existingUser);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exist. Try different email or phone number" },
        { status: 400 }
      );
    }

    // Save Subscription information into DB
    // When saving new subscriber, only include non-null fields
    const subscriberData = {
      ...(sanitizedEmail && { email: sanitizedEmail }),
      ...(sanitizedPhone && { phone: sanitizedPhone }),
      subscriptionDate: new Date(),
    };

    const newSubscriber = new Subscriber(subscriberData);
    await newSubscriber.save();

    // Format data for Google Sheets
    const currentDate = new Date().toISOString();
    const sheetData = [
      currentDate,
      email || "",
      phone || "",
      "Subscription", // Type of entry
    ];

    // Append to Google Sheets (Sheet2)
    await appendToSheet(sheetData, "Sheet2!A:D");

    // Send Email to the admin
    await sendSubscriptionEmail(
      "New Subscription",
      `New subscription made by ${email || phone} on ${currentDate}`
    );

    // Send Email to the user
    if (email) {
      await sendSubscriptionEmail(
        "Subscription Confirmation",
        `Thank you for subscribing! Your subscription has been confirmed. You will receive updates via email at ${email}.`,
        email
      );
    }

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
