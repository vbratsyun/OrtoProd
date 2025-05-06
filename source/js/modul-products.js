const items = document.querySelectorAll(".leg-prosthesis-list__item");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentItemIndex = 0;
let currentImageIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
});

function getResponsiveImageSrc(pictureElement) {
  const sources = pictureElement.querySelectorAll("source");
  const img = pictureElement.querySelector("img");
  const viewportWidth = window.innerWidth;

  let selectedSrc = img.src;

  sources.forEach((source) => {
    const media = source.media;
    if (window.matchMedia(media).matches) {
      const srcset = source.getAttribute("srcset").split(",")[0].trim();
      selectedSrc = srcset;
    }
  });

  return {
    src: selectedSrc,
    alt: img.alt,
  };
}

// Назначаем обработчики для каждой картинки в item
items.forEach((item, itemIndex) => {
  const pictures = item.querySelectorAll("picture");

  pictures.forEach((picture, imageIndex) => {
    const img = picture.querySelector("img");

    img.addEventListener("click", () => {
      const { src, alt } = getResponsiveImageSrc(picture);
      modalImage.src = src;
      modalImage.alt = alt;

      currentItemIndex = itemIndex;
      currentImageIndex = imageIndex;

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function updateImage(index) {
  const item = items[currentItemIndex];
  const pictures = item.querySelectorAll("picture");

  if (index >= 0 && index < pictures.length) {
    const { src, alt } = getResponsiveImageSrc(pictures[index]);
    modalImage.src = src;
    modalImage.alt = alt;
    currentImageIndex = index;
  }
}

prevBtn.addEventListener("click", () => {
  const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : 1;
  updateImage(newIndex);
});

nextBtn.addEventListener("click", () => {
  const newIndex = currentImageIndex < 1 ? currentImageIndex + 1 : 0;
  updateImage(newIndex);
});
