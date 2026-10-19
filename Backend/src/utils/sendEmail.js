const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error("Email credentials are missing in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Voltora Electronics" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("Confirmation email sent:", info.messageId);

  return info;
};

module.exports = sendEmail;
