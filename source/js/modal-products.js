document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const closeBtn = document.getElementById("close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let currentPictures = [];
  let currentModalIndex = 0;

  function getResponsiveImageSrc(pictureElement) {
    const sources = pictureElement.querySelectorAll("source");
    const img = pictureElement.querySelector("img");
    const viewportWidth = window.innerWidth;

    let selectedSrc = img.src;

    sources.forEach((source) => {
      const media = source.media;
      if (!media || window.matchMedia(media).matches) {
        const srcset = source.getAttribute("srcset").split(",")[0].trim();
        selectedSrc = srcset;
      }
    });

    return {
      src: selectedSrc,
      alt: img.alt,
    };
  }

  function updateImage(index) {
    const picture = currentPictures[index];
    const { src, alt } = getResponsiveImageSrc(picture);
    modalImage.src = src;
    modalImage.alt = alt;
    currentModalIndex = index;
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  prevBtn.addEventListener("click", () => {
    currentModalIndex =
      currentModalIndex > 0
        ? currentModalIndex - 1
        : currentPictures.length - 1;
    updateImage(currentModalIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentModalIndex =
      currentModalIndex < currentPictures.length - 1
        ? currentModalIndex + 1
        : 0;
    updateImage(currentModalIndex);
  });

  // Обработка всех карточек
  document.querySelectorAll(".prosthesis-list__item").forEach((item) => {
    const radios = item.querySelectorAll(".components-list__control-radio");
    const imageContainer = item.querySelector(".prosthesis-list__container--image");
    const pictures = imageContainer.querySelectorAll("picture");
    const priceValueElement = item.querySelector(".prosthesis-list__price-value--radio");

    // Если радиокнопки есть
    if (radios.length > 0 && priceValueElement) {
      function updateVisiblePictures() {
        const selectedRadio = item.querySelector(".components-list__control-radio:checked");
        if (!selectedRadio) return;

        const selectedValue = selectedRadio.value;

        pictures.forEach((picture) => {
          picture.style.display =
            picture.dataset.option === selectedValue ? "block" : "none";
        });

        const newPrice = selectedRadio.getAttribute("data-price");
        const currencyPart =
          priceValueElement.querySelector(".prosthesis-list__footnote-sign")?.outerHTML || "";
        priceValueElement.innerHTML = `${newPrice}${currencyPart} руб.`;
      }

      updateVisiblePictures();

      radios.forEach((radio) => {
        radio.addEventListener("change", updateVisiblePictures);
      });

      pictures.forEach((picture) => {
        const img = picture.querySelector("img");
        img.addEventListener("click", () => {
          const selectedRadio = item.querySelector(".components-list__control-radio:checked");
          if (!selectedRadio) return;

          const selectedValue = selectedRadio.value;
          const optionPictures = item.querySelectorAll(`picture[data-option="${selectedValue}"]`);
          currentPictures = Array.from(optionPictures);
          currentModalIndex = currentPictures.findIndex((p) => p.querySelector("img") === img);
          if (currentModalIndex >= 0) {
            const { src, alt } = getResponsiveImageSrc(currentPictures[currentModalIndex]);
            modalImage.src = src;
            modalImage.alt = alt;
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
          }
        });
      });
    } else {
      // Элемент без радиокнопок — просто открываем все картинки
      pictures.forEach((picture) => {
        const img = picture.querySelector("img");
        img.addEventListener("click", () => {
          currentPictures = Array.from(pictures);
          currentModalIndex = currentPictures.findIndex((p) => p.querySelector("img") === img);
          if (currentModalIndex >= 0) {
            const { src, alt } = getResponsiveImageSrc(currentPictures[currentModalIndex]);
            modalImage.src = src;
            modalImage.alt = alt;
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
          }
        });
      });
    }
  });
});
