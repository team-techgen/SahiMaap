// =====================================================
// ADMIN DASHBOARD
// =====================================================
//
// IMPORTANT:
//
// This page uses the admin information already stored
// by the existing login.js:
//
//     sessionStorage.currentAdmin
//
// DO NOT change login.js for this version.
//
// OTP is currently handled by login.js.
// Later, when Brevo OTP is added, the OTP process will
// remain in login.js.
//
// This dashboard is responsible for:
//
// 1. Blocking direct access without a login session
// 2. Loading the actual logged-in admin
// 3. Displaying dynamic admin information
// 4. Logging out when the dashboard is refreshed
// 5. Logging out when the Logout button is clicked
// 6. Handling browser back/forward cache
//
// =====================================================


// =====================================================
// LOGIN PAGE
// =====================================================

const LOGIN_PAGE = "login.html";


// =====================================================
// SESSION KEY
// =====================================================

const ADMIN_SESSION_KEY = "currentAdmin";

const ADMIN_LOGIN_KEY = "adminLoggedIn";


// =====================================================
// LOGOUT SESSION
// =====================================================
//
// Keep all admin-session removal in one function.
//
// This will also make it easier later when Brevo
// verification is introduced.
//
// =====================================================

function clearAdminSession() {

    sessionStorage.removeItem(
        ADMIN_SESSION_KEY
    );

    sessionStorage.removeItem(
        ADMIN_LOGIN_KEY
    );

}


// =====================================================
// REDIRECT TO LOGIN
// =====================================================

function redirectToLogin() {

    clearAdminSession();

    window.location.replace(
        LOGIN_PAGE
    );

}


// =====================================================
// CHECK HOW PAGE WAS OPENED
// =====================================================

const navigationEntry =
    performance.getEntriesByType(
        "navigation"
    )[0];


// =====================================================
// REFRESH DETECTION
// =====================================================
//
// Requested behaviour:
//
// Dashboard
//     ↓
// Refresh / F5
//     ↓
// Logout
//     ↓
// login.html
//
// =====================================================

if (
    navigationEntry &&
    navigationEntry.type === "reload"
) {

    redirectToLogin();

}


// =====================================================
// GET LOGGED-IN ADMIN
// =====================================================

const storedAdmin =
    sessionStorage.getItem(
        ADMIN_SESSION_KEY
    );


// =====================================================
// DIRECT ACCESS PROTECTION
// =====================================================
//
// If somebody manually enters:
//
//     admin-dashboard.html
//
// without logging in:
//
//     admin-dashboard.html
//             ↓
//         login.html
//
// =====================================================

if (!storedAdmin) {

    window.location.replace(
        LOGIN_PAGE
    );

}


// =====================================================
// ADMIN DATA
// =====================================================

let admin = null;


// =====================================================
// PARSE ADMIN SESSION
// =====================================================

if (storedAdmin) {

    try {

        admin =
            JSON.parse(
                storedAdmin
            );

    }

    catch (error) {

        console.error(
            "Invalid admin session:",
            error
        );


        redirectToLogin();

    }

}


// =====================================================
// INVALID ADMIN DATA
// =====================================================

if (
    !admin ||
    typeof admin !== "object"
) {

    redirectToLogin();

}


// =====================================================
// ELEMENTS
// =====================================================

const adminName =
    document.getElementById(
        "adminName"
    );


const adminFullName =
    document.getElementById(
        "adminFullName"
    );


const adminUsername =
    document.getElementById(
        "adminUsername"
    );


const adminEmail =
    document.getElementById(
        "adminEmail"
    );


const adminMobile =
    document.getElementById(
        "adminMobile"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


// =====================================================
// SAFE DISPLAY FUNCTION
// =====================================================

function displayValue(value) {

    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
    ) {

        return "Not available";

    }


    return String(value);

}


// =====================================================
// GET ADMIN NAME
// =====================================================
//
// Database fields:
//
//     name
//     user_name
//
// =====================================================

const adminDisplayName =
    admin.name ||
    admin.user_name ||
    "Admin";


// =====================================================
// DISPLAY ADMIN NAME
// =====================================================

if (adminName) {

    adminName.textContent =
        displayValue(
            adminDisplayName
        );

}


// =====================================================
// DISPLAY FULL NAME
// =====================================================

if (adminFullName) {

    adminFullName.textContent =
        displayValue(
            admin.name
        );

}


// =====================================================
// DISPLAY USERNAME
// =====================================================

if (adminUsername) {

    adminUsername.textContent =
        displayValue(
            admin.user_name
        );

}


// =====================================================
// DISPLAY EMAIL
// =====================================================

if (adminEmail) {

    adminEmail.textContent =
        displayValue(
            admin.email_id
        );

}


// =====================================================
// DISPLAY MOBILE
// =====================================================

if (adminMobile) {

    adminMobile.textContent =
        displayValue(
            admin.mobile
        );

}


// =====================================================
// LOGOUT FUNCTION
// =====================================================

function logoutAdmin() {

    clearAdminSession();

    window.location.replace(
        LOGIN_PAGE
    );

}


// =====================================================
// LOGOUT BUTTON
// =====================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            logoutAdmin();

        }
    );

}


// =====================================================
// HANDLE PAGE SHOW / BACK-FORWARD CACHE
// =====================================================
//
// Some mobile browsers can restore a page from the
// back-forward cache instead of loading it again.
//
// Always check whether the admin session still exists.
//
// =====================================================

window.addEventListener(
    "pageshow",
    function (event) {

        const adminSession =
            sessionStorage.getItem(
                ADMIN_SESSION_KEY
            );


        if (!adminSession) {

            window.location.replace(
                LOGIN_PAGE
            );

            return;

        }


        // -------------------------------------------------
        // If page was restored from browser cache,
        // force a fresh protection check.
        // -------------------------------------------------

        if (event.persisted) {

            window.location.reload();

        }

    }
);


// =====================================================
// HANDLE PAGE VISIBILITY
// =====================================================
//
// This does NOT log the admin out just because they
// switch tabs.
//
// It only checks that the session still exists.
//
// =====================================================

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            const adminSession =
                sessionStorage.getItem(
                    ADMIN_SESSION_KEY
                );


            if (!adminSession) {

                window.location.replace(
                    LOGIN_PAGE
                );

            }

        }

    }
);


// =====================================================
// PREVENT ACCIDENTAL DISPLAY IF SESSION DISAPPEARS
// =====================================================

window.addEventListener(
    "storage",
    function () {

        const adminSession =
            sessionStorage.getItem(
                ADMIN_SESSION_KEY
            );


        if (!adminSession) {

            window.location.replace(
                LOGIN_PAGE
            );

        }

    }
);


// =====================================================
// FUTURE BREVO OTP PLACEHOLDER
// =====================================================
//
// DO NOT ENABLE THIS YET.
//
// Later:
//
// login.js
//     ↓
// Brevo Email OTP
//     ↓
// Brevo Mobile OTP
//     ↓
// Both verified
//     ↓
// currentAdmin session marked verified
//     ↓
// admin-dashboard.html
//
// The dashboard will then additionally check:
//
//     adminOtpVerified
//
// For now this is intentionally NOT checked because
// you told me not to modify login.js.
//
// =====================================================


// =====================================================
// END OF ADMIN DASHBOARD
// =====================================================