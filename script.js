let index = 0;
let actualites = [];
const actualitesSection = document.getElementById("actualites-section");

// Affichage de la navbar
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

// Affichage du footer
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("#footer").innerHTML = data;
  });

// Affichage du carrousel
function afficherActualite(i) {
  const track = document.querySelector(".actualite-track");
  track.style.transform = `translateX(-${i * 100}%)`;
  document.querySelector(".actualite-date").textContent = actualites[i].date;
  document.querySelector(".actualite-message").textContent =
    actualites[i].message;
}

// Section actualité carrousel
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
    index = (index - 1 + actualites.length) % actualites.length;
    afficherActualite(index);
  });

  document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % actualites.length;
    afficherActualite(index);
  });
}

// Envois des mails via le site
if (typeof emailjs !== 'undefined') {
  emailjs.init("OUVwD02cSZQluo8Bl");
}

const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const submitBtn = document.getElementById("submit-btn");

function showToast(message, type) {
  toast.textContent = message;
  toast.className = "toast show " + type;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Système anti-bot
    if (contactForm.website && contactForm.website.value) {
      return; // On bloque l'envoi
    }

    // Système anti double envoi
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi du message en cours";

    emailjs
      .sendForm("service_ww4egjn", "template_w5yrknh", contactForm)
      .then(() => {
        contactForm.reset();
        showToast("Message envoyé avec succès !", "success");
      })
      .catch(() => {
        showToast("Erreur, veuillez réessayer.", "error");
      })
      .finally(() => {
      // Réactiver le bouton
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer";
    });
  });
}
