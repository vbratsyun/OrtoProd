const upButton = document.querySelector('.page-body__up-button');
const targetSection = document.querySelector('.services'); // Секция, при достижении которой появится кнопка

const onUpButtonClick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const onWindowScroll = () => {
  if (!targetSection) return; // Проверка на существование элемента

  const sectionPosition = targetSection.getBoundingClientRect().top; // Позиция секции относительно вьюпорта

  if (sectionPosition <= window.innerHeight / 2) { // Когда секция попадает в середину экрана
    upButton.classList.add('page-body__up-button--show');
  } else {
    upButton.classList.remove('page-body__up-button--show');
  }
};

upButton.addEventListener('click', onUpButtonClick);
window.addEventListener('scroll', onWindowScroll);
