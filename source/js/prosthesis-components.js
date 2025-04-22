const buttons = document.querySelectorAll(".leg-prosthesis-list__button");

const onButtonClick = (event) => {
  event.preventDefault();
  if (event.target.closest(".leg-prosthesis-list__fieldset")) {
    event.target
      .closest(".leg-prosthesis-list__fieldset")
      .classList.toggle("leg-prosthesis-list__fieldset--opened");
  }
};

buttons.forEach((button) => button.addEventListener("click", onButtonClick));
