const componentsList = document.querySelector('.components-list');
const priceValueElement = document.querySelector('.prosthesis-list__price-value--radio');

// Удаляем класс, указывающий на отсутствие JS
componentsList.classList.remove('components-list--nojs');

function updatePriceFromCheckedRadio() {
  const checkedRadio = document.querySelector('.components-list__control-radio:checked');
  if (checkedRadio) {
    const newPrice = checkedRadio.getAttribute('data-price');
    const currencyPart = priceValueElement.querySelector('.prosthesis-list__footnote-sign')?.outerHTML || '';
    priceValueElement.innerHTML = `${newPrice}${currencyPart} руб.`;
  }
}

// Делегирование кликов на label
componentsList.addEventListener('click', (event) => {
  const label = event.target.closest('label.components-list__control');
  if (!label) return;

  const radio = label.querySelector('input.components-list__control-radio');
  if (!radio) return;

  // Если радио отключено — активируем
  if (radio.disabled) {
    radio.disabled = false;
    radio.checked = true;

    const name = radio.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach((el) => {
      if (el !== radio) el.checked = false;
    });

    // Явно запускаем change-событие
    radio.dispatchEvent(new Event('change', { bubbles: true }));

    event.preventDefault();
  }
});

// Обновляем цену при загрузке
updatePriceFromCheckedRadio();
