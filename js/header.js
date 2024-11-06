const mob = document.querySelector(".header__mob");
const logo = document.querySelector(".header__logo");
const header = document.querySelector("header");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__nav-menu");
const bg = document.querySelector("body");
const back = document.querySelector(".header__mob-back");
const listBack = document.querySelectorAll(".header__mob-list-back");
const listItems = document.querySelectorAll(".header__mob-list li");
const mainTitle = document.querySelector(".header__mob-title.main");
const itemServices = document.querySelector(".header__nav-item-services");
const servicesDropdown = document.querySelector(".services-dropdown");

const showAllListItems = () => {
  listItems.forEach((li) => {
    li.classList.remove("selected");
    console.log("All");
    li.style.display = "block";

    const title = li.querySelector(".header__mob-title");
    const caption = li.querySelector(".header__mob-caption");
    const innerList = li.querySelector(".header__mob-inner-list");

    if (caption) caption.style.display = "flex";
    if (title) title.classList.remove("active");
    if (innerList) innerList.classList.remove("active");
  });
  mainTitle.style.display = "flex";
};

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    listItems.forEach((li) => {
      li.classList.remove("selected");
      console.log("removeItem");
      li.style.display = "none";
    });

    item.classList.add("selected");
    console.log("addMainItem");
    item.style.display = "block";

    const innerItems = item.querySelectorAll("li");
    innerItems.forEach((innerLi) => (innerLi.style.display = "flex"));

    mainTitle.style.display = "none";

    const title = item.querySelector(".header__mob-title");
    const caption = item.querySelector(".header__mob-caption");
    const innerList = item.querySelector(".header__mob-inner-list");

    if (title) {
      title.classList.add("active");
      console.log("2");
    }
    if (innerList) innerList.classList.add("active");
    if (caption) caption.style.display = "none";
  });
});

const backMenu = () => {
  console.log("FunctionStart");
  listItems.forEach((li) => {
    li.classList.remove("selected");
    console.log("back");
    li.style.display = "block";

    const title = li.querySelector(".header__mob-title");
    const caption = li.querySelector(".header__mob-caption");
    const innerList = li.querySelector(".header__mob-inner-list");

    if (caption) caption.style.display = "flex";
    if (title) {
      title.classList.remove("active");
      console.log("1");
    }
    if (innerList) innerList.classList.remove("active");
  });
  mainTitle.style.display = "flex";
};

listBack.forEach((backArrow) => {
  backArrow.addEventListener("click", () => {
    console.log("Back arrow clicked in item");
    setTimeout(() => {
      backMenu();
    }, 0);
  });
});

back.addEventListener("click", () => {
  mob.classList.remove("active");
  logo.style.display = "block";
});

burger.addEventListener("click", () => {
  listItems.forEach((li) => {
    const title = li.querySelector(".header__mob-title");
    const innerList = li.querySelector(".header__mob-inner-list");
    if (title) title.classList.remove("active");
    if (innerList) innerList.classList.remove("active");
  });

  burger.classList.toggle("open");
  menu.classList.toggle("mobile");
  header.classList.toggle("menu-active");
  bg.classList.toggle("noscroll");
  logo.style.display = "block";
  mob.classList.remove("active");

  showAllListItems();
});

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains(".header__mob-back") &&
    !event.target.classList.contains(".header__mob-list-back")
  ) {
    mob.classList.remove("active");
    logo.style.display = "block";
  }
});

[itemServices, servicesDropdown].forEach((element) => {
  element.addEventListener("mouseover", () => {
    if (window.innerWidth > 1000) {
      toggleDropdownVisibility(true);
      header.classList.add("header-white");
    } else {
      itemServices.addEventListener("click", () => {
        mob.classList.add("active");
        logo.style.display = "none";
      });
    }
  });
  element.addEventListener("mouseout", () => {
    if (window.innerWidth > 1000) {
      toggleDropdownVisibility(false);
      if (!header.classList.contains("sticky")) {
        header.classList.remove("header-white");
      }
    }
  });
});

const toggleDropdownVisibility = (isVisible) => {
  servicesDropdown.classList.toggle("visible", isVisible);
};

const stickyOffset = header.offsetTop + 200;
let lastScrollTop = 0;

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

window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) {
    mob.classList.remove("active");
    logo.style.display = "block";
  }
});
