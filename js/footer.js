document.querySelectorAll(".pre-footer__form-group input").forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value) {
      this.classList.add("filled");
    } else {
      this.classList.remove("filled");
    }
  });
});
