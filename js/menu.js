 document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const sideMenu = document.getElementById("sideMenu");

    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      sideMenu.style.display =
        sideMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (e) {
      if (
        !sideMenu.contains(e.target) &&
        e.target !== hamburger &&
        !hamburger.contains(e.target)
      ) {
        sideMenu.style.display = "none";
      }
    });
  });