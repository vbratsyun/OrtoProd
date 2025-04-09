const images = document.querySelectorAll(".products-list__item picture");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
});

function getResponsiveImageSrc(pictureElement) {
  const sources = pictureElement.querySelectorAll("source");
  const img = pictureElement.querySelector("img");
  const viewportWidth = window.innerWidth;

  // Выбираем source по media
  let selectedSrc = img.src; // fallback

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

images.forEach((picture, index) => {
  const img = picture.querySelector("img");

  img.addEventListener("click", () => {
    const { src, alt } = getResponsiveImageSrc(picture);
    modalImage.src = src;
    modalImage.alt = alt;
    currentIndex = index;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
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
  const picture = images[index];
  const { src, alt } = getResponsiveImageSrc(picture);
  modalImage.src = src;
  modalImage.alt = alt;
  currentIndex = index;
}

prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  updateImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  updateImage(currentIndex);
});
