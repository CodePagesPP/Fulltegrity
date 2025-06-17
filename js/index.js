const carousel = document.getElementById("carousel");
let items = carousel.querySelectorAll(".carousel-item");
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 1; 
const threshold = 800;


const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, items[0]);

items = carousel.querySelectorAll(".carousel-item");

function setPositionByIndex(animate = true) {
  currentTranslate = -currentIndex * window.innerWidth;
  prevTranslate = currentTranslate;
  carousel.style.transition = animate ? "transform 0.5s ease-out" : "none";
  carousel.style.transform = `translateX(${currentTranslate}px)`;
  animateCurrentSlide();
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

carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  carousel.style.transition = "none";
  carousel.style.cursor = "grabbing";
});

window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  const moved = e.pageX - startX;

  if (moved < -threshold) {
    currentIndex++;
  } else if (moved > threshold) {
    currentIndex--;
  }

  setPositionByIndex(true);
  isDragging = false;
  carousel.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaX = e.pageX - startX;
  let tempTranslate = prevTranslate + deltaX;
  currentTranslate = tempTranslate;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
});

carousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
  carousel.style.transition = "none";
});

carousel.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  const moved = e.changedTouches[0].pageX - startX;

  if (moved < -threshold) {
    currentIndex++;
  } else if (moved > threshold) {
    currentIndex--;
  }

  setPositionByIndex(true);
  isDragging = false;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].pageX - startX;
  let tempTranslate = prevTranslate + deltaX;
  currentTranslate = tempTranslate;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
});


carousel.addEventListener("transitionend", () => {
  if (items[currentIndex].id === "first-clone") {
    carousel.style.transition = "none";
    currentIndex = 1;
    setPositionByIndex(false);
  } else if (items[currentIndex].id === "last-clone") {
    carousel.style.transition = "none";
    currentIndex = items.length - 2;
    setPositionByIndex(false);
  }
});

window.addEventListener("resize", () => setPositionByIndex(false));

function checkTopBar() {
    const topBar = document.querySelector(".top-bar");
    if (window.scrollY > 0) {
        topBar.classList.add("fixed");
    } else {
        topBar.classList.remove("fixed");
    }
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


window.addEventListener("scroll", checkTopBar);
window.addEventListener("DOMContentLoaded", checkTopBar);

// Inicializar
setPositionByIndex(false);
animateCurrentSlide();
