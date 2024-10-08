const phoneInput = document.querySelector("#phone");
const label = document.querySelector(".telephone");
let countryCallingCode = "";

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  //separateDialCode: true, // TODO: make better
  geoIpLookup: function(callback) {
    fetch('https://ipapi.co/json/')
    .then(function(response) { return response.json(); })
    .then(function(data) {
      callback(data.country_code);
      console.log(data);
      countryCallingCode = data.country_calling_code;
    })
    .catch(function() {
      callback('us');
    });
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

phoneInput.addEventListener('click', function() {
  label.classList.add("focus");
  showCountryContainer();
});

phoneInput.addEventListener('focus', function() {
  label.classList.add("focus");
  showCountryContainer();
});


phoneInput.addEventListener('blur', function() {
  const countryContainer = document.querySelector(".iti__country-container");

  if (phoneInput.value === countryCallingCode) {
    if (countryContainer) {
      countryContainer.style.display = "none";
      phoneInput.value = "";
    }
    label.classList.remove("focus");
  }
});

function showCountryContainer() {
  phoneInput.setAttribute("readonly", "true");

  setTimeout(function() {
    const countryContainer = document.querySelector(".iti__country-container");

    if (countryContainer) {
      countryContainer.style.display = "block";

      if (countryCallingCode && phoneInput.value === "") {
        phoneInput.value = countryCallingCode;
      }
    }
    phoneInput.removeAttribute("readonly");
  }, 200);
}