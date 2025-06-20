document.addEventListener("DOMContentLoaded", () => {
  const callbackButton = document.querySelector(".callback-button");
  const popupForm = document.querySelector(".popup--form");
  const popupThanks = document.querySelector(".popup--thanks");
  const closeButtons = document.querySelectorAll(".popup__close-btn");
  const form = document.getElementById("callback-form");
  const submitButton = form.querySelector(".popup__submit");

  if (!callbackButton || !popupForm || !form || !submitButton) {
    console.warn("Не найден один из обязательных элементов формы.");
    return;
  }

  const phoneInput = form.querySelector("#phone");
  const nameInput = form.querySelector("#name");
  const privacyCheckbox = form.querySelector(".popup__privacy-input");
  const warningText = form.querySelector(".popup__privacy-text--warning");
  const nameError = document.getElementById("name-error");
  const phoneError = document.getElementById("phone-error");

  Inputmask({ mask: "+7 (999) 999-99-99" }).mask(phoneInput);

  const nameRegex = /^[А-Яа-яЁё\s-]+$/;
  const phoneRegex = /^\d{10}$/;

  // Проверка валидности формы + переключение кнопки
  function validateFormAndToggleButton() {
    const rawPhone = phoneInput.inputmask.unmaskedvalue();
    const isNameValid = nameRegex.test(nameInput.value.trim());
    const isPhoneValid = phoneRegex.test(rawPhone);
    const isPrivacyChecked = privacyCheckbox.checked;

    // Установка сообщений и классов ошибок для живой проверки
    if (!isNameValid && nameInput.value.trim() !== "") {
      nameInput.classList.add("error");
      nameError.textContent = "Имя должно быть на кириллице";
    } else {
      nameInput.classList.remove("error");
      nameError.textContent = "";
    }

    if (!isPhoneValid && rawPhone !== "") {
      phoneInput.classList.add("error");
      phoneError.textContent = "Введите номер РФ (+7 и 10 цифр)";
    } else {
      phoneInput.classList.remove("error");
      phoneError.textContent = "";
    }

    if (!isPrivacyChecked) {
      privacyCheckbox.classList.add("error");
      warningText.classList.add("popup__privacy-text--error");
      warningText.textContent = "Вы должны согласиться с Политикой конфиденциальности";
    } else {
      privacyCheckbox.classList.remove("error");
      warningText.classList.remove("popup__privacy-text--error");
      warningText.textContent = "";
    }

    // Если хоть одно поле невалидно, блокируем кнопку
    if (!isNameValid || !isPhoneValid || !isPrivacyChecked) {
      submitButton.classList.add("disabled");
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove("disabled");
      submitButton.disabled = false;
    }
  }

  // Изначально кнопка заблокирована
  submitButton.classList.add("disabled");
  submitButton.disabled = true;

  // Открытие формы
  callbackButton.addEventListener("click", () => {
    popupForm.classList.add("active");
  });

  // Закрытие по кнопке
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closePopups();
    });
  });

  // Закрытие по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopups();
    }
  });

  // Закрытие по клику вне попапа
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      closePopups();
    }
  });

  // Очистка и закрытие
  function closePopups() {
    popupForm.classList.remove("active");
    popupThanks.classList.remove("active");
    form.reset();
    nameInput.classList.remove("error");
    phoneInput.classList.remove("error");
    privacyCheckbox.classList.remove("error");
    nameError.textContent = "";
    phoneError.textContent = "";
    warningText.textContent = "";
    warningText.classList.remove("popup__privacy-text--error");
    Inputmask.remove(phoneInput);
    Inputmask({ mask: "+7 (999) 999-99-99" }).mask(phoneInput);

    // Заблокировать кнопку после сброса
    submitButton.classList.add("disabled");
    submitButton.disabled = true;
  }

  // Валидация при вводе и изменении
  nameInput.addEventListener("input", validateFormAndToggleButton);
  phoneInput.addEventListener("input", validateFormAndToggleButton);
  privacyCheckbox.addEventListener("change", validateFormAndToggleButton);

  // Отправка формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateFormAndToggleButton(); // Финальная проверка

    if (submitButton.disabled) {
      return; // Если невалидно, не отправляем
    }

    const formData = new FormData(form);

    fetch("send.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка сети");
        return response.text();
      })
      .then(() => {
        closePopups();
        popupThanks.classList.add("active");
        setTimeout(() => {
          popupThanks.classList.remove("active");
        }, 3000);
      })
      .catch(() => {
        warningText.textContent = "Ошибка при отправке. Попробуйте позже.";
        warningText.classList.add("popup__privacy-text--error");
      });
  });
});
