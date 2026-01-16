// Sidebar toggle functionality
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const isOpen = !sidebar.classList.contains("-translate-x-full");

  if (isOpen) {
    // Close sidebar
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-50");
  } else {
    // Open sidebar
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-50");
  }
}

// Scroll detection for diamond animation
let isScrolled = false;

function handleScroll() {
  const scrollPosition = window.scrollY;
  const diamond = document.getElementById("diamond");
  const navbar = document.getElementById("navbar");

  if (scrollPosition > 50 && !isScrolled) {
    // Scrolled down - slide diamond upward into navbar
    isScrolled = true;
    diamond.style.transform = "translateX(-50%) translateY(-20%)";
    navbar.classList.add("shadow-lg");
    navbar.classList.remove("shadow-md");
  } else if (scrollPosition <= 50 && isScrolled) {
    // Scrolled to top - return diamond to original position
    isScrolled = false;
    diamond.style.transform = "translateX(-50%) translateY(50%)";
    navbar.classList.remove("shadow-lg");
    navbar.classList.add("shadow-md");
  }
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener("scroll", function () {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(function () {
    handleScroll();
  });
});

// Close sidebar when clicking on nav links
document.querySelectorAll("#sidebar a").forEach((link) => {
  link.addEventListener("click", function () {
    toggleSidebar();
  });
});

// Prevent body scroll when sidebar is open
const sidebar = document.getElementById("sidebar");
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName === "class") {
      const isOpen = !sidebar.classList.contains("-translate-x-full");
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  });
});

// Opening Hours
function toggleHours() {
  const hours = document.getElementById("officeHours");
  const arrow = document.getElementById("arrow");

  hours.classList.toggle("show");
  arrow.style.transform = hours.classList.contains("show")
    ? "rotate(90deg)"
    : "rotate(0deg)";
}

// Google Maps API
function initMap() {
  // Coordinates
  const location = { lat: 36.1844, lng: -115.9553 };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 14,
    mapTypeId: "roadmap",
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Pinned Location",
  });

  // Container for all controls
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "flex items-start mt-2 ml-2";

  // Zoom Controls Container
  const zoomControls = document.createElement("div");
  zoomControls.className = "flex flex-col space-y-1";

  // Zoom In Button
  const zoomInBtn = document.createElement("button");
  zoomInBtn.innerText = "+";
  zoomInBtn.className =
    "bg-white border px-5 py-3 text-lg rounded shadow hover:bg-gray-100";
  zoomInBtn.addEventListener("click", () => {
    map.setZoom(map.getZoom() + 1);
  });

  // Zoom Out Button
  const zoomOutBtn = document.createElement("button");
  zoomOutBtn.innerText = "−";
  zoomOutBtn.className =
    "bg-white border px-5 py-3 text-lg rounded shadow hover:bg-gray-100";
  zoomOutBtn.addEventListener("click", () => {
    map.setZoom(map.getZoom() - 1);
  });

  // Append zoom buttons to Container
  zoomControls.appendChild(zoomInBtn);
  zoomControls.appendChild(zoomOutBtn);

  // Get Directions Button
  const directionsBtn = document.createElement("button");
  directionsBtn.className =
    "bg-[#d7d7d7] text-black custom-font-size font-bold px-9 py-3 ml-2 rounded-full shadow hover:bg-gray-800 transition flex items-center";
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-location-arrow mr-2";
  const btnText = document.createTextNode("GET DIRECTIONS");
  directionsBtn.appendChild(icon);
  directionsBtn.appendChild(btnText);
  directionsBtn.addEventListener("click", () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`,
      "_blank"
    );
  });

  // All controls to the master container
  controlsContainer.appendChild(zoomControls);
  controlsContainer.appendChild(directionsBtn);

  // Add to map controls
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlsContainer);
}

// Carousel Element
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const prevImage = document.getElementById("prevImage");
  const nextImage = document.getElementById("nextImage");
  const thumbnails = document.querySelectorAll("#thumbnails .thumb");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  let interval;
  let isAnimating = false;

  const getImageIndex = (offset) => {
    const index = currentIndex + offset;
    if (index < 0) return thumbnails.length - 1;
    if (index >= thumbnails.length) return 0;
    return index;
  };

  const updateCarousel = (index, direction = "right") => {
    if (isAnimating) return;
    isAnimating = true;

    const prevIndex = getImageIndex(-1);
    const nextIndex = getImageIndex(1);

    // Update thumbnail styles
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("opacity-100", i === index);
      thumb.classList.toggle("opacity-50", i !== index);
      thumb.classList.toggle("border-white", i === index);
      thumb.classList.toggle("border-3", i === index);
      thumb.classList.toggle("border-2", i !== index);
      thumb.classList.toggle("border-transparent", i !== index);
    });

    // Add animation class based on direction
    mainImage.classList.remove("slide-in-right", "slide-in-left");
    mainImage.classList.add(
      direction === "right" ? "slide-in-right" : "slide-in-left"
    );

    // Update images
    mainImage.src = thumbnails[index].src;
    prevImage.src = thumbnails[prevIndex].src;
    nextImage.src = thumbnails[nextIndex].src;

    currentIndex = index;

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  };

  const nextSlide = () => {
    const newIndex = getImageIndex(1);
    updateCarousel(newIndex, "right");
  };

  const prevSlide = () => {
    const newIndex = getImageIndex(-1);
    updateCarousel(newIndex, "left");
  };

  // Thumbnail click handlers
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      const direction = index > currentIndex ? "right" : "left";
      updateCarousel(index, direction);
      resetInterval();
    });
  });

  // Navigation button handlers
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
      resetInterval();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
      resetInterval();
    }
  });

  // Auto-play functionality
  const autoPlay = () => {
    nextSlide();
  };

  const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(autoPlay, 5000);
  };

  // Initialize
  updateCarousel(currentIndex);
  interval = setInterval(autoPlay, 5000);

  // Pause on hover
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    resetInterval();
  });
});
