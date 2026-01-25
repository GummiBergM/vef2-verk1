const questionCards = document.querySelectorAll(".question");
const buttons = document.querySelectorAll(".subButton");

questionCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("clickedCard");
    });
});

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {

        buttons.forEach((b) => b.classList.remove("buttonClicked"));
        btn.classList.add("buttonClicked");

        const sub = btn.dataset.sub;

        console.log("Clicked:", sub);

        const matching = document.querySelectorAll(".question." + sub);

        document.querySelectorAll(".question").forEach((q) => {
            q.style.display = "none";
        });

        matching.forEach((q) => {
            q.style.display = "block";
        });
    });
});
