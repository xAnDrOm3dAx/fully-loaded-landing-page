const observer = new IntersectionObserver(
  (animations) => {
    animations.forEach((element) => {
      if (element.isIntersecting) {
        element.target.classList.add("animate");
        element.target.classList.remove("undo-animate");
      } else {
        element.target.classList.remove("animate");
        element.target.classList.add("undo-animate");
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: [0, 0.1, 1],
  }
);

const tags = document.querySelectorAll("");

tags.forEach((tag) => {
  observer.observe(tag);
});
