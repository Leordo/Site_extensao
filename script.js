document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for navigation links
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for sticky header
                    behavior: "smooth"
                });
            }
            // Close mobile menu after click if open
            const mobileMenu = document.getElementById("mobile-menu");
            if (!mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
            }
        });
    });

    // Dark mode toggle
    const themeSwitch = document.getElementById("theme-switch-checkbox");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === "dark-mode") {
            themeSwitch.checked = true;
            updateThemeIcon(true);
        }
    } else {
        updateThemeIcon(false);
    }

    function updateThemeIcon(isDarkMode) {
        const icon = document.querySelector(".theme-switch-wrapper i");
        if (isDarkMode) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        } else {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }

    themeSwitch.addEventListener("change", function(event) {
        if (event.target.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark-mode");
            updateThemeIcon(true);
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light-mode");
            updateThemeIcon(false);
        }
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", function() {
        mobileMenu.classList.toggle("hidden");
    });

    // Simple animation for service cards on scroll (example)
    const serviceCards = document.querySelectorAll(".service-card");
    const productCards = document.querySelectorAll("#products .bg-white.rounded-xl");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const initialCardStyle = (card) => {
        card.style.opacity = 0;
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
        observer.observe(card);
    };

    serviceCards.forEach(initialCardStyle);
    productCards.forEach(initialCardStyle);

    const floatingButton = document.querySelector(".floating-button img");
    if (floatingButton) {
        // JS animations for floating button if needed
    }
});
