document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popupForm");
  const overlay = document.getElementById("overlay");
  const body = document.querySelector("body");
  const form = document.querySelector(".popup__contact-form");
  const allForm = document.querySelector(".popup__content");
  const thanksMessage = document.getElementById("popupThanks");
  const backButton = document.getElementById("popupBack");

  const phoneInput = document.getElementById("popup-phone");
  phoneInput.addEventListener("input", (event) => {
    const value = event.target.value;

    event.target.value = value.replace(/\D/g, "");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("popup-name").value.trim();
    const email = document.getElementById("popup-email").value.trim();
    const phone = phoneInput.value.trim();
    const company = document.getElementById("popup-company").value.trim();
    const privacy = document.getElementById("popup_privacy").checked;

    document.querySelectorAll(".form-error").forEach((errorDiv) => {
      errorDiv.style.display = "none";
      errorDiv.textContent = "";
    });

    let valid = true;

    // name
    if (name === "") {
      valid = false;
      showError("popup-name", "Обов'язкове поле");
    }

    // email
    if (email === "" || !validateEmail(email)) {
      valid = false;
      showError("popup-email", "Обов'язкове поле");
    }

    // phone
    valid = validatePhone(phone) && valid;

    // privacy
    if (!privacy) {
      valid = false;
      showError("popup_privacy", "Обов'язкове поле");
    }

    if (valid) {
      allForm.style.display = "none";
      thanksMessage.style.display = "flex";

      console.log("Name: " + name);
      console.log("Email: " + email);
      console.log("Phone: " + phone);
      console.log("Company: " + company);
      console.log("Privacy Policy Accepted: " + privacy);

      form.reset();
    }
  });

  function validatePhone(phone) {
    let valid = true;
    const phoneInput = document.getElementById("popup-phone");

    if (phone === "") {
      valid = false;
      showError("popup-phone", "Обов'язкове поле");
    } else if (phone.length < 8 || phone.length > 12) {
      valid = false;
      showError("popup-phone", "Некоректні дані");
    }

    return valid;
  }

  function showError(inputId, errorMessage) {
    const inputElement = document.getElementById(inputId);

    let errorElement = inputElement.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains("form-error")) {
      errorElement = document.createElement("div");
      errorElement.classList.add("form-error");
      inputElement.parentNode.insertBefore(
        errorElement,
        inputElement.nextSibling
      );
    }

    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
  }

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

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
