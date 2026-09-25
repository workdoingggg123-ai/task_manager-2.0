
const twilio = require("twilio");

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const { phone, name } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required"
            });
        }

        const message = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to: `whatsapp:${phone}`,
            body: `🔐 Task Nexus Login Alert

Hi ${name} 👋

You have successfully logged in to your Task Nexus account.

If this wasn't you, please check your account.`
        });

        return res.status(200).json({
            success: true,
            messageSid: message.sid
        });

    } catch (error) {
        console.error("Twilio error:", error);

        return res.status(500).json({
            success: false,
            message: "WhatsApp message could not be sent"
        });
    }
}