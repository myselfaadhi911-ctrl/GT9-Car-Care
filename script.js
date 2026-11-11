// GT9 CAR CARE & GARAGE — shared interactions
// Add GT9's WhatsApp number in international format (digits only) before launch.
const GT9_WHATSAPP_NUMBER = "91XXXXXXXXXX";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Scroll progress
const progress = document.querySelector(".scroll-progress");
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = percent + "%";
};
window.addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

// Reveal content as it enters the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.13, rootMargin:"0px 0px -35px 0px"});
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Custom precision-reticle cursor for mouse devices only
const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
if (finePointer && !reduceMotion && dot && ring) {
  document.body.classList.add("cursor-ready");
  window.addEventListener("mousemove", event => {
    const x = event.clientX;
    const y = event.clientY;
    dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    ring.style.transform = `translate3d(${x}px,${y}px,0)`;
  }, {passive:true});
  document.querySelectorAll("a,button,input,textarea,select,[role='button']").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

// Fill the service selector from links on the Services page.
const params = new URLSearchParams(window.location.search);
const requestedService = params.get("service");
const serviceSelect = document.getElementById("service-select");
if (requestedService && serviceSelect) {
  const option = Array.from(serviceSelect.options).find(item => item.text.toLowerCase() === requestedService.toLowerCase());
  if (option) serviceSelect.value = option.value;
}

// WhatsApp enquiry handoff
document.getElementById("enquiry-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    "Hello GT9 Car Care & Garage, I'd like to enquire about a service.",
    "",
    "Name: " + form.get("name"),
    "Phone: " + form.get("phone"),
    "Vehicle: " + (form.get("vehicle") || "Not specified"),
    "Service: " + form.get("service"),
    "Message: " + (form.get("message") || "Not specified")
  ].join("\n");
  if (!/^\d{10,15}$/.test(GT9_WHATSAPP_NUMBER) || GT9_WHATSAPP_NUMBER.includes("X")) {
    alert("Please add GT9's WhatsApp number in script.js before using the enquiry form.");
    return;
  }
  window.open("https://wa.me/" + GT9_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener");
});
