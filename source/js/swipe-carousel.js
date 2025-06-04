// const buttonBack = document.querySelector(".controls__button-prev");
// const buttonForward = document.querySelector(".controls__button-forward");

// // пытаемся найти список на странице
// const legProsthesisList = document.querySelector(".prosthesis-list");
// const usefulArticlesList = document.querySelector(".useful-articles__list");

// // выбираем, что есть на странице
// const list = legProsthesisList || usefulArticlesList;

// if (buttonBack && buttonForward && list) {
//   const setupControls = (buttonPrev, buttonNext, list) => {
//     buttonNext.addEventListener("click", () => {
//       list.append(list.children[0]);
//     });

//     buttonPrev.addEventListener("click", () => {
//       list.prepend(list.children[list.children.length - 1]);
//     });
//   };

//   setupControls(buttonBack, buttonForward, list);
// }


const buttonBack    = document.querySelector('.controls__button-prev');
const buttonForward = document.querySelector('.controls__button-forward');

// один из списков на странице
const legProsthesisList = document.querySelector('.prosthesis-list');
const usefulArticlesList = document.querySelector('.useful-articles__list');
const list = legProsthesisList || usefulArticlesList;

if (buttonBack && buttonForward && list) {

  /* ====== ПОДГОТОВКА СЧЁТЧИКА ====== */
  let pager = document.querySelector('.carousel__pager');
  if (!pager) {
    pager = document.createElement('div');
    pager.className = 'carousel__pager';
    pager.innerHTML = '<span class="carousel__current"></span>&nbsp;из&nbsp;<span class="carousel__total"></span>';
    buttonBack.parentNode.insertBefore(pager, buttonForward); // ставим перед кнопкой buttonForward блок .carousel__pager
  }
  const currentEl = pager.querySelector('.carousel__current');
  const totalEl   = pager.querySelector('.carousel__total');

  const totalItems = list.children.length;
  let   currentIdx = 1;                       // начинаем с первой карточки

  totalEl.textContent   = totalItems;
  currentEl.textContent = currentIdx;

  const updateIndex = (delta) => {
    currentIdx += delta;
    if (currentIdx > totalItems) currentIdx = 1;
    if (currentIdx < 1)          currentIdx = totalItems;
    currentEl.textContent = currentIdx;
  };

  /* ====== НАСТРАИВАЕМ КНОПКИ ====== */
  const setupControls = (buttonPrev, buttonNext, list) => {

    buttonNext.addEventListener('click', () => {
      list.append(list.children[0]);   // «вперёд»
      updateIndex(+1);
    });

    buttonPrev.addEventListener('click', () => {
      list.prepend(list.children[list.children.length - 1]); // «назад»
      updateIndex(-1);
    });
  };

  setupControls(buttonBack, buttonForward, list);
}
