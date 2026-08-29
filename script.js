// =====================================
// ELEMENTS
// =====================================

const envelope =
    document.getElementById("envelope-container");

const letter =
    document.getElementById("letter-container");

const noBtn =
    document.querySelector(".no-btn");

const yesBtn =
    document.querySelector(".yes-btn");

const title =
    document.getElementById("letter-title");

const catImg =
    document.getElementById("letter-cat");

const buttons =
    document.getElementById("letter-buttons");

const finalSection =
    document.getElementById("final-section");


// Choice elements

const suggestionChoice =
    document.getElementById("suggestion-choice");

const ideaBtn =
    document.getElementById("idea-btn");

const surpriseBtn =
    document.getElementById("surprise-btn");


// Form elements

const dateForm =
    document.getElementById("date-form");

const surpriseSection =
    document.getElementById("surprise-section");

const trustBtn =
    document.getElementById("trust-btn");

const formSuccess =
    document.getElementById("form-success");


// =====================================
// OPEN ENVELOPE
// =====================================

envelope.addEventListener("click", () => {

    envelope.style.display = "none";

    letter.style.display = "flex";

    setTimeout(() => {

        document
            .querySelector(".letter-window")
            .classList.add("open");

    }, 50);

});


// =====================================
// MOVE NO BUTTON
// =====================================

function moveNoButton() {

    const distance =
        120 + Math.random() * 100;

    const angle =
        Math.random() * Math.PI * 2;

    const moveX =
        Math.cos(angle) * distance;

    const moveY =
        Math.sin(angle) * distance;

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


// =====================================
// YES BUTTON
// =====================================

yesBtn.addEventListener("click", () => {

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


    // Hide YES / NO
    buttons.style.display =
        "none";


    // Show planning section
    finalSection.style.display =
        "block";

});


// =====================================
// "I HAVE AN IDEA"
// =====================================

ideaBtn.addEventListener("click", () => {

    // Hide choices
    suggestionChoice.style.display =
        "none";


    // Show form
    dateForm.style.display =
        "flex";

});


// =====================================
// "YOU DECIDE"
// =====================================

surpriseBtn.addEventListener("click", () => {

    // Hide choices
    suggestionChoice.style.display =
        "none";


    // Show surprise message
    surpriseSection.style.display =
        "block";

});


// =====================================
// SEND CUSTOM DATE
// =====================================

dateForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const suggestion =
            document
                .getElementById("suggestion")
                .value
                .trim();


        const place =
            document
                .getElementById("place")
                .value
                .trim();


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


        // Prevent multiple submissions
        sendButton.disabled =
            true;

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

                            responseType:
                                "suggestion",

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
                "Date response:",
                data
            );


            if (!response.ok) {

                throw new Error(
                    data.message ||
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


// =====================================
// "I'M TRUSTING YOU"
// =====================================

trustBtn.addEventListener(
    "click",
    async () => {

        trustBtn.disabled = true;

        trustBtn.textContent =
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

                            responseType:
                                "surprise",

                            acceptedAt:
                                new Date().toISOString(),

                            suggestion:
                                "She doesn't have a suggestion — she wants me to plan the date! ❤️",

                            place:
                                "I'll choose the place ❤️",

                            date:
                                "I'll choose the date ❤️",

                            time:
                                "I'll choose the time ❤️"

                        })
                    }
                );

            const data =
                await response.json();

            console.log(
                "Date acceptance:",
                data
            );

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to send notification"
                );

            }

            // Hide surprise section
            surpriseSection.style.display =
                "none";

            // Show success
            formSuccess.textContent =
                "It's officially a date! ❤️🥰";

            formSuccess.style.display =
                "block";

        }
        catch (error) {

            console.error(
                "Failed to send date:",
                error
            );

            trustBtn.disabled =
                false;

            trustBtn.textContent =
                "Try Again ❤️";

        }

    }
);
