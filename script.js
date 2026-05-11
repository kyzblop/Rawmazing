let index = 0;
let actualites = [];
const actualitesSection = document.getElementById("actualites-section");

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

function afficherActualite(i) {
  const img = document.querySelector(".actualite-image");

  img.classList.add("fade");

  setTimeout(() => {
    img.src = actualites[i].image || "";
    document.querySelector(".actualite-date").textContent = actualites[i].date;
    document.querySelector(".actualite-message").textContent =
      actualites[i].message;
    img.classList.remove("fade");
  }, 300);
}

if (actualitesSection) {
  fetch("actualites.json")
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        actualites = data;
        afficherActualite(index);
        actualitesSection.classList.remove("hidden");

        // Affiche les flèches une fois l'image chargée
        document
          .querySelector(".actualite-image")
          .addEventListener("load", () => {
            document.querySelectorAll(".carrousel-btn").forEach((btn) => {
              btn.classList.add("visible");
            });
          });
      }
    });

  document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + actualites.length) % actualites.length;
    afficherActualite(index);
  });

  document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % actualites.length;
    afficherActualite(index);
  });
}
