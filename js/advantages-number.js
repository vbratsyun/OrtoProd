const advantagesListNumber = document.querySelectorAll(".advantages-list__number");
advantagesListNumber.forEach((num, index) => {
  num.textContent = index + 1;
  num.classList.add(".advantages-list__number");
});
