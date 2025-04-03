// Получаем элементы
const images = document.querySelectorAll(".products-list__item img");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Индекс текущего изображения
let currentIndex = 0;

// Скрываем попап сразу через CSS при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
});

// Функция для открытия модального окна с изображением
images.forEach((image, index) => {
  image.addEventListener("click", () => {
    modal.style.display = "flex"; // Показываем модальное окно
    modalImage.src = image.src; // Устанавливаем источник изображения
    modalImage.alt = image.alt; // Устанавливаем описание изображения
    currentIndex = index; // Устанавливаем индекс текущего изображения

    // Блокируем прокрутку страницы
    document.body.style.overflow = "hidden";
  });
});

// Функция закрытия модального окна
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = ""; // Восстанавливаем прокрутку страницы
}

// Закрытие модального окна при клике на крестик
closeBtn.addEventListener("click", closeModal);

// Закрытие модального окна при клике за пределами изображения
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Закрытие модального окна при нажатии клавиши Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Функция для обновления изображения в модальном окне
function updateImage(index) {
  const image = images[index];
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  currentIndex = index;
}

// Кнопка "предыдущее"
prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  updateImage(currentIndex);
});

// Кнопка "следующее"
nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  updateImage(currentIndex);
});
