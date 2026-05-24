const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
    link.addEventListener('click', function() {

        links.forEach(l => l.classList.remove('active'));

        this.classList.add('active');
    });
});


//for overlay in projects section for mobile device only 
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  const isMobile = () =>
    window.matchMedia("(max-width: 768px)").matches;

  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (!isMobile()) return;

      // toggle current card
      const isActive = card.classList.contains("active");

      // close all cards
      cards.forEach(c => c.classList.remove("active"));

      // reopen clicked one if it wasn't already active
      if (!isActive) {
        card.classList.add("active");
      }
    });
  });

  // optional: close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".project-card")) {
      cards.forEach(c => c.classList.remove("active"));
    }
  });
});




function scrollTopReload() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(() => {
    location.reload();
  }, 500);
}
