document.addEventListener("DOMContentLoaded", () => {
  const navMain = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav__toggle");

  if (navMain) {
    navMain.classList.remove("nav--nojs");
  }

  const onNavToggleClick = () => {
    if (navMain.classList.contains("nav--closed")) {
      navMain.classList.remove("nav--closed");
      navMain.classList.add("nav--opened");
    } else {
      navMain.classList.remove("nav--opened");
      navMain.classList.add("nav--closed");
    }
  };

  navToggle.addEventListener("click", onNavToggleClick);
});
