document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popupForm");
  const overlay = document.getElementById("overlay");
  const body = document.querySelector("body");

  document.querySelector(".header__btn").addEventListener("click", function () {
    popup.style.display = "flex";
    overlay.classList.add("active");
    body.classList.add("noscroll");
  });

  document.querySelector(".intro__btn").addEventListener("click", function () {
    popup.style.display = "flex";
    overlay.classList.add("active");
    body.classList.add("noscroll");
  });

  document
    .querySelector(".popup__close")
    .addEventListener("click", function () {
      popup.style.display = "none";
      overlay.classList.remove("active");
      body.classList.remove("noscroll");
    });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
      overlay.classList.remove("active");
      body.classList.remove("noscroll");
    }
  });
});
