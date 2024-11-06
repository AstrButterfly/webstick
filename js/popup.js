import { setupValidation } from "./formValidation.js";

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popupForm");
  const overlay = document.getElementById("overlay");
  const body = document.querySelector("body");
  const allForm = document.querySelector(".popup__content");
  const thanksMessage = document.getElementById("popupThanks");
  const backButton = document.getElementById("popupBack");

  setupValidation(
    ".popup__contact-form",
    "popup-name",
    "popup-email",
    "popup-phone",
    "popup_privacy",
    () => {
      allForm.style.display = "none";
      thanksMessage.style.display = "flex";

      const name = document.getElementById("popup-name").value.trim();
      const email = document.getElementById("popup-email").value.trim();
      const phone = document.getElementById("popup-phone").value.trim();
      const company = document.getElementById("popup-company").value.trim();
      const privacy = document.getElementById("popup_privacy").checked;

      // console.log("Name: " + name);
      // console.log("Email: " + email);
      // console.log("Phone: " + phone);
      // console.log("Company: " + company);
      // console.log("Privacy Policy Accepted: " + privacy);
    }
  );

  backButton.addEventListener("click", function () {
    thanksMessage.style.display = "none";
    allForm.style.display = "block";
    popup.style.display = "none";
    overlay.classList.remove("active");
    body.classList.remove("noscroll");
  });

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
