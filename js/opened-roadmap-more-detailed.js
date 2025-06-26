document.addEventListener("DOMContentLoaded", function () {
  // Удаляем no-js классы у разделов
  document.querySelector(".receive-IPRA")?.classList.remove("receive-IPRA--nojs");
  document.querySelector(".preface")?.classList.remove("preface--nojs");

  // Обрабатываем каждый блок "Подробнее"
  document.querySelectorAll(".roadmap__more-detailed").forEach((item) => {
    const container = item.querySelector(".roadmap__more-detailed-container");
    const button = item.querySelector(".roadmap__button");
    const arrow = button.querySelector(".roadmap__button-arrow");

    // Удаляем "по умолчанию открыто"
    container.classList.remove("roadmap__more-detailed-container--opened");
    button.classList.remove("roadmap__button--active");
    arrow.classList.remove("roadmap__button-arrow--rotated");

    // Обработка клика
    button.addEventListener("click", () => {
      const isOpened = container.classList.toggle("roadmap__more-detailed-container--opened");
      button.classList.toggle("roadmap__button--active");
      arrow.classList.toggle("roadmap__button-arrow--rotated", isOpened);
    });
  });
});
