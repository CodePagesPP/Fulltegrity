const carousel = document.getElementById("carousel");
const items = carousel.querySelectorAll(".carousel-item");
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;
const threshold = 500; // desplazamiento mínimo para cambiar de slide


 window.addEventListener("scroll", function () {
    const topBar = document.querySelector(".top-bar");
    if (window.scrollY > 0) {
      topBar.classList.add("fixed");
    } else {
      topBar.classList.remove("fixed");
    }
  });

  
function setPositionByIndex() {
  currentTranslate = -currentIndex * window.innerWidth;
  prevTranslate = currentTranslate;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
}


function loadVideo(wrapper) {
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "560";
    iframe.src = "https://www.youtube.com/embed/MZ2v8eYZmBY?autoplay=1";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    wrapper.innerHTML = "";
    wrapper.appendChild(iframe);
  }


function animateCurrentSlide() {
  items.forEach((item, index) => {
    const texts = item.querySelectorAll(".slide-up, .delay, .delay2");
    if (index === currentIndex) {
      texts.forEach((el) => {
        el.classList.remove("animated"); 
        void el.offsetWidth; 
        el.classList.add("animated");
      });
    } else {
      texts.forEach((el) => {
        el.classList.remove("animated");
      });
    }
  });
}


function setPositionByIndex() {
  currentTranslate = -currentIndex * window.innerWidth;
  prevTranslate = currentTranslate;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
  animateCurrentSlide(); 
}

carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  carousel.style.cursor = "grabbing";
});

window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  const moved = e.pageX - startX;

  if (moved < -threshold && currentIndex < items.length - 1) {
    currentIndex++;
  } else if (moved > threshold && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();

  isDragging = false;
  carousel.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaX = e.pageX - startX;
  currentTranslate = prevTranslate + deltaX;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
});

// Touch support
carousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
});

carousel.addEventListener("touchend", (e) => {
  const moved = e.changedTouches[0].pageX - startX;

  if (moved < -threshold && currentIndex < items.length - 1) {
    currentIndex++;
  } else if (moved > threshold && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();
  isDragging = false;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].pageX - startX;
  currentTranslate = prevTranslate + deltaX;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
});

// Opcional: cambia el tamaño dinámicamente si el usuario cambia el tamaño de la ventana
window.addEventListener("resize", setPositionByIndex);


setPositionByIndex();
animateCurrentSlide();
