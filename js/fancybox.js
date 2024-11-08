document.addEventListener("DOMContentLoaded", function () {
  // Инициализация каждой галереи по отдельности
  Fancybox.bind("[data-fancybox='gallery__lending']", {
    loop: true,
    buttons: ["zoom", "close"],
    transitionEffect: "fade",
  });

  Fancybox.bind("[data-fancybox='gallery__corporation']", {
    loop: true,
    buttons: ["zoom", "close"],
    transitionEffect: "fade",
  });

  Fancybox.bind("[data-fancybox='gallery__internet-shop']", {
    loop: true,
    buttons: ["zoom", "close"],
    transitionEffect: "fade",
  });

  Fancybox.bind("[data-fancybox='gallery__redesign']", {
    loop: true,
    buttons: ["zoom", "close"],
    transitionEffect: "fade",
  });
});
