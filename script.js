/* Global interactions: mobile nav toggle, contact form handling, scroll reveal */
document.addEventListener("DOMContentLoaded", () => {
  // Year injection
  const yearEls = ["year","year2","year3","year4"];
  yearEls.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  const toggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  if (toggle && navLinks){
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Contact form (client-side only)
  const contact = document.getElementById("contact-form");
  if (contact){
    contact.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contact);
      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const message = formData.get("message") || "";
      if (!name.trim() || !email.trim() || !message.trim()){
        alert("Please complete all required fields.");
        return;
      }
      alert("Thanks, " + (name.split(" ")[0] || "") + "! Your message was sent. We'll be in touch.");
      contact.reset();
    });
  }

  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll(".reveal-up");
  const observerOptions = {threshold: 0.12};
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  reveals.forEach(r => revealObserver.observe(r));

  // Optional: highlight current nav link by URL
  const navLinksAll = document.querySelectorAll(".nav-link");
  const current = location.pathname.split("/").pop() || "index.html";
  navLinksAll.forEach(a => {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
});
