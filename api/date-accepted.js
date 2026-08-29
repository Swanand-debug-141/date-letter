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

                    html: `

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


                            <p>
                                Your date invitation
                                has officially been accepted! 🎉
                            </p>


                            <hr>


                            <h2>
                                💭 Her suggestion
                            </h2>

                            <p>
                                ${
                                    suggestion ||
                                    "No suggestion provided"
                                }
                            </p>


                            <h2>
                                📍 Place
                            </h2>

                            <p>
                                ${
                                    place ||
                                    "Not specified"
                                }
                            </p>


                            <h2>
                                📅 Date
                            </h2>

                            <p>
                                ${
                                    date ||
                                    "Not specified"
                                }
                            </p>


                            <h2>
                                🕐 Time
                            </h2>

                            <p>
                                ${
                                    time ||
                                    "Not specified"
                                }
                            </p>


                            <hr>


                            <p>
                                <strong>
                                    Accepted at:
                                </strong>

                                ${
                                    acceptedAt ||
                                    "Unknown"
                                }
                            </p>


                            <p>
                                Looks like you have
                                some planning to do 😌💕
                            </p>

                        </div>

                    `

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
