const buttonBack = document.querySelector(".controls__button-prev");
const buttonForward = document.querySelector(".controls__button-forward");

// пытаемся найти список на странице
const legProsthesisList = document.querySelector(".prosthesis-list");
const usefulArticlesList = document.querySelector(".useful-articles__list");

// выбираем, что есть на странице
const list = legProsthesisList || usefulArticlesList;

if (buttonBack && buttonForward && list) {
  const setupControls = (buttonPrev, buttonNext, list) => {
    buttonNext.addEventListener("click", () => {
      list.append(list.children[0]);
    });

    buttonPrev.addEventListener("click", () => {
      list.prepend(list.children[list.children.length - 1]);
    });
  };

  setupControls(buttonBack, buttonForward, list);
}
