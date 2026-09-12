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

            // Load header FIRST
            headerContainer.innerHTML = data;
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // Hide About link when already on About page
        if (window.location.pathname.endsWith('about.html')) {
            const aboutLink = document.querySelector('a[href="about.html"]');
            if (aboutLink) {
                aboutLink.style.display = 'none';
            }
        }
    });
            // =====================================================
// SIGN UP VISIBILITY
// =====================================================

const registerLink =
    document.getElementById("openRegisterModal");

if (registerLink) {

    const loginRole =
        sessionStorage.getItem("loginRole");

    const isLoggedIn =
        (loginRole === "admin" &&
            sessionStorage.getItem("currentAdmin")) ||

        (loginRole === "manufacturer" &&
            sessionStorage.getItem("currentManufacturer")) ||

        (loginRole === "lmo" &&
            sessionStorage.getItem("currentLmo")) ||

        (loginRole === "gatc" &&
            sessionStorage.getItem("currentGatc"));

    if (isLoggedIn) {
        registerLink.style.display = "none";
    } else {
        registerLink.style.display = "";
    }
}
// =====================================================
// LOGIN / DASHBOARD LINK
// =====================================================

const dashboardLink =
    document.getElementById("dashboardLink");

if (dashboardLink) {

    const loginRole =
        sessionStorage.getItem("loginRole");

    // =================================================
    // ADMIN
    // =================================================
    if (
        loginRole === "admin" &&
        sessionStorage.getItem("currentAdmin")
    ) {

        dashboardLink.textContent = "Dashboard";
        dashboardLink.href = "admin-dashboard.html";

    }

    // =================================================
    // MANUFACTURER
    // =================================================
    else if (
        loginRole === "manufacturer" &&
        sessionStorage.getItem("currentManufacturer")
    ) {

        dashboardLink.textContent = "Dashboard";
        dashboardLink.href =
            "manufacturer-dashboard.html";

    }

    // =================================================
    // LMO
    // =================================================
    else if (
        loginRole === "lmo" &&
        sessionStorage.getItem("currentLmo")
    ) {

        dashboardLink.textContent = "Dashboard";
        dashboardLink.href =
            "lmo-dashboard.html";

    }

    // =================================================
    // GATC
    // =================================================
    else if (
        loginRole === "gatc" &&
        sessionStorage.getItem("currentGatc")
    ) {

        dashboardLink.textContent = "Dashboard";
        dashboardLink.href =
            "gatc-dashboard.html";

    }

    // =================================================
    // NOT LOGGED IN
    // =================================================
    else {

        dashboardLink.textContent = "Log In";
        dashboardLink.href = "login.html";

    }
}

            // =====================================================
            // SAHIMAAP REGISTER MODAL
            // =====================================================

            const registerModal =
                document.getElementById("smRegisterModal");

            const openRegisterModal =
                document.getElementById("openRegisterModal");

            const closeRegisterModal =
                document.getElementById("smCloseRegister");

            const registerOverlay =
                document.querySelector(".sm-register-overlay");


            // OPEN MODAL
            if (registerModal && openRegisterModal) {

                openRegisterModal.addEventListener("click", (event) => {

                    event.preventDefault();

                    registerModal.hidden = false;

                    document.body.style.overflow = "hidden";

                });

            }


            // CLOSE WITH X
            if (closeRegisterModal) {

                closeRegisterModal.addEventListener("click", () => {

                    registerModal.hidden = true;

                    document.body.style.overflow = "";

                });

            }


            // CLOSE BY CLICKING OVERLAY
            if (registerOverlay) {

                registerOverlay.addEventListener("click", () => {

                    registerModal.hidden = true;

                    document.body.style.overflow = "";

                });

            }


            // =====================================================
            // HOME LINK
            // =====================================================

            const homeLink =
                document.querySelector(".home-link");

            if (homeLink) {

                const currentPage =
                    window.location.pathname
                        .split("/")
                        .pop()
                        .toLowerCase();

                if (
                    currentPage === "index.html" ||
                    currentPage === ""
                ) {

                    homeLink.style.display = "none";

                }

            }


            // =====================================================
            // MOBILE MENU
            // =====================================================

            const menuButton =
                document.querySelector(".menu-btn");

            const navLinks =
                document.querySelector(".nav-links");

            if (menuButton && navLinks) {

                menuButton.addEventListener("click", () => {

                    navLinks.classList.toggle("mobile-active");

                });

            }

        })

        .catch(error => {

            console.error(
                "Header loading error:",
                error
            );

        });

});