export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const { email, name } = req.body || {};

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
            },

            body: JSON.stringify({
                from: "Task Manager <onboarding@resend.dev>",

                to: [email],

                subject: "Welcome to Task Manager 🎉",

                html: `
                    <div style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: auto;
                        padding: 30px;
                        line-height: 1.6;
                        color: #333;
                    ">

                        <h1 style="color: #633de0;">
                            Welcome, ${name || "User"}! 👋
                        </h1>

                        <p>
                            Your Task Manager account has been created successfully.
                        </p>

                        <p>
                            You can now start creating, organizing and tracking
                            your tasks easily.
                        </p>

                        <div style="
                            background: #f5f3ff;
                            padding: 20px;
                            border-radius: 10px;
                            margin: 20px 0;
                        ">
                            <strong>You're all set!</strong>
                            <br>
                            Start managing your tasks today.
                        </div>

                        <p>
                            Thanks for joining us!
                        </p>

                        <hr>

                        <p style="color: #777;">
                            Student Task Manager
                        </p>

                    </div>
                `
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Resend error:", data);

            return res.status(response.status).json({
                success: false,
                message: "Email could not be sent",
                error: data
            });
        }

        return res.status(200).json({
            success: true,
            message: "Welcome email sent successfully",
            data
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}