const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    });
  });
}

let currentLanguage = "en";
const languageButton = document.getElementById("languageToggle");

if (languageButton) {
  languageButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "fr" : "en";
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-en][data-fr]").forEach((element) => {
      element.innerHTML = element.dataset[currentLanguage];
    });

    languageButton.textContent = currentLanguage === "en" ? "FR" : "EN";
    languageButton.setAttribute(
      "aria-label",
      currentLanguage === "en" ? "Switch language to French" : "Switch language to English"
    );
  });
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
