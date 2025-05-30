document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".articles-filters__button");
  const articles = document.querySelectorAll(".articles-list__item");

  // Показываем все статьи при загрузке
  articles.forEach((item) => (item.style.display = "block"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.value;

      // Удаляем активный класс у всех кнопок
      buttons.forEach((btn) =>
        btn.classList.remove("articles-filters__button--current")
      );

      // Добавляем активный класс к текущей кнопке
      button.classList.add("articles-filters__button--current");

      // Фильтруем статьи
      articles.forEach((item) => {
        const category = item.dataset.category;
        item.style.display =
          filter === "all" || category === filter ? "block" : "none";
      });
    });
  });
});
