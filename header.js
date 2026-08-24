document.addEventListener("DOMContentLoaded", () => {

    const headerContainer = document.getElementById("header-container");

    if (!headerContainer) {
        return;
    }

    fetch("header.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load header.html");
            }

            return response.text();
        })

        .then(data => {

            headerContainer.innerHTML = data;

            const menuButton = document.querySelector(".menu-btn");
            const navLinks = document.querySelector(".nav-links");

            if (menuButton && navLinks) {

                menuButton.addEventListener("click", () => {

                    navLinks.classList.toggle("mobile-active");

                });

            }

        })

        .catch(error => {

            console.error("Header loading error:", error);

        });

});