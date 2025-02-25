// import { NextResponse } from 'next/response';
import connectDB from '@/src/lib/mongodb';
import Enquiry from '@/src/app/models/Enquiry';
import { uploadToCloudinary } from '@/src/lib/cloudinary';
import { appendToSheet } from '@/src/lib/googleSheets';
import { sendConfirmationEmail } from '@/src/lib/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const query = formData.get('query') as string;
    const files = formData.getAll('files') as File[];

    await connectDB();

    // Upload files to Cloudinary
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return uploadToCloudinary(buffer);
      })
    );

    // Create enquiry in database
    const enquiry = await Enquiry.create({
      fullName,
      email,
      query,
      files: uploadedFiles,
    });

    // Add to Google Sheets
    await appendToSheet([
      enquiry.fullName,
      enquiry.email,
      enquiry.query,
      uploadedFiles.map(f => f.url).join(', '),
      new Date().toISOString(),
    ]);

    // Send confirmation email
    await sendConfirmationEmail(email, fullName);

    return NextResponse.json({ 
      message: 'Enquiry submitted successfully',
      enquiry 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}