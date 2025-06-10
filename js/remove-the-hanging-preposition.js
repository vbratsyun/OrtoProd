document.querySelectorAll("p, span, li").forEach((el) => {
  el.innerHTML = el.innerHTML.replace(
    /(\s|^)([а-яА-ЯёЁ]{1,2})\s/g,
    "$1$2&nbsp;"
  );
});
