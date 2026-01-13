// Menu Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

// Opening Hours
function toggleHours() {
    const list = document.getElementById('officeHours');
    const arrow = document.getElementById('arrow');
    list.classList.toggle('hidden');
    arrow.classList.toggle('rotate-90');
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
    const thumbnails = document.querySelectorAll("#thumbnails .thumb");
    let currentIndex = 0;
    let interval;
  
    const updateMainImage = (index) => {
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle("opacity-100", i === index);
        thumb.classList.toggle("opacity-50", i !== index);
        thumb.classList.toggle("border-white", i === index);
        thumb.classList.toggle("border-transparent", i !== index);
      });
  
      mainImage.src = thumbnails[index].src;
      currentIndex = index;
    };
  
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        updateMainImage(index);
        resetInterval();
      });
    });
  
    const autoPlay = () => {
      currentIndex = (currentIndex + 1) % thumbnails.length;
      updateMainImage(currentIndex);
    };
  
    const resetInterval = () => {
      clearInterval(interval);
      interval = setInterval(autoPlay, 5000);
    };
  
    updateMainImage(currentIndex);
    interval = setInterval(autoPlay, 5000);
});
  

