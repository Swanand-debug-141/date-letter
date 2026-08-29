export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            message: "Method not allowed"
        });

    }


    try {

        const {
            acceptedAt,
            suggestion,
            place,
            date,
            time,
            responseType
        } = req.body;

        let subject;
let emailContent;

if (responseType === "surprise") {

    subject = "❤️ SHE SAID YES — YOU'RE PLANNING THE DATE!";

    emailContent = `
        <div
            style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                background: #fff5f7;
                border-radius: 20px;
            "
        >

            <h1>
                ❤️ SHE SAID YES!!!
            </h1>

            <h2>
                🎉 IT'S OFFICIALLY A DATE!
            </h2>

            <p>
                She accepted your date invitation! 🥰
            </p>

            <hr>

            <h2>
                🥰 Her choice
            </h2>

            <p>
                She chose:
                <strong>
                    "You decide!"
                </strong>
            </p>

            <p>
                She is trusting you to plan the
                place, date and time. 😌💕
            </p>

            <hr>

            <h2>
                📋 Your mission
            </h2>

            <p>
                Pick somewhere special,
                choose a date,
                choose a time,
                and make it a date worth remembering. ❤️
            </p>

            <hr>

            <p>
                <strong>
                    Accepted at:
                </strong>
                ${acceptedAt || "Unknown"}
            </p>

            <p>
                Looks like you officially have
                a date! 😌💕
            </p>

        </div>
    `;

} else {

    subject = "❤️ SHE SAID YES — DATE PLANS RECEIVED!";

    emailContent = `
        <div
            style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                background: #fff5f7;
                border-radius: 20px;
            "
        >

            <h1>
                ❤️ SHE SAID YES!!!
            </h1>

            <h2>
                🎉 IT'S OFFICIALLY A DATE!
            </h2>

            <p>
                She accepted your date invitation
                and sent you her date preferences! 🥰
            </p>

            <hr>

            <h2>
                💭 Her suggestion
            </h2>

            <p>
                ${suggestion || "No suggestion provided"}
            </p>

            <h2>
                📍 Place
            </h2>

            <p>
                ${place || "Not specified"}
            </p>

            <h2>
                📅 Date
            </h2>

            <p>
                ${date || "Not specified"}
            </p>

            <h2>
                🕐 Time
            </h2>

            <p>
                ${time || "Not specified"}
            </p>

            <hr>

            <p>
                <strong>
                    Accepted at:
                </strong>
                ${acceptedAt || "Unknown"}
            </p>

            <p>
                Now go make this date special. ❤️
            </p>

        </div>
    `;
}

        const subject =
        responseType === "surprise"
            ? "❤️ She said YES — I'm planning the date!"
            : "❤️ She said YES — Here's her date idea!";
        const response = await fetch(
            "https://api.resend.com/emails",
            {

                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${process.env.RESEND_API_KEY}`,

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    from:
                        "Date Letter <onboarding@resend.dev>",

                    to: [
                        process.env.NOTIFICATION_EMAIL
                    ],

                    subject:
                        subject,

                    html: emailContent

                })

            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Resend error:",
                data
            );


            return res.status(500).json({

                message:
                    "Failed to send email"

            });

        }


        return res.status(200).json({

            message:
                "Notification sent successfully"

        });


    }
    catch (error) {

        console.error(
            "Server error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error"

        });

    }

}
