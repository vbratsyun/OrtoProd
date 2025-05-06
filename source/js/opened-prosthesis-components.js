const buttons = document.querySelectorAll(".prosthesis-list__button");



const onButtonClick = (event) => {
  event.preventDefault();
  if (event.target.closest(".prosthesis-list__fieldset")) {
    event.target
      .closest(".prosthesis-list__fieldset")
      .classList.toggle("prosthesis-list__fieldset--opened");
  }
};

buttons.forEach((button) => button.addEventListener("click", onButtonClick));
