// Replace this with GT9's WhatsApp number in international format, digits only. Example: 919876543210
const GT9_WHATSAPP_NUMBER = "91XXXXXXXXXX";
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
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
    alert("Please add GT9's WhatsApp number in script.js before using this enquiry form.");
    return;
  }
  window.open("https://wa.me/" + GT9_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener");
});
