// GT9 CAR CARE & GARAGE — shared interactions
const GT9_CALL_NUMBER = "919746438456";
const GT9_WHATSAPP_NUMBER = "919544439379";

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

// Scroll progress, reveals, cursor, background and type animation live in motion.js

// Fill the service selector from links on the Services page.
const params = new URLSearchParams(window.location.search);
const requestedService = params.get("service");
const serviceSelect = document.getElementById("service-select");
if (requestedService && serviceSelect) {
  const option = Array.from(serviceSelect.options).find(item => item.text.toLowerCase() === requestedService.toLowerCase());
  if (option) serviceSelect.value = option.value;
}

// Send the completed enquiry to GT9's WhatsApp number.
document.getElementById("enquiry-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    "Hello GT9 Car Care & Garage,",
    "",
    "I would like to enquire about a service.",
    "",
    "Name: " + form.get("name"),
    "Phone: " + form.get("phone"),
    "Vehicle: " + (form.get("vehicle") || "Not specified"),
    "Service: " + form.get("service"),
    "Message: " + (form.get("message") || "Not specified"),
    "",
    "Thank you."
  ].join("\n");
  const whatsappUrl = "https://wa.me/" + GT9_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.location.href = whatsappUrl;
});
