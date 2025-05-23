const buttonBack = document.querySelector(".controls__button-prev");
const buttonForward = document.querySelector(
  ".controls__button-forward"
);
const legProsthesisList = document.querySelector(".prosthesis-list");

buttonForward.addEventListener("click", () => {
    legProsthesisList.append(legProsthesisList.children[0]);
});

buttonBack.addEventListener("click", () => {
    legProsthesisList.prepend(
        legProsthesisList.children[legProsthesisList.children.length - 1]
  );
});
