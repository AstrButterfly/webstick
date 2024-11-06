import { setupValidation } from "./formValidation.js";

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tehnology__tab ul li");
  const imagesContainer = document.querySelector(".tehnology__images-set");

  const thanksMessage = document.getElementById("popupThanks");
  const backButton = document.getElementById("popupBack");

  // JSON
  const imageSets = {
    "Мови програмування": [
      "./img/index/tehnology-logos/Language-programming/Technoligia.png",
      "./img/index/tehnology-logos/Language-programming/Technoligia-1.png",
      "./img/index/tehnology-logos/Language-programming/Technoligia-2.png",
      "./img/index/tehnology-logos/Language-programming/Technoligia-3.png",
      "./img/index/tehnology-logos/Language-programming/Technoligia-4.png",
    ],
    Backend: [
      "./img/index/tehnology-logos/Backend/Technoligia.png",
      "./img/index/tehnology-logos/Backend/Technoligia-1.png",
      "./img/index/tehnology-logos/Backend/Technoligia-2.png",
      "./img/index/tehnology-logos/Backend/Technoligia-3.png",
      "./img/index/tehnology-logos/Backend/Technoligia-4.png",
      "./img/index/tehnology-logos/Backend/Technoligia-5.png",
    ],
    Frontend: [
      "./img/index/tehnology-logos/Frontend/Technoligia.png",
      "./img/index/tehnology-logos/Frontend/Technoligia-1.png",
      "./img/index/tehnology-logos/Frontend/Technoligia-2.png",
    ],
    "Мобільна розробка": [
      "./img/index/tehnology-logos/Frontend/Technoligia.png",
      "./img/index/tehnology-logos/Mobile-development/Technoligia.png",
    ],
    "Бази даних": [
      "./img/index/tehnology-logos/Data-base/Technoligia.png",
      "./img/index/tehnology-logos/Data-base/Technoligia-1.png",
      "./img/index/tehnology-logos/Data-base/Technoligia-2.png",
      "./img/index/tehnology-logos/Data-base/Technoligia-3.png",
      "./img/index/tehnology-logos/Data-base/Technoligia-4.png",
      "./img/index/tehnology-logos/Data-base/Technoligia-5.png",
      "./img/index/tehnology-logos/Data-base/Technoligia-6.png",
    ],
    "Надійні партнери": [
      "./img/index/tehnology-logos/Reliable-partners/Technoligia.png",
      "./img/index/tehnology-logos/Reliable-partners/Technoligia-1.png",
      "./img/index/tehnology-logos/Reliable-partners/Technoligia-2.png",
      "./img/index/tehnology-logos/Reliable-partners/Technoligia-3.png",
      "./img/index/tehnology-logos/Reliable-partners/Technoligia-4.png",
    ],
  };

  const defaultImages = imageSets["Мови програмування"];

  defaultImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("visible");
    imagesContainer.appendChild(img);
  });

  tabs.forEach((tab) => {
    if (!tab.textContent.trim()) return;

    tab.addEventListener("click", function () {
      if (this.classList.contains("active")) return;

      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const selectedTab = this.textContent;
      const currentImages = imagesContainer.querySelectorAll("img");

      currentImages.forEach((img) => {
        img.classList.remove("visible");
      });
      setTimeout(() => {
        imagesContainer.innerHTML = "";

        if (imageSets[selectedTab]) {
          imageSets[selectedTab].forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            imagesContainer.appendChild(img);
            img.classList.add("visible");
          });
        }
      }, 200);
    });
  });

  setupValidation(
    ".pre-footer__contact-form",
    "name",
    "email",
    "pre-footer_phone",
    "pre-footer_privacy",
    () => {
      thanksMessage.style.display = "flex";

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("pre-footer_phone").value.trim();
      const company = document.getElementById("company").value.trim();
      const privacy = document.getElementById("pre-footer_privacy").checked;

      console.log("Name: " + name);
      console.log("Email: " + email);
      console.log("Phone: " + phone);
      console.log("Company: " + company);
      console.log("Privacy Policy Accepted: " + privacy);
    }
  );

  backButton.addEventListener("click", function () {
    thanksMessage.style.display = "none";
    allForm.style.display = "block";
    popup.style.display = "none";
    overlay.classList.remove("active");
    body.classList.remove("noscroll");
  });
});
