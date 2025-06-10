const upButton = document.querySelector(".page-body__up-button");

const onUpButtonClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const onWindowScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const halfPage = document.documentElement.scrollHeight / 2;

  if (scrollTop > 110) {
    upButton.classList.add("page-body__up-button--show");
  } else {
    upButton.classList.remove("page-body__up-button--show");
  }
};

if (upButton) {
  upButton.addEventListener("click", onUpButtonClick);
  window.addEventListener("scroll", onWindowScroll);
}
