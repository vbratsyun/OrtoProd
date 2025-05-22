const carousel = document.querySelector(".carousel");

carousel.classList.remove('carousel--nojs');


document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll(".prosthesis-list__button");

  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const fieldset = event.target.closest(".prosthesis-list__fieldset");
      if (fieldset) {
        fieldset.classList.toggle("prosthesis-list__fieldset--opened");
      }
    });
  });

  document.querySelectorAll('.prosthesis-list__item').forEach(item => {
    const componentsList = item.querySelector('.components-list');
    const priceValueElement = item.querySelector('.prosthesis-list__price-value--radio');
    if (!componentsList || !priceValueElement) return;

    componentsList.classList.remove('components-list--nojs');

    const pictures = item.querySelectorAll('picture[data-option]');
    const descriptions = item.querySelectorAll('.prosthesis-list__description[data-option]');

    function updateContentFromCheckedRadio() {
      const checkedRadio = componentsList.querySelector('.components-list__control-radio:checked');
      if (!checkedRadio) return;

      const option = checkedRadio.value;
      const newPrice = checkedRadio.getAttribute('data-price');
      const currencyPart = priceValueElement.querySelector('.prosthesis-list__footnote-sign')?.outerHTML || '';

      // Обновляем цену
      priceValueElement.innerHTML = `${newPrice}${currencyPart} руб.`;

      // Показываем/скрываем картинки
      pictures.forEach(pic => {
        pic.style.display = pic.getAttribute('data-option') === option ? '' : 'none';
      });

      // Показываем/скрываем описания
      descriptions.forEach(desc => {
        desc.style.display = desc.getAttribute('data-option') === option ? '' : 'none';
      });
    }

    // Если радио заблокировано (disabled), разблокируем и ставим checked при клике
    componentsList.addEventListener('click', (event) => {
      const label = event.target.closest('label.components-list__control');
      if (!label) return;

      const radio = label.querySelector('input.components-list__control-radio');
      if (!radio) return;

      if (radio.disabled) {
        radio.disabled = false;
        radio.checked = true;

        const name = radio.name;
        item.querySelectorAll(`input[name="${name}"]`).forEach(el => {
          if (el !== radio) el.checked = false;
        });

        radio.dispatchEvent(new Event('change', { bubbles: true }));
        event.preventDefault();
      }
    });

    updateContentFromCheckedRadio();

    componentsList.addEventListener('change', updateContentFromCheckedRadio);
  });
});
