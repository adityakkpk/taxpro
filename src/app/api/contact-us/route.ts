import connectDB from "@/src/lib/mongodb";
import { sendEmail } from "@/src/lib/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    await connectDB();

    // Send email using your preferred method (e.g., SendGrid, Mailgun, AWS SES)
    await sendEmail(name, email, subject, message);

    return NextResponse.json({ message: 'Contact us Email sent successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}