const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../model/user.model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const hashCode = (code) =>
  crypto.createHash("sha256").update(code).digest("hex");

// Send verification email
const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `"Voltora Store" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Voltora account",
    text: `Your verification code is ${code}. It expires in 10 minutes.`,
  });
};

// Generate and send verification code
exports.sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+verificationCodeHash +verificationCodeExpires");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const code = crypto.randomInt(100000, 1000000).toString();

    user.verificationCodeHash = hashCode(code);
    user.verificationCodeExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await user.save();
    await sendVerificationEmail(normalizedEmail, code);

    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.error("Send verification code error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send verification code",
    });
  }
};

// Verify email code
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code || !/^\d{6}$/.test(String(code))) {
      return res.status(400).json({
        success: false,
        message: "Valid email and 6-digit code are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+verificationCodeHash +verificationCodeExpires");

    if (!user || user.isEmailVerified || !user.verificationCodeHash) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification request",
      });
    }

    if (
      !user.verificationCodeExpires ||
      user.verificationCodeExpires.getTime() < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Code expired. Request a new code.",
      });
    }

    if (hashCode(String(code)) !== user.verificationCodeHash) {
      return res.status(400).json({
        success: false,
        message: "Incorrect verification code",
      });
    }

    user.isEmailVerified = true;
    user.verificationCodeHash = undefined;
    user.verificationCodeExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify email error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify email",
    });
  }
};
