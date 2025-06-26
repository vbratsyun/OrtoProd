document.querySelectorAll('.roadmap__button').forEach((button) => {
  button.addEventListener('click', () => {
    const container = button
      .closest('.roadmap__more-detailed')
      .querySelector('.roadmap__more-detailed-container');

    button.classList.toggle('roadmap__button--active');
    container.classList.toggle('roadmap__more-detailed-container--opened');
  });
});
