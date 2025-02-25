import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  tls: {
    // Add TLS options
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

export const sendConfirmationEmail = async (to: string, name: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Tax Enquiry Confirmation',
      html: `
        <h1>Thank you for your enquiry, ${name}!</h1>
        <p>We have received your tax enquiry and will get back to you shortly.</p>
        <p>Best regards,</p>
        <p>Tax Enquiry Team</p>
      `,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};