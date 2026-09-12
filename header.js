document.addEventListener("DOMContentLoaded", () => {

    const headerContainer =
        document.getElementById("header-container");

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

            // =====================================================
            // LOAD HEADER
            // =====================================================

            headerContainer.innerHTML = data;


            // =====================================================
            // CURRENT PAGE INFORMATION
            // =====================================================

            const path =
                window.location.pathname.toLowerCase();

            const currentPage =
                path.split("/").pop().toLowerCase();


            // =====================================================
            // PAGE DETECTION
            // =====================================================

            const isLoginPage =
                path.includes("login");


            const isSignupPage =
                path.includes("signup") ||
                path.includes("sign-up") ||
                path.includes("register") ||
                path.includes("registration") ||
                currentPage.includes("signup") ||
                currentPage.includes("register") ||
                currentPage.includes("registration");


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
            // ABOUT LINK
            // =====================================================

            if (currentPage === "about.html") {

                const aboutLink =
                    document.querySelector(
                        'a[href="about.html"]'
                    );

                if (aboutLink) {
                    aboutLink.style.display = "none";
                }
            }


            // =====================================================
            // HEADER LINKS
            // =====================================================

            const registerLink =
                document.getElementById(
                    "openRegisterModal"
                );

            const dashboardLink =
                document.getElementById(
                    "dashboardLink"
                );


            // =====================================================
            // RESET VISIBILITY FIRST
            // =====================================================

            if (registerLink) {
                registerLink.style.display = "";
            }

            if (dashboardLink) {
                dashboardLink.style.display = "";
            }


            // =====================================================
            // LOGGED-IN USER
            // =====================================================

            if (isLoggedIn) {

                // Logged-in users don't need Login or Sign Up
                if (registerLink) {
                    registerLink.style.display = "none";
                }


                // -------------------------------------------------
                // ADMIN
                // -------------------------------------------------

                if (
                    loginRole === "admin" &&
                    sessionStorage.getItem("currentAdmin")
                ) {

                    if (dashboardLink) {
                        dashboardLink.textContent = "Dashboard";
                        dashboardLink.href =
                            "admin-dashboard.html";
                    }

                }


                // -------------------------------------------------
                // MANUFACTURER
                // -------------------------------------------------

                else if (
                    loginRole === "manufacturer" &&
                    sessionStorage.getItem(
                        "currentManufacturer"
                    )
                ) {

                    if (dashboardLink) {
                        dashboardLink.textContent = "Dashboard";
                        dashboardLink.href =
                            "manufacturer-dashboard.html";
                    }

                }


                // -------------------------------------------------
                // LMO
                // -------------------------------------------------

                else if (
                    loginRole === "lmo" &&
                    sessionStorage.getItem("currentLmo")
                ) {

                    if (dashboardLink) {
                        dashboardLink.textContent = "Dashboard";
                        dashboardLink.href =
                            "lmo-dashboard.html";
                    }

                }


                // -------------------------------------------------
                // GATC
                // -------------------------------------------------

                else if (
                    loginRole === "gatc" &&
                    sessionStorage.getItem("currentGatc")
                ) {

                    if (dashboardLink) {
                        dashboardLink.textContent = "Dashboard";
                        dashboardLink.href =
                            "gatc-dashboard.html";
                    }

                }

            }


            // =====================================================
            // LOGGED-OUT USER
            // =====================================================

            else {

                // -------------------------------------------------
                // LOGIN PAGE
                //
                // Login = HIDDEN
                // Sign Up = VISIBLE
                // -------------------------------------------------

                if (isLoginPage) {

                    if (dashboardLink) {
                        dashboardLink.style.display = "none";
                    }

                    if (registerLink) {
                        registerLink.style.display = "";
                    }

                }


                // -------------------------------------------------
                // SIGNUP / REGISTER PAGE
                //
                // Login = VISIBLE
                // Sign Up = HIDDEN
                // -------------------------------------------------

                else if (isSignupPage) {

                    if (dashboardLink) {
                        dashboardLink.style.display = "";
                        dashboardLink.textContent = "Log In";
                        dashboardLink.href = "login.html";
                    }

                    if (registerLink) {
                        registerLink.style.display = "none";
                    }

                }


                // -------------------------------------------------
                // NORMAL PAGE
                //
                // Login = VISIBLE
                // Sign Up = VISIBLE
                // -------------------------------------------------

                else {

                    if (dashboardLink) {
                        dashboardLink.style.display = "";
                        dashboardLink.textContent = "Log In";
                        dashboardLink.href = "login.html";
                    }

                    if (registerLink) {
                        registerLink.style.display = "";
                    }

                }

            }


            // =====================================================
            // FINAL PAGE-SPECIFIC OVERRIDE
            // =====================================================
            // This is intentionally LAST so nothing else can
            // accidentally make the wrong option visible.


            // LOGIN PAGE
            if (isLoginPage) {

                if (dashboardLink) {
                    dashboardLink.style.display = "none";
                }

                if (registerLink) {
                    registerLink.style.display = "";
                }

            }


            // SIGNUP / REGISTER PAGE
            if (isSignupPage) {

                if (registerLink) {
                    registerLink.style.display = "none";
                }

                // Only show Login if the user is NOT logged in
                if (!isLoggedIn && dashboardLink) {
                    dashboardLink.style.display = "";
                    dashboardLink.textContent = "Log In";
                    dashboardLink.href = "login.html";
                }

            }


            // =====================================================
            // REGISTER MODAL
            // =====================================================

            const registerModal =
                document.getElementById(
                    "smRegisterModal"
                );

            const openRegisterModal =
                document.getElementById(
                    "openRegisterModal"
                );

            const closeRegisterModal =
                document.getElementById(
                    "smCloseRegister"
                );

            const registerOverlay =
                document.querySelector(
                    ".sm-register-overlay"
                );


            // =====================================================
            // OPEN REGISTER MODAL
            // =====================================================

            if (
                registerModal &&
                openRegisterModal
            ) {

                openRegisterModal.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        registerModal.hidden = false;

                        document.body.style.overflow =
                            "hidden";

                    }
                );

            }


            // =====================================================
            // CLOSE REGISTER MODAL
            // =====================================================

            if (closeRegisterModal) {

                closeRegisterModal.addEventListener(
                    "click",
                    () => {

                        registerModal.hidden = true;

                        document.body.style.overflow = "";

                    }
                );

            }


            // =====================================================
            // CLOSE MODAL BY CLICKING OVERLAY
            // =====================================================

            if (registerOverlay) {

                registerOverlay.addEventListener(
                    "click",
                    () => {

                        registerModal.hidden = true;

                        document.body.style.overflow = "";

                    }
                );

            }


            // =====================================================
            // HOME LINK
            // =====================================================

            const homeLink =
                document.querySelector(".home-link");

            if (homeLink) {

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


            if (
                menuButton &&
                navLinks
            ) {

                menuButton.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();
                        event.stopPropagation();

                        navLinks.classList.toggle(
                            "mobile-active"
                        );

                    }
                );

            }

        })

        .catch(error => {

            console.error(
                "Header loading error:",
                error
            );

        });

});
