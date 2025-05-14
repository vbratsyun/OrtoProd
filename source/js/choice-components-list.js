document.querySelectorAll('.prosthesis-list__item').forEach((item) => {
  const componentsList = item.querySelector('.components-list');
  const priceValueElement = item.querySelector('.prosthesis-list__price-value--radio');

  // Пропускаем, если не нашли нужные элементы
  if (!componentsList || !priceValueElement) return;

  // Удаляем класс "no-js"
  componentsList.classList.remove('components-list--nojs');

  function updatePriceFromCheckedRadio() {
    const checkedRadio = componentsList.querySelector('.components-list__control-radio:checked');
    if (checkedRadio) {
      const newPrice = checkedRadio.getAttribute('data-price');
      const currencyPart = priceValueElement.querySelector('.prosthesis-list__footnote-sign')?.outerHTML || '';
      priceValueElement.innerHTML = `${newPrice}${currencyPart} руб.`;
    }
  }

  // Обработчик для кликов по лейблам
  componentsList.addEventListener('click', (event) => {
    const label = event.target.closest('label.components-list__control');
    if (!label) return;

    const radio = label.querySelector('input.components-list__control-radio');
    if (!radio) return;

    if (radio.disabled) {
      radio.disabled = false;
      radio.checked = true;

      // Снимаем выбор с других радиокнопок в этом блоке
      const name = radio.name;
      item.querySelectorAll(`input[name="${name}"]`).forEach((el) => {
        if (el !== radio) el.checked = false;
      });

      radio.dispatchEvent(new Event('change', { bubbles: true }));
      event.preventDefault();
    }
  });

  // Обновляем цену при загрузке
  updatePriceFromCheckedRadio();

  // Также можно подписаться на change-событие радиокнопок
  componentsList.addEventListener('change', updatePriceFromCheckedRadio);
});
