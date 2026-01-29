const questions = document.querySelectorAll(".question");
const buttons = document.querySelectorAll(".subButton");
const header = document.querySelector("header");

let correctCount = 0;
let wrongCount = 0;
let percent = 50;

const MAX_QUESTIONS = 100;

function showOnlyFirstN(list, n = MAX_QUESTIONS) {
    questions.forEach((q) => {
        q.style.display = "none";
    });

    Array.from(list).slice(0, n).forEach((q) => {
        q.style.display = "block";
    });
}

// Header background colour percent based on questions answered correctly
function updateHeaderBackground() {
    const total = correctCount + wrongCount;
    percent = total === 0 ? 50 : (correctCount / total) * 100;
    header.style.background = `linear-gradient(to right, var(--green) ${percent}%, var(--red) ${percent}%)`;
}

updateHeaderBackground();

showOnlyFirstN(questions);



questions.forEach((card) => {
    const correctBtn = card.querySelector("button.correct");
    const wrongBtn = card.querySelector("button.wrong");

    card.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;

        card.classList.add("clickedCard");

        if (correctBtn) correctBtn.classList.add("showButton");
        if (wrongBtn) wrongBtn.classList.add("showButton");
    });

    correctBtn.addEventListener("click", () => {
        card.classList.add("correctCard");
        correctBtn.classList.add("hideButton");
        wrongBtn.classList.add("hideButton");
        
        correctCount++;
        document.getElementById("correctCounter").textContent = correctCount;
        updateHeaderBackground();
    });

    wrongBtn.addEventListener("click", () => {
        card.classList.add("wrongCard");
        correctBtn.classList.add("hideButton");
        wrongBtn.classList.add("hideButton");

        wrongCount++;
        document.getElementById("wrongCounter").textContent = wrongCount;
        updateHeaderBackground();
    });
});


buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("buttonClicked"));
        btn.classList.add("buttonClicked");

        const sub = btn.dataset.sub;

        const matching = document.querySelectorAll(".question." + sub);
        showOnlyFirstN(matching);
    });
});