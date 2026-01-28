const questions = document.querySelectorAll(".question");
const buttons = document.querySelectorAll(".subButton");

// Card click: toggle highlight + reveal the answer buttons inside that card
questions.forEach((card) => {
    const correctBtn = card.querySelector("button.correct");
    const wrongBtn = card.querySelector("button.wrong");

    card.addEventListener("click", (e) => {
        // If user clicked one of the inner buttons, don't treat it as a card click.
        if (e.target.closest("button")) return;

        card.classList.add("clickedCard");

        if (correctBtn) correctBtn.classList.add("showButton");
        if (wrongBtn) wrongBtn.classList.add("showButton");
    });

    correctBtn.addEventListener("click", () => {
        card.classList.add("correctCard");
        correctBtn.classList.add("hideButton");
        wrongBtn.classList.add("hideButton");
    });

    wrongBtn.addEventListener("click", () => {
        card.classList.add("wrongCard");
        correctBtn.classList.add("hideButton");
        wrongBtn.classList.add("hideButton");
    });
});

// Subcategory filter buttons
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("buttonClicked"));
        btn.classList.add("buttonClicked");

        const sub = btn.dataset.sub;

        // Hide all questions first
        questions.forEach((q) => {
            q.style.display = "none";
        });

        // Show matching questions
        const matching = document.querySelectorAll(".question." + sub);
        matching.forEach((q) => {
            q.style.display = "block";
        });
    });
});
