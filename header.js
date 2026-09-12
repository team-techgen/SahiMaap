```javascript
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


            // =====================================================
            // CURRENT PAGE
            // =====================================================

            const currentPage =
                window.location.pathname
                    .split("/")
                    .pop()
                    .toLowerCase();


            // =====================================================
            // HOME LINK
            // Hide Home when already on Home page
            // =====================================================

            const homeLink =
                document.querySelector(".home-link");

            if (homeLink) {

                if (
                    currentPage === "index.html" ||
                    currentPage === ""
                ) {

                    homeLink.style.display = "none";

                } else {

                    homeLink.style.display = "";
                }
            }


            // =====================================================
            // ABOUT LINK
            // Hide About when already on About page
            // =====================================================

            const aboutLink =
                document.querySelector('a[href="about.html"]');

            if (aboutLink) {

                if (currentPage === "about.html") {

                    aboutLink.style.display = "none";

                } else {

                    aboutLink.style.display = "";
                }
            }


            // =====================================================
            // LOGIN STATUS
            // =====================================================

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


            // =====================================================
            // SIGN UP VISIBILITY
            // Hide Sign Up when logged in
            // =====================================================

            const registerLink =
                document.getElementById("openRegisterModal");

            if (registerLink) {

                if (isLoggedIn) {

                    registerLink.style.display = "none";

                } else {

                    registerLink.style.display = "";
                }
            }


            // =====================================================
            // LOGIN / DASHBOARD LINK
            // Hide Login/Dashboard when logged in
            // =====================================================

            const dashboardLink =
                document.getElementById("dashboardLink");

            if (dashboardLink) {


                // =================================================
                // ADMIN
                // =================================================

                if (
                    loginRole === "admin" &&
                    sessionStorage.getItem("currentAdmin")
                ) {

                    dashboardLink.textContent = "Dashboard";
                    dashboardLink.href = "admin-dashboard.html";

                    // Hide Dashboard when logged in
                    dashboardLink.style.display = "none";

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

                    // Hide Dashboard when logged in
                    dashboardLink.style.display = "none";

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

                    // Hide Dashboard when logged in
                    dashboardLink.style.display = "none";

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

                    // Hide Dashboard when logged in
                    dashboardLink.style.display = "none";

                }


                // =================================================
                // NOT LOGGED IN
                // =================================================

                else {

                    dashboardLink.textContent = "Log In";
                    dashboardLink.href = "login.html";
                    dashboardLink.style.display = "";

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


            // =====================================================
            // OPEN MODAL
            // =====================================================

            if (registerModal && openRegisterModal) {

                openRegisterModal.addEventListener("click", (event) => {

                    event.preventDefault();

                    registerModal.hidden = false;

                    document.body.style.overflow = "hidden";

                });

            }


            // =====================================================
            // CLOSE WITH X
            // =====================================================

            if (closeRegisterModal) {

                closeRegisterModal.addEventListener("click", () => {

                    registerModal.hidden = true;

                    document.body.style.overflow = "";

                });

            }


            // =====================================================
            // CLOSE BY CLICKING OVERLAY
            // =====================================================

            if (registerOverlay) {

                registerOverlay.addEventListener("click", () => {

                    registerModal.hidden = true;

                    document.body.style.overflow = "";

                });

            }


            // =====================================================
            // MOBILE MENU
            // =====================================================

            const menuButton =
                document.querySelector(".menu-btn");

            const navLinks =
                document.querySelector(".nav-links");


            if (menuButton && navLinks) {

                menuButton.addEventListener("click", (event) => {

                    event.preventDefault();

                    event.stopPropagation();

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
```
