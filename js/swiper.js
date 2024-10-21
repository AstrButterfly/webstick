document.addEventListener("DOMContentLoaded", function () {
  Fancybox.bind('[data-fancybox="gallery"]', {
    dragToClose: false,

    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },

    Images: {
      zoom: false,
    },

    Thumbs: {
      type: "classic",
    },

    Carousel: {
      transition: false,
      friction: 0,
      hideScrollbar: false,
    },

    on: {
      "Carousel.ready Carousel.change": (fancybox) => {
        fancybox.container.style.setProperty(
          "--bg-image",
          `url("${fancybox.getSlide().thumbSrc}")`
        );
      },
    },
  });
  document
    .querySelector(".lending__zoom")
    .addEventListener("click", function () {
      Fancybox.show([
        {
          src: "./img/index/slider-photos/slide-2.png",
          thumb: "./img/index/slider-photos/slide-2.png",
          caption: "Image 1",
        },
        {
          src: "./img/index/slider-photos/home-2.png",
          thumb: "./img/index/slider-photos/home-2.png",
          caption: "Image 2",
        },
      ]);
    });
});
