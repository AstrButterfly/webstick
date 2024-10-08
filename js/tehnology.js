document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tehnology__tab ul li");
  const imagesContainer = document.querySelector(".tehnology__images-set");

  // JSON
  fetch("./json/imageSets.json")
    .then((response) => response.json())
    .then((imageSets) => {
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
    })
    .catch((error) => {
      console.error("Error loading the imageSets.json file:", error);
    });
});
