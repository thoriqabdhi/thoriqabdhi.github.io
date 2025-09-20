document.addEventListener("DOMContentLoaded", () => {
  const riInner = document.querySelector(".ri-inner");
  const riItems = document.querySelectorAll(".ri-item");
  const riPrev = document.querySelector(".ri-prev");
  const riNext = document.querySelector(".ri-next");
  const riIndicators = document.querySelector(".ri-indicators");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  const totalSlides = riItems.length;

  // Fungsi memperbarui tampilan slide
  function updateRi() {
    riItems.forEach((item, index) => {
      let transformValue = "";
      let opacityValue = 0;
      let zIndexValue = 1; // Default z-index for inactive slides

      if (index === currentIndex) {
        // Active slide: centered, full opacity, highest z-index
        transformValue = "translateX(0) translateZ(0) rotateY(0deg)";
        opacityValue = 1;
        zIndexValue = 3; // Highest z-index
      } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
        // Previous slide: positioned to the left, slightly rotated, behind active
        transformValue = "translateX(-70%) translateZ(-100px) rotateY(20deg)"; /* Adjust values as needed */
        opacityValue = 0.6; // Slightly transparent
        zIndexValue = 2; // Behind active
      } else if (index === (currentIndex + 1) % totalSlides) {
        // Next slide: positioned to the right, slightly rotated, behind active
        transformValue = "translateX(70%) translateZ(-100px) rotateY(-20deg)"; /* Adjust values as needed */
        opacityValue = 0.6; // Slightly transparent
        zIndexValue = 2; // Behind active
      } else {
        // Other slides: completely hidden or very far back
        transformValue = "translateX(0) translateZ(-500px) rotateY(0deg)"; // Push far back
        opacityValue = 0;
        zIndexValue = 0; // Farthest back
      }
      item.style.transform = transformValue;
      item.style.opacity = opacityValue;
      item.style.zIndex = zIndexValue;

      // Update active class for slide (for styling if needed, though transform handles visibility)
      if (index === currentIndex) {
        item.classList.add("active");
        item.style.pointerEvents = "auto"; // Enable interaction for active slide
      } else {
        item.classList.remove("active");
        item.style.pointerEvents = "none"; // Disable interaction for inactive slides
      }
    });
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Event listener untuk tombol Next
  riNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateRi();
  });

  // Event listener untuk tombol Previous
  riPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateRi();
  });

  // Event listener untuk indikator
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (event) => {
      const slideTo = parseInt(event.target.dataset.slideTo);
      currentIndex = slideTo;
      updateRi();
    });
  });

  // Inisialisasi carousel pada saat halaman dimuat
  updateRi();

  // Optional: Autoplay Carousel
  let autoplayInterval;
  const startAutoplay = () => {
    stopAutoplay(); // Clear any existing interval before starting a new one
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateRi();
    }, 4000); // Durasi (milidetik) antar slide
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // Mulai autoplay saat halaman dimuat
  startAutoplay();

  // Hentikan autoplay saat mouse hover dan mulai lagi saat mouse leave
  riInner.addEventListener("mouseenter", stopAutoplay);
  riInner.addEventListener("mouseleave", startAutoplay);
  riPrev.addEventListener("mouseenter", stopAutoplay); // Stop autoplay when hovering on buttons
  riNext.addEventListener("mouseenter", stopAutoplay);
  riPrev.addEventListener("mouseleave", startAutoplay); // Restart autoplay when leaving buttons
  riNext.addEventListener("mouseleave", startAutoplay);
});

document.addEventListener('DOMContentLoaded', function () {
  const navbarCollapse = document.getElementById('navbarNavAltMarkup');
  const navbarToggler = document.querySelector('.navbar-toggler');

  // Mendeteksi saat menu dilipat
  navbarCollapse.addEventListener('hide.bs.collapse', function () {
    navbarToggler.style.display = 'block';
  });

  // Mendeteksi saat menu diperluas
  navbarCollapse.addEventListener('show.bs.collapse', function () {
    navbarToggler.style.display = 'none';
  });
});
