let index = 0;
let actualites = [];

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


fetch("actualites.json")
  .then((res) => res.json())
  .then((data) => {
    actualites = data;
    afficherActualite(index);
  });

function afficherActualite(i) {
  document.querySelector('.actualite-date').textContent = actualites[i].date;
  document.querySelector('.actualite-message').textContent = actualites[i].message;
  
  const img = document.querySelector('.actualite-image');
  if (actualites[i].image) {
    img.src = actualites[i].image;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
}

document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + actualites.length) % actualites.length;
  afficherActualite(index);
});

document.querySelector(".next").addEventListener("click", () => {
  index = (index + 1) % actualites.length;
  afficherActualite(index);
});
