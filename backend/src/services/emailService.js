import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendConfirmationEmail = async (to, fullName) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: '"Patient Registration" <no-reply@example.com>',
      to,
      subject: "Registration Confirmation",
      text: `Hello ${fullName}, your registration was successful!`,
      html: `<p>Hello <strong>${fullName}</strong>, your registration was successful!</p>`
    });

    console.log(`✅ Confirmation email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error);
  }
};