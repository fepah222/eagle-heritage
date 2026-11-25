(() => {
  "use strict";
  const menuButton=document.querySelector(".menu-toggle"),navigation=document.querySelector(".nav"),header=document.getElementById("siteHeader"),languageButton=document.getElementById("languageToggle"),themeButton=document.getElementById("themeToggle"),enquiryForm=document.getElementById("enquiryForm");
  const languageKey="eagleHeritageLanguage",themeKey="eagleHeritageTheme";
  let language=localStorage.getItem(languageKey)||"en";
  const applyLanguage=next=>{language=next;localStorage.setItem(languageKey,language);document.documentElement.lang=language;document.querySelectorAll("[data-en][data-fr]").forEach(el=>el.innerHTML=el.dataset[language]);if(languageButton){languageButton.textContent=language==="en"?"FR":"EN";languageButton.setAttribute("aria-label",language==="en"?"Switch language to French":"Passer en anglais");}};
  applyLanguage(language);
  const applyTheme=theme=>{document.documentElement.dataset.theme=theme;localStorage.setItem(themeKey,theme);if(themeButton){const dark=theme==="dark";themeButton.innerHTML=dark?"☀":"◐";themeButton.setAttribute("aria-label",dark?"Switch to light mode":"Switch to dark mode");themeButton.title=dark?"Switch to light mode":"Switch to dark mode";}};
  applyTheme(localStorage.getItem(themeKey)||"light");
  if(languageButton)languageButton.addEventListener("click",()=>applyLanguage(language==="en"?"fr":"en"));
  if(themeButton)themeButton.addEventListener("click",()=>applyTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
  const closeMenu=()=>{if(!menuButton||!navigation)return;menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open menu");const label=menuButton.querySelector(".menu-button-label");if(label)label.textContent="MENU";navigation.classList.remove("is-open");navigation.setAttribute("aria-hidden",String(window.innerWidth<=850));document.body.classList.remove("menu-open");};
  if(menuButton&&navigation){navigation.setAttribute("aria-hidden",String(window.innerWidth<=850));menuButton.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")!=="true";menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");const label=menuButton.querySelector(".menu-button-label");if(label)label.textContent=open?"CLOSE":"MENU";navigation.classList.toggle("is-open",open);navigation.setAttribute("aria-hidden",String(!open&&window.innerWidth<=850));document.body.classList.toggle("menu-open",open);});navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));document.addEventListener("click",event=>{if(menuButton.getAttribute("aria-expanded")==="true"&&!menuButton.contains(event.target)&&!navigation.contains(event.target))closeMenu();});document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});window.addEventListener("resize",()=>{if(window.innerWidth>850)closeMenu();else if(menuButton.getAttribute("aria-expanded")!=="true")navigation.setAttribute("aria-hidden","true");});}
  if(header){const update=()=>header.classList.toggle("is-scrolled",window.scrollY>12);update();window.addEventListener("scroll",update,{passive:true});}
  const backButton=document.getElementById("backButton");if(backButton)backButton.addEventListener("click",()=>{if(window.history.length>1)window.history.back();else window.location.href="index.html";});\n  const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
  if(enquiryForm)enquiryForm.addEventListener("submit",event=>{event.preventDefault();if(!enquiryForm.reportValidity())return;const data=new FormData(enquiryForm),name=String(data.get("name")||"").trim(),phone=String(data.get("phone")||"").trim(),service=String(data.get("service")||"").trim(),location=String(data.get("location")||"").trim(),details=String(data.get("details")||"").trim();const labels=language==="fr"?{heading:"Bonjour Eagle Heritage, je souhaite me renseigner sur un projet.",name:"Nom",phone:"Téléphone",service:"Type de projet",location:"Lieu du projet",details:"Description"}:{heading:"Hello Eagle Heritage, I would like to enquire about a project.",name:"Name",phone:"Phone",service:"Project type",location:"Project location",details:"Description"};const lines=[labels.heading,"",labels.name+": "+name,labels.phone+": "+phone,labels.service+": "+service];if(location)lines.push(labels.location+": "+location);if(details)lines.push(labels.details+": "+details);window.open("https://wa.me/237681486499?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer");});

  // Progressive reveal animations: content remains visible if JS or motion support is unavailable.
  const revealTargets=document.querySelectorAll("main section, .page-title, .portfolio-card, .principles article, .service-item, .capabilities-grid, .leadership-grid, .contact-grid");
  if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.body.classList.add("reveal-ready");
    revealTargets.forEach((el,index)=>{el.classList.add("reveal");el.dataset.revealDelay=String(index%4);});
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
    revealTargets.forEach(el=>revealObserver.observe(el));
  }
  // Portfolio filters are data-driven; no project facts are invented.
  const projectFilters=document.querySelectorAll("[data-project-filter]");
  const projectCards=document.querySelectorAll("[data-project-category]");
  projectFilters.forEach(button=>button.addEventListener("click",()=>{
    const category=button.dataset.projectFilter;
    projectFilters.forEach(filter=>{const active=filter===button;filter.classList.toggle("is-active",active);filter.setAttribute("aria-pressed",String(active));});
    projectCards.forEach(card=>card.classList.toggle("is-filtered-out",category!=="all"&&card.dataset.projectCategory!==category));
  }));
  // Add a light parallax to the homepage hero only on capable desktop devices.
  const heroImage=document.querySelector(".home-screen .hero-image");
  if(heroImage&&window.matchMedia("(min-width: 851px) and (prefers-reduced-motion: no-preference)").matches){
    let ticking=false;
    window.addEventListener("scroll",()=>{if(!ticking){window.requestAnimationFrame(()=>{const y=Math.min(window.scrollY,500)*.12;heroImage.style.backgroundPosition="center calc(54% + "+y+"px)";ticking=false;});ticking=true;}},{passive:true});
  }
  const consentKey="eagleHeritageCookieConsent",banner=document.getElementById("cookieBanner");if(banner&&!localStorage.getItem(consentKey))banner.hidden=false;const saveConsent=value=>{localStorage.setItem(consentKey,value);if(banner)banner.hidden=true;};document.querySelectorAll("[data-cookie-choice]").forEach(btn=>btn.addEventListener("click",()=>saveConsent(btn.dataset.cookieChoice)));
})();