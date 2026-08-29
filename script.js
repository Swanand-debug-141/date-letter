// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");

const finalSection = document.getElementById("final-section");
const dateForm = document.getElementById("date-form");
const formSuccess = document.getElementById("form-success");


// ==============================
// OPEN ENVELOPE
// ==============================

envelope.addEventListener("click", () => {

    envelope.style.display = "none";

    letter.style.display = "flex";

    setTimeout(() => {
        document
            .querySelector(".letter-window")
            .classList.add("open");
    }, 50);

});


// ==============================
// MOVE NO BUTTON
// ==============================

function moveNoButton() {

    const distance = 120 + Math.random() * 100;

    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition =
        "transform 0.3s ease";

    noBtn.style.transform =
        `translate(${moveX}px, ${moveY}px)`;
}


// Desktop
noBtn.addEventListener(
    "mouseover",
    moveNoButton
);


// Mobile
noBtn.addEventListener(
    "touchstart",
    moveNoButton
);


// ==============================
// YES BUTTON
// ==============================

yesBtn.addEventListener(
    "click",
    async () => {

        // Change title
        title.textContent =
            "Yippeeee! ❤️";


        // Change cat
        catImg.src =
            "cat_dance.gif";


        // Add final animation
        document
            .querySelector(".letter-window")
            .classList.add("final");


        // Hide buttons
        buttons.style.display =
            "none";


        // Show planning section
        finalSection.style.display =
            "block";


        // Send YES notification
        try {

            const response = await fetch(
                "/api/date-accepted",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        acceptedAt:
                            new Date().toISOString()

                    })
                }
            );


            const data =
                await response.json();


            console.log(
                "YES notification:",
                data
            );

        }
        catch (error) {

            console.error(
                "Notification failed:",
                error
            );

        }

    }
);


// ==============================
// DATE FORM
// ==============================

dateForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const suggestion =
            document
                .getElementById("suggestion")
                .value;


        const place =
            document
                .getElementById("place")
                .value;


        const date =
            document
                .getElementById("date")
                .value;


        const time =
            document
                .getElementById("time")
                .value;


        const sendButton =
            document.getElementById(
                "send-date"
            );


        // Prevent multiple clicks
        sendButton.disabled = true;

        sendButton.textContent =
            "Sending... ❤️";


        try {

            const response =
                await fetch(
                    "/api/date-accepted",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            acceptedAt:
                                new Date().toISOString(),

                            suggestion:
                                suggestion,

                            place:
                                place,

                            date:
                                date,

                            time:
                                time

                        })
                    }
                );


            const data =
                await response.json();


            console.log(
                "Date details:",
                data
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to send"
                );

            }


            // Hide form
            dateForm.style.display =
                "none";


            // Show success
            formSuccess.style.display =
                "block";

        }
        catch (error) {

            console.error(
                "Failed to send date:",
                error
            );

            sendButton.disabled =
                false;

            sendButton.textContent =
                "Try Again ❤️";

        }

    }
);
