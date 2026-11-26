(() => {
  "use strict";
  const menuButton=document.querySelector(".menu-toggle");
  const navigation=document.querySelector(".nav");
  const header=document.getElementById("siteHeader");
  const languageButton=document.getElementById("languageToggle");
  const enquiryForm=document.getElementById("enquiryForm");
  const languageKey="eagleHeritageLanguage";
  let language=localStorage.getItem(languageKey)==="fr"?"fr":"en";

  function applyLanguage(next){
    language=next==="fr"?"fr":"en";
    localStorage.setItem(languageKey,language);
    document.documentElement.lang=language;
    document.querySelectorAll("[data-en][data-fr]").forEach(el=>{
      const value=el.getAttribute("data-"+language);
      if(value!==null) el.innerHTML=value;
    });
    document.querySelectorAll(".back-button").forEach(el=>el.textContent=language==="en"?"← Back":"← Retour");
    document.querySelectorAll(".footer-top").forEach(el=>el.textContent=language==="en"?"Back to top ↑":"Retour en haut ↑");
    if(languageButton){
      languageButton.textContent=language.toUpperCase();
      languageButton.setAttribute("aria-label",language==="en"?"English active. Click to switch to French":"Français actif. Cliquez pour passer en anglais");
      languageButton.setAttribute("title",language==="en"?"Switch to French":"Passer en anglais");
    }
  }
  applyLanguage(language);
  if(languageButton) languageButton.addEventListener("click",()=>applyLanguage(language==="en"?"fr":"en"));

  function closeMenu(){
    if(!menuButton||!navigation)return;
    menuButton.setAttribute("aria-expanded","false");
    menuButton.setAttribute("aria-label",language==="en"?"Open navigation menu":"Ouvrir le menu");
    navigation.classList.remove("is-open");
    navigation.setAttribute("aria-hidden",String(window.innerWidth<=850));
  }
  if(menuButton&&navigation){
    navigation.setAttribute("aria-hidden",String(window.innerWidth<=850));
    menuButton.addEventListener("click",()=>{
      const isOpen=menuButton.getAttribute("aria-expanded")!=="true";
      menuButton.setAttribute("aria-expanded",String(isOpen));
      menuButton.setAttribute("aria-label",isOpen?(language==="en"?"Close navigation menu":"Fermer le menu"):(language==="en"?"Open navigation menu":"Ouvrir le menu"));
      navigation.classList.toggle("is-open",isOpen);
      navigation.setAttribute("aria-hidden",String(!isOpen&&window.innerWidth<=850));
    });
    navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
    document.addEventListener("click",event=>{if(menuButton.getAttribute("aria-expanded")==="true"&&!menuButton.contains(event.target)&&!navigation.contains(event.target))closeMenu();});
    document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});
    window.addEventListener("resize",()=>{if(window.innerWidth>850)closeMenu();else if(menuButton.getAttribute("aria-expanded")!=="true")navigation.setAttribute("aria-hidden","true");});
  }

  if(header){const update=()=>header.classList.toggle("is-scrolled",window.scrollY>12);update();window.addEventListener("scroll",update,{passive:true});}
  const backButton=document.getElementById("backButton");
  if(backButton)backButton.addEventListener("click",()=>{
    try{if(document.referrer&&new URL(document.referrer).origin===window.location.origin&&window.history.length>1){window.history.back();return;}}catch(error){}
    window.location.href="index.html";
  });
  const year=document.getElementById("year");
  if(year)year.textContent=new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener("click",event=>{
      const selector=link.getAttribute("href");
      if(!selector||selector==="#")return;
      const target=document.querySelector(selector);
      if(target){event.preventDefault();target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});}
    });
  });

  if(enquiryForm)enquiryForm.addEventListener("submit",event=>{
    event.preventDefault();
    if(!enquiryForm.reportValidity())return;
    const data=new FormData(enquiryForm);
    const name=String(data.get("name")||"").trim(),phone=String(data.get("phone")||"").trim(),service=String(data.get("service")||"").trim(),location=String(data.get("location")||"").trim(),details=String(data.get("details")||"").trim();
    const labels=language==="fr"?{heading:"Bonjour Eagle Heritage, je souhaite me renseigner sur un projet.",name:"Nom",phone:"Téléphone",service:"Type de projet",location:"Lieu du projet",details:"Description"}:{heading:"Hello Eagle Heritage, I would like to enquire about a project.",name:"Name",phone:"Phone",service:"Project type",location:"Project location",details:"Description"};
    const lines=[labels.heading,"",labels.name+": "+name,labels.phone+": "+phone,labels.service+": "+service];
    if(location)lines.push(labels.location+": "+location);
    if(details)lines.push(labels.details+": "+details);
    window.open("https://wa.me/237681486499?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer");
  });

  const revealTargets=document.querySelectorAll("main section, .page-title, .portfolio-card, .principles article, .service-item, .capabilities-grid, .leadership-grid, .contact-grid");
  if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.body.classList.add("reveal-ready");
    revealTargets.forEach((el,index)=>{el.classList.add("reveal");el.dataset.revealDelay=String(index%4);});
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
    revealTargets.forEach(el=>observer.observe(el));
  }
  const filters=document.querySelectorAll("[data-project-filter]");
  const cards=document.querySelectorAll("[data-project-category]");
  filters.forEach(button=>button.addEventListener("click",()=>{
    const category=button.dataset.projectFilter;
    filters.forEach(filter=>{const active=filter===button;filter.classList.toggle("is-active",active);filter.setAttribute("aria-pressed",String(active));});
    cards.forEach(card=>card.classList.toggle("is-filtered-out",category!=="all"&&card.dataset.projectCategory!==category));
  }));
  const heroImage=document.querySelector(".home-screen .hero-image");
  if(heroImage&&window.matchMedia("(min-width: 851px) and (prefers-reduced-motion: no-preference)").matches){
    let ticking=false;
    window.addEventListener("scroll",()=>{if(!ticking){window.requestAnimationFrame(()=>{heroImage.style.backgroundPosition="center calc(54% + "+Math.min(window.scrollY,500)*.12+"px)";ticking=false;});ticking=true;}},{passive:true});
  }
  const consentKey="eagleHeritageCookieConsent",banner=document.getElementById("cookieBanner");
  if(banner&&!localStorage.getItem(consentKey))banner.hidden=false;
  const saveConsent=value=>{localStorage.setItem(consentKey,value);if(banner)banner.hidden=true;};
  document.querySelectorAll("[data-cookie-choice]").forEach(button=>button.addEventListener("click",()=>saveConsent(button.dataset.cookieChoice)));
})();