document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.classList.remove('carousel--nojs');
  }

  const buttons = document.querySelectorAll(".prosthesis-list__button");

  buttons.forEach(button => {
    const value = button.querySelector('.prosthesis-list__value');
    const fieldset = button.closest(".prosthesis-list__fieldset");

    const shouldPulse = button.hasAttribute('data-pulsing');

    if (shouldPulse && fieldset && !fieldset.classList.contains('prosthesis-list__fieldset--opened')) {
      button.classList.add('prosthesis-list__button--pulse');
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const fieldset = button.closest(".prosthesis-list__fieldset");
      if (!fieldset) return;

      const isOpened = fieldset.classList.contains("prosthesis-list__fieldset--opened");
      fieldset.classList.toggle("prosthesis-list__fieldset--opened");

      if (shouldPulse) {
        if (!isOpened) {
          button.classList.remove('prosthesis-list__button--pulse');
        } else {
          button.classList.add('prosthesis-list__button--pulse');
        }
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

      priceValueElement.innerHTML = `${newPrice}${currencyPart} руб.`;

      pictures.forEach(pic => {
        pic.style.display = pic.getAttribute('data-option') === option ? '' : 'none';
      });

      descriptions.forEach(desc => {
        desc.style.display = desc.getAttribute('data-option') === option ? '' : 'none';
      });
    }

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
