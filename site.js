(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");
  const header = document.getElementById("siteHeader");
  const languageButton = document.getElementById("languageToggle");
  const enquiryForm = document.getElementById("enquiryForm");
  let language = "en";

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      navigation.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const setLanguage = (nextLanguage) => {
    language = nextLanguage;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-en][data-fr]").forEach((element) => {
      element.innerHTML = element.dataset[language];
    });

    if (languageButton) {
      languageButton.textContent = language === "en" ? "FR" : "EN";
      languageButton.setAttribute(
        "aria-label",
        language === "en" ? "Switch language to French" : "Passer en anglais"
      );
    }
  };

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      setLanguage(language === "en" ? "fr" : "en");
    });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!enquiryForm.reportValidity()) return;

      const data = new FormData(enquiryForm);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(data.get("service") || "").trim();
      const location = String(data.get("location") || "").trim();
      const details = String(data.get("details") || "").trim();

      const labels = language === "fr"
        ? { heading: "Bonjour Eagle Heritage, je souhaite me renseigner sur un projet.", name: "Nom", phone: "Téléphone", service: "Type de projet", location: "Lieu du projet", details: "Description" }
        : { heading: "Hello Eagle Heritage, I would like to enquire about a project.", name: "Name", phone: "Phone", service: "Project type", location: "Project location", details: "Description" };

      const lines = [
        labels.heading,
        "",
        labels.name + ": " + name,
        labels.phone + ": " + phone,
        labels.service + ": " + service
      ];
      if (location) lines.push(labels.location + ": " + location);
      if (details) lines.push(labels.details + ": " + details);

      const whatsappUrl = "https://wa.me/237681486499?text=" + encodeURIComponent(lines.join("\n"));
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
})();