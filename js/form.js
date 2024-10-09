const phoneInput = document.querySelector("#phone");
const label = document.querySelector(".telephone");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  separateDialCode: true,
  i18n: {
    searchPlaceholder: "Знайти за номером, або назвою",
  },
  geoIpLookup: function(callback) {
    fetch('https://ipapi.co/json/')
    .then(function(response) { return response.json(); })
    .then(data => callback(data.country_code))
    .catch(() => callback('us'));
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

document.addEventListener('click', (e) => {
  const countryContainer = document.querySelector(".iti__country-container");

  const phoneHasData = phoneInput.value.trim() !== "";

  if (!e.target.closest('.iti') && !e.target.closest('#phone') && !phoneHasData) {
    countryContainer.style.display = "none";
    console.log('Removed by click');
    label.classList.remove("focus");
  }
}, true);


phoneInput.addEventListener('countrychange', function() {
  countryCallingCode = iti.getSelectedCountryData().dialCode;
  //console.log("Country code:", countryCallingCode);

  if (countryCallingCode.length === 1) {
    phoneInput.style.paddingLeft = "79px";
  } else if (countryCallingCode.length === 2) {
    phoneInput.style.paddingLeft = "93px";
  } else if (countryCallingCode.length === 3) {
    phoneInput.style.paddingLeft = "106px";
  }
});

phoneInput.addEventListener('focus', function() {
  label.classList.add("focus");
  showCountryContainer();
});

// phoneInput.addEventListener('blur', function() {
//   const countryContainer = document.querySelector(".iti__country-container");
//   const ifNotEmpty = countryCallingCode + phoneInput.value;
//   // console.log(countryCallingCode);
//   // console.log(phoneInput.value);
//   // console.log(ifNotEmpty);
//   if (ifNotEmpty === countryCallingCode) {
//     if (countryContainer) {
//       countryContainer.style.display = "none";
//       phoneInput.value = "";
//     }
//     label.classList.remove("focus");
//   }
// });

function showCountryContainer() {
  phoneInput.setAttribute("readonly", "true");

  setTimeout(function() {
    const countryContainer = document.querySelector(".iti__country-container");

    if (countryContainer) {
      countryContainer.style.display = "block";
    }
    phoneInput.removeAttribute("readonly");
  }, 100);
  console.log('Showed');
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

