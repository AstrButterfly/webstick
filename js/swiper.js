const images = document.querySelectorAll(".swiper-slide img");
let isScrolling = false;
let atBottom = false;
let currentImage = null;

function preventScroll(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

images.forEach((image) => {
  image.addEventListener("click", () => scrollImage(image));
});

function scrollImage(image) {
  if (isScrolling) {
    if (image === currentImage) {
      return;
    } else {
      currentImage.style.transform = "translateY(0)";
      currentImage.style.transition = "none";
      resetScrollState();
    }
  }

  currentImage = image;
  const swiperContainer = image.closest(".swiper");
  const containerHeight = swiperContainer.offsetHeight;
  const imageHeight = image.offsetHeight;

  if (imageHeight <= containerHeight) return;

  if (!atBottom) {
    isScrolling = true;
    let currentScroll = 0;

    window.addEventListener("wheel", preventScroll, { passive: false });

    const scrollStep = () => {
      const remainingScroll = imageHeight - containerHeight - currentScroll;
      const scrollSpeed = Math.max(remainingScroll / 500, 1);

      if (currentScroll < imageHeight - containerHeight) {
        currentScroll += scrollSpeed;
        image.style.transform = `translateY(-${currentScroll}px)`;
        requestAnimationFrame(scrollStep);
      } else {
        currentScroll = imageHeight - containerHeight;
        image.style.transform = `translateY(-${currentScroll}px)`;
        atBottom = true;
        isScrolling = false;

        window.removeEventListener("wheel", preventScroll);
      }
    };

    scrollStep();
  } else {
    isScrolling = true;
    image.style.transition = "transform 1s ease";
    image.style.transform = "translateY(0)";

    window.addEventListener("wheel", preventScroll, { passive: false });

    setTimeout(() => {
      image.style.transition = "";
      atBottom = false;
      isScrolling = false;

      window.removeEventListener("wheel", preventScroll);
    }, 1000);
  }
}

function resetScrollState() {
  atBottom = false;
  isScrolling = false;
  window.removeEventListener("wheel", preventScroll);
}

document
  .querySelectorAll(
    ".lending__zoom, .corporation__zoom, .internet-shop__zoom, .redesign__zoom"
  )
  .forEach((zoomButton) => {
    zoomButton.addEventListener("click", () => {
      const swiperContainer = zoomButton.closest(".lending__wrapper"); // Ищем контейнер слайдера
      const activeSlide = swiperContainer.querySelector(
        ".swiper-slide-active img"
      ); // Находим активный слайд
      if (activeSlide) {
        scrollImage(activeSlide);
      }
    });
  });
