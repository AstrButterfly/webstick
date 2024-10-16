const itemServices = document.querySelector(".header__nav-item-services");
const servicesDropdown = document.querySelector(".services-dropdown");
const header = document.querySelector("header");

const stickyOffset = header.offsetTop + 200;
let lastScrollTop = 0;

const toggleDropdownVisibility = (isVisible) => {
  servicesDropdown.classList.toggle("visible", isVisible);
};

[itemServices, servicesDropdown].forEach((element) => {
  element.addEventListener("mouseover", () => {
    toggleDropdownVisibility(true);
    header.classList.add("header-white");
  });
  element.addEventListener("mouseout", () => {
    toggleDropdownVisibility(false);
    if (!header.classList.contains("sticky")) {
      header.classList.remove("header-white");
    }
  });
});

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  const isSticky = currentScroll > stickyOffset;
  header.classList.toggle("sticky", isSticky);
  header.classList.toggle("header-white", isSticky);
  header.classList.toggle("animate__animated", isSticky);
  header.classList.toggle("animate__fadeInDownBig", isSticky);

  if (currentScroll < lastScrollTop && isSticky) {
    header.classList.remove(
      "sticky",
      "animate__animated",
      "animate__fadeInDownBig"
    );
    header.classList.remove("header-white");
  }

  lastScrollTop = Math.max(currentScroll, 0);
});
