const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendTemporaryPasswordEmail = async (email, name, temporaryPassword) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Data Science Club - Committee Member Account Created',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #06b6d4;">Welcome to Data Science Club!</h2>
        <p>Hello ${name},</p>
        <p>Your committee member account has been created. Please use the following temporary password to log in:</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 18px; font-weight: bold; text-align: center; color: #1f2937; margin: 0;">
            ${temporaryPassword}
          </p>
        </div>
        <p style="color: #dc2626; font-weight: bold;">IMPORTANT: You must change this password on your first login.</p>
        <p>Please log in at: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login">${process.env.FRONTEND_URL || 'http://localhost:3000'}/login</a></p>
        <p>Best regards,<br>Data Science Club Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

const sendOTPEmail = async (email, name, otp) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Data Science Club - Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #06b6d4;">Password Reset Request</h2>
        <p>Hello ${name},</p>
        <p>You have requested to reset your password. Use the following OTP to verify your identity:</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 24px; font-weight: bold; text-align: center; color: #1f2937; margin: 0; letter-spacing: 5px;">
            ${otp}
          </p>
        </div>
        <p style="color: #dc2626;">This OTP will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Data Science Club Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

module.exports = { sendTemporaryPasswordEmail, sendOTPEmail };

