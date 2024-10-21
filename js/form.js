const phoneInputs = document.querySelectorAll('input[type="tel"]');
const labels = document.querySelectorAll(".telephone");

if (typeof window.intlTelInput != "undefined") {
  phoneInputs.forEach((phoneInput, index) => {
    const iti = window.intlTelInput(phoneInput, {
      initialCountry: "auto",
      separateDialCode: true,
      i18n: {
        searchPlaceholder: "Знайти за номером, або назвою",
      },
      geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json/")
          .then((response) => response.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback("us"));
      },
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    phoneInput.addEventListener("countrychange", function () {
      const countryCallingCode = iti.getSelectedCountryData().dialCode;
      phoneInput.style.paddingLeft = `${
        79 + (countryCallingCode.length - 1) * 14
      }px`;
    });

    phoneInput.addEventListener("focus", function () {
      const label = labels[index];
      label.classList.add("focus");
      showCountryContainer(phoneInput);
    });
  });
}

document.addEventListener(
  "click",
  (e) => {
    const countryContainers = document.querySelectorAll(
      ".iti__country-container"
    );

    phoneInputs.forEach((phoneInput, index) => {
      if (
        !e.target.closest(".iti") &&
        !e.target.closest(`input[type="tel"]#${phoneInput.id}`) &&
        !phoneInput.value.trim()
      ) {
        const countryContainer = countryContainers[index];
        if (countryContainer) {
          countryContainer.style.display = "none";
          labels[index].classList.remove("focus");
        }
      }
    });
  },
  true
);

function showCountryContainer(phoneInput) {
  phoneInput.setAttribute("readonly", "true");

  setTimeout(function () {
    const countryContainer = phoneInput
      .closest(".iti")
      .querySelector(".iti__country-container");

    if (countryContainer) {
      countryContainer.style.display = "block";
    }
    phoneInput.removeAttribute("readonly");
  }, 100);
  console.log("Showed");
}

// document.querySelector('.pre-footer__contact-form').addEventListener('submit', function(event) {
//   event.preventDefault();

//   const fullPhoneNumber = `+${iti.getSelectedCountryData().dialCode}${phoneInput.value.replace(/\s+/g, '')}`;
//   phoneInput.value = fullPhoneNumber;

//   const formData = new FormData(event.target);

//   for (let [name, value] of formData) {
//     console.log(`${name}: ${value}`);
//   }
// });
