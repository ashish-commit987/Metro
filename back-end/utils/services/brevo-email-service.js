import dotenv from "dotenv";
dotenv.config();

import BrevoSDK from "@getbrevo/brevo";

const apiInstance = new BrevoSDK.TransactionalEmailsApi();
apiInstance.setApiKey(
  BrevoSDK.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendOtpEmail = async (email, otp) => {
  try {
    const sendSmtpEmail = {
      sender: {
        name: "MetroMeet",
        email: process.env.BREVO_SENDER_EMAIL
      },
      to: [{ email }],
      subject: "Your MetroMeet OTP Code",
      htmlContent: `
        <div style="font-family:Arial;max-width:600px;">
          <h2 style="color:#4F46E5;">MetroMeet OTP Verification</h2>
          <p>Your OTP is:</p>
          <div style="font-size:32px;font-weight:bold;">${otp}</div>
          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    // console.log("✅ API Response:", JSON.stringify(result, null, 2)); // Debugging
    console.log("✅ OTP email sent via Brevo:", result.body.messageId);
  } catch (error) {
    console.error("❌ Brevo Email Error:", error);
    throw error; // Re-throw the error so the caller knows it failed
  }
};
