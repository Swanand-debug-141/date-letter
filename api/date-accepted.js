export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    try {
        const { acceptedAt } = req.body;

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "Date Letter <onboarding@resend.dev>",
                to: [process.env.NOTIFICATION_EMAIL],
                subject: "❤️ SHE SAID YES!!!",
                html: `
                    <h1>❤️ SHE SAID YES!!!</h1>

                    <p>Your Date Letter just received a YES! 🎉</p>

                    <p>
                        <strong>Accepted at:</strong>
                        ${acceptedAt || "Unknown"}
                    </p>

                    <p>Looks like you have a date! 😌💕</p>
                `
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Resend error:", data);

            return res.status(500).json({
                message: "Failed to send email"
            });
        }

        return res.status(200).json({
            message: "Notification sent successfully"
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
