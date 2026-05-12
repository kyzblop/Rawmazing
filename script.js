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
  const track = document.querySelector(".actualite-track");
  track.style.transform = `translateX(-${i * 100}%)`;
  document.querySelector(".actualite-date").textContent = actualites[i].date;
  document.querySelector(".actualite-message").textContent =
    actualites[i].message;
}

if (actualitesSection) {
  fetch("actualites.json")
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        actualites = data;
        const track = document.querySelector(".actualite-track");

        // Injecte toutes les images
        data.forEach((actu) => {
          const img = document.createElement("img");
          img.src = actu.image || "";
          img.alt = "actualite";
          track.appendChild(img);
        });

        afficherActualite(index);
        actualitesSection.classList.remove("hidden");

        // Affiche les flèches une fois la première image chargée
        track.querySelector("img").addEventListener("load", () => {
          document.querySelectorAll(".carrousel-btn").forEach((btn) => {
            btn.classList.add("visible");
          });
        });
      }
    });

  document.querySelector(".prev").addEventListener("click", () => {
    console.log("prev cliqué, index actuel:", index);
    index = (index - 1 + actualites.length) % actualites.length;
    console.log("nouvel index:", index);
    afficherActualite(index);
  });

  document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % actualites.length;
    afficherActualite(index);
  });
}
