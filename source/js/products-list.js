document.addEventListener("DOMContentLoaded", function () {
    const productsList = document.querySelector('.products-list');
    const loadMoreBtn = document.querySelector('.products__link');
    const allImages = Array.from(document.querySelectorAll('.products-list__item'));
    let visibleImagesCount = 4; // Начальное количество картинок для показа
    let totalImages = allImages.length;
    let imagesLoaded = 4; // Начальное количество показанных картинок
    // Функция для обновления количества отображаемых картинок
    function updateVisibleImagesCount() {
      if (window.innerWidth <= 320) {
        visibleImagesCount = 4; // 4 картинки на экране 320px
      } else if (window.innerWidth <= 660) {
        visibleImagesCount = 6; // 6 картинок на экране 660px
      } else if (window.innerWidth <= 1200) {
        visibleImagesCount = 8; // 8 картинок на экране 1200px
      } else {
        visibleImagesCount = 12; // 12 картинок на экране больше 1200px
      }
      displayImages();
    }
    // Функция для отображения картинок
    function displayImages() {
      // Показываем изображения в зависимости от видимой позиции
      allImages.forEach((item, index) => {
        if (index < imagesLoaded) {
          item.style.display = 'block'; // Показываем картинку
        } else {
          item.style.display = 'none'; // Скрываем картинку
        }
      });
      if (imagesLoaded >= totalImages) {
        loadMoreBtn.style.display = 'none'; // Если все изображения показаны, скрываем кнопку
      }
    }
    // Обработчик клика по кнопке "Просмотреть больше"
    loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      imagesLoaded += 4; // Загружаем еще 4 картинки при клике
      displayImages();
    });
    // Слушаем изменения размера экрана
    window.addEventListener('resize', () => {
      updateVisibleImagesCount();
    });
    // Инициализация отображения картинок и их количества при загрузке страницы
    updateVisibleImagesCount();
  });
