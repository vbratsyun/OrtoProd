document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter__number");
  const targets = [598, 2, 2];
  let isAnimated = false;

  function animateCounter(counter, target) {
    let count = 0;
    const speed = target / 50;

    function updateCounter() {
      count += speed;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    }
    updateCounter();
  }

  function resetCounters() {
    counters.forEach(counter => {
      counter.innerText = "0";
    });
  }

  function handleScroll() {
    if (isAnimated) return;
    const section = document.querySelector(".page-main__counter");
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight * 0.75) {
      counters.forEach((counter, index) => {
        counter.innerText = "0";
        animateCounter(counter, targets[index]);
      });
      isAnimated = true;
    }
  }

  window.addEventListener("scroll", handleScroll);
});
