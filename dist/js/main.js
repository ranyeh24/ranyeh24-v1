(function () {
  "use strict";

  // Hide preload onload
  const preload = document.querySelector("[data-web-trigger=preload]");

  if (preload) {
    window.addEventListener("load", function () {
      preload.remove();
    });
  }

  // Add 'isSticky' class to navbar when scrolled
  const navbar = document.querySelector(".rh-navbar");

  function toggleStickyNavbar() {
    window.scrollY >= 8
      ? navbar.classList.add("isSticky")
      : navbar.classList.remove("isSticky");
  }

  window.addEventListener("load", toggleStickyNavbar);
  document.addEventListener("scroll", toggleStickyNavbar);

  // Responsive navbar
  const navbarToggler = document.querySelectorAll(
    "[data-web-toggle=navbar-collapse]",
  );

  navbarToggler.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const dataTarget = this.dataset.webTarget,
        targetElement = document.getElementById(dataTarget),
        isExpanded = this.ariaExpanded === "true";

      if (!targetElement) {
        return;
      }

      navbar.classList.toggle("menuShow");
      this.ariaExpanded = !isExpanded;
      this.innerHTML = navbar.classList.contains("menuShow")
        ? '<i class="uil uil-times"></i>'
        : '<i class="uil uil-bars"></i>';
    });
  });

  // Switch theme mode
  const themeSwitcher = document.querySelector("[data-web-trigger=theme-mode]"),
    html = document.querySelector("html");

  window.addEventListener("load", function () {
    var theme = localStorage.getItem("RHSystem_ThemeMode");

    if (theme == "light") {
      themeSwitcher.innerHTML = '<i class="uil uil-sun"></i>';
    } else if (theme == "dark") {
      themeSwitcher.innerHTML = '<i class="uil uil-moon"></i>';
    } else {
      theme = "light";
      localStorage.setItem("RHSystem_ThemeMode", theme);
      themeSwitcher.innerHTML = '<i class="uil uil-moon"></i>';
    }

    html.dataset.themeMode = theme;
  });

  themeSwitcher.addEventListener("click", function () {
    var theme = localStorage.getItem("RHSystem_ThemeMode");
    this.innerHTML =
      theme == "dark"
        ? '<i class="uil uil-sun"></i>'
        : '<i class="uil uil-moon"></i>';
    theme = theme == "dark" ? "light" : "dark";
    localStorage.setItem("RHSystem_ThemeMode", theme);
    html.dataset.themeMode = theme;
  });

  // Show or hide scroll to top button
  const stButton = document.querySelector("[data-web-trigger=scroll-top]");

  function toggleScrollTop() {
    if (stButton) {
      window.scrollY > 74
        ? stButton.classList.add("isShow")
        : stButton.classList.remove("isShow");
    }
  }

  if (stButton) {
    stButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  // Init AOS
  AOS.init();
})();
