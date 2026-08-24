/* =========================================================
   SAHIMAAP ADMIN DASHBOARD
   =========================================================

   Responsibilities:

   1. Protect admin-dashboard.html
   2. Prevent direct access without login
   3. Detect page refresh
   4. Logout on refresh
   5. Display the actual logged-in admin
   6. Handle Logout button

   IMPORTANT:
   The login page must create:

   sessionStorage.setItem(
       "sahimaapAdminSession",
       JSON.stringify(admin)
   );

   ========================================================= */


/* =========================================================
   SESSION KEY
   ========================================================= */

const ADMIN_SESSION_KEY = "sahimaapAdminSession";


/* =========================================================
   GET CURRENT ADMIN
   ========================================================= */

function getAdminSession() {

    const storedAdmin =
        sessionStorage.getItem(ADMIN_SESSION_KEY);

    if (!storedAdmin) {
        return null;
    }

    try {

        return JSON.parse(storedAdmin);

    } catch (error) {

        console.error(
            "Invalid admin session:",
            error
        );

        sessionStorage.removeItem(
            ADMIN_SESSION_KEY
        );

        return null;
    }
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutAdmin() {

    sessionStorage.removeItem(
        ADMIN_SESSION_KEY
    );

    /*
        Remove any other temporary admin
        information that your login system may use.
    */

    sessionStorage.removeItem(
        "adminLoggedIn"
    );

    sessionStorage.removeItem(
        "adminData"
    );


    /*
        Prevent browser from showing the
        dashboard from cached history.
    */

    window.location.replace(
        "admin-login.html"
    );
}


/* =========================================================
   CHECK WHETHER PAGE WAS REFRESHED
   ========================================================= */

function wasPageRefreshed() {

    const navigationEntries =
        performance.getEntriesByType(
            "navigation"
        );

    if (
        navigationEntries &&
        navigationEntries.length > 0
    ) {

        return (
            navigationEntries[0].type === "reload"
        );
    }


    /*
        Older browser fallback
    */

    if (
        performance.navigation &&
        performance.navigation.type === 1
    ) {

        return true;
    }

    return false;
}


/* =========================================================
   DISPLAY ADMIN INFORMATION
   ========================================================= */

function displayAdmin(admin) {

    /*
        NAME
    */

    const name =
        admin.name ||
        admin.full_name ||
        admin.fullName ||
        "Admin";


    /*
        USERNAME
    */

    const username =
        admin.user_name ||
        admin.username ||
        "—";


    /*
        EMAIL
    */

    const email =
        admin.email_id ||
        admin.email ||
        "—";


    /*
        MOBILE
    */

    const mobile =
        admin.mobile ||
        admin.mobile_number ||
        "—";


    /*
        WELCOME NAME
    */

    const adminName =
        document.getElementById(
            "adminName"
        );

    if (adminName) {

        adminName.textContent =
            name;
    }


    /*
        FULL NAME
    */

    const adminFullName =
        document.getElementById(
            "adminFullName"
        );

    if (adminFullName) {

        adminFullName.textContent =
            name;
    }


    /*
        USERNAME
    */

    const adminUsername =
        document.getElementById(
            "adminUsername"
        );

    if (adminUsername) {

        adminUsername.textContent =
            username;
    }


    /*
        EMAIL
    */

    const adminEmail =
        document.getElementById(
            "adminEmail"
        );

    if (adminEmail) {

        adminEmail.textContent =
            email;
    }


    /*
        MOBILE
    */

    const adminMobile =
        document.getElementById(
            "adminMobile"
        );

    if (adminMobile) {

        adminMobile.textContent =
            mobile;
    }
}


/* =========================================================
   PAGE PROTECTION
   ========================================================= */

(function protectDashboard() {

    /*
        -----------------------------------------------------
        STEP 1
        Check whether this page was refreshed.
        -----------------------------------------------------
    */

    if (wasPageRefreshed()) {

        console.log(
            "Dashboard refreshed. Logging out admin."
        );

        logoutAdmin();

        return;
    }


    /*
        -----------------------------------------------------
        STEP 2
        Get current admin session.
        -----------------------------------------------------
    */

    const admin =
        getAdminSession();


    /*
        -----------------------------------------------------
        STEP 3
        No admin session = NOT LOGGED IN
        -----------------------------------------------------
    */

    if (!admin) {

        console.log(
            "No admin session. Redirecting to login."
        );

        window.location.replace(
            "admin-login.html"
        );

        return;
    }


    /*
        -----------------------------------------------------
        STEP 4
        Valid admin session.
        Display actual admin data.
        -----------------------------------------------------
    */

    displayAdmin(admin);

})();


/* =========================================================
   LOGOUT BUTTON
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (!logoutButton) {
            return;
        }


        logoutButton.addEventListener(
            "click",
            function () {

                logoutAdmin();

            }
        );

    }
);