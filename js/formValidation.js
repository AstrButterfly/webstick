export function setupValidation(
  formSelector,
  nameId,
  emailId,
  phoneId,
  privacyId,
  onSuccess
) {
  const form = document.querySelector(formSelector);
  const nameInput = document.getElementById(nameId);
  const emailInput = document.getElementById(emailId);
  const phoneInput = document.getElementById(phoneId);
  const privacyInput = document.getElementById(privacyId);

  if (!form) return;

  phoneInput.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;

    hideErrors();

    if (!nameInput.value.trim()) {
      valid = false;
      showError(nameInput, "Обов'язкове поле");
    }

    if (!validateEmail(emailInput.value.trim())) {
      valid = false;
      showError(emailInput, "Обов'язкове поле");
    }

    if (!validatePhone(phoneInput.value.trim())) {
      valid = false;
      showError(phoneInput, "Некоректні дані");
    }

    if (!privacyInput.checked) {
      valid = false;
      showError(privacyInput, "Обов'язкове поле");
    }

    if (valid && onSuccess) {
      onSuccess();
      form.reset();
      // DB
    }
  });

  function hideErrors() {
    document.querySelectorAll(".form-error").forEach((errorDiv) => {
      errorDiv.style.display = "none";
      errorDiv.textContent = "";
    });
  }
}

export function showError(inputElement, errorMessage) {
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

function validatePhone(phone) {
  return phone.length >= 8 && phone.length <= 12;
}
