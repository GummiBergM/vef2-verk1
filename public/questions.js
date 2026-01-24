const questionCards = document.querySelectorAll(".question");

questionCards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("clickedCard");
  });
});