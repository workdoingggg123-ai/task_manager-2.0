export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        // Get email and name from your frontend
        const { email, name } = req.body || {};

        // Check email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Send email using Resend
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
            },

            body: JSON.stringify({
                from: "Task Manager <workdoingggg123@gmail.com>",

                to: [email],

                subject: "New Login - Task Manager",

                html: `
                    <div style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: auto;
                        padding: 25px;
                        line-height: 1.6;
                    ">

                        <h2>Hello ${name || "User"} 👋</h2>

                        <p>
                            Your Task Manager account was just logged into.
                        </p>

                        <p>
                            If this was you, you don't need to do anything.
                        </p>

                        <p>
                            If you did not log in, please check your account.
                        </p>

                        <hr>

                        <p>
                            <strong>Student Task Manager</strong>
                        </p>

                    </div>
                `
            })
        });

        // Get Resend response
        const data = await response.json();

        // Resend returned an error
        if (!response.ok) {
            console.error("Resend error:", data);

            return res.status(response.status).json({
                success: false,
                message: "Email could not be sent",
                error: data
            });
        }

        // Success
        return res.status(200).json({
            success: true,
            message: "Login email sent successfully",
            data: data
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