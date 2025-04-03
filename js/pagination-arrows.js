const teamItems = document.querySelectorAll(".team-list__item");
const buttonBack = document.querySelector(".pagination-arrows__prew");
const buttonForward = document.querySelector(".pagination-arrows__next");

// Функция для обновления активного слайда и кнопки пагинации
const updateCarousel = (index) => {
  teamItems.forEach((teamItem) =>
    teamItem.classList.remove("team-list__item--current")
  );
  teamItems[index].classList.add("team-list__item--current");
};

// Обработчик клика по кнопке 'Предыдущий'
const onButtonBackClick = () => {
  let currentIndex = [...teamItems].findIndex((teamItem) =>
    teamItem.classList.contains("team-list__item--current")
  );
  currentIndex = currentIndex > 0 ? currentIndex - 1 : teamItems.length - 1; // Переход на предыдущий слайд, если это не первый
  updateCarousel(currentIndex);
};

// Обработчик клика по кнопке 'Следующий'
const onButtonForwardClick = () => {
  let currentIndex = [...teamItems].findIndex((teamItem) =>
    teamItem.classList.contains("team-list__item--current")
  );
  currentIndex = currentIndex < teamItems.length - 1 ? currentIndex + 1 : 0; // Переход на следующий слайд, если это не последний
  updateCarousel(currentIndex);
};

buttonForward.addEventListener("click", onButtonForwardClick);
buttonBack.addEventListener("click", onButtonBackClick);
updateCarousel(0);
