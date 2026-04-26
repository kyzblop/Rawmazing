fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("#header").innerHTML = data;

    const burger = document.querySelector(".burger_btn");
    const nav = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  });

fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("#footer").innerHTML = data;
  });
