// =====================================================
// ADMIN DASHBOARD
// =====================================================
//
// IMPORTANT:
//
// This page is accessible only when an admin has
// successfully completed the login process.
//
// The login page stores the admin information in:
//
//     sessionStorage
//
// This dashboard reads that information.
//
// IMPORTANT SECURITY BEHAVIOUR:
//
// 1. Direct access without login -> login page
// 2. Refresh -> logout + login page
// 3. Closing the browser/tab -> session disappears
// 4. Logout button -> logout + login page
//
// =====================================================


// =====================================================
// LOGIN PAGE
// =====================================================

const LOGIN_PAGE = "login.html";


// =====================================================
// CHECK HOW THIS PAGE WAS OPENED
// =====================================================

const navigationEntry =
    performance.getEntriesByType("navigation")[0];


// =====================================================
// REFRESH DETECTION
// =====================================================
//
// If the dashboard was refreshed, immediately remove
// the current admin session.
//
// This gives the requested behaviour:
//
// Dashboard → Refresh → Logout
//
// =====================================================

if (
    navigationEntry &&
    navigationEntry.type === "reload"
) {

    sessionStorage.removeItem(
        "currentAdmin"
    );

    sessionStorage.removeItem(
        "adminLoggedIn"
    );

    window.location.replace(
        LOGIN_PAGE
    );

}


// =====================================================
// GET LOGGED-IN ADMIN
// =====================================================

const storedAdmin =
    sessionStorage.getItem(
        "currentAdmin"
    );


// =====================================================
// PROTECTION
// =====================================================
//
// If there is no logged-in admin:
//
// /admin-dashboard.html
//
// becomes:
//
// /login.html
//
// =====================================================

if (!storedAdmin) {

    window.location.replace(
        LOGIN_PAGE
    );

}


// =====================================================
// PARSE ADMIN DATA
// =====================================================

let admin = null;


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

    sessionStorage.removeItem(
        "currentAdmin"
    );

    sessionStorage.removeItem(
        "adminLoggedIn"
    );

    window.location.replace(
        LOGIN_PAGE
    );

}


// =====================================================
// IF ADMIN DATA IS INVALID
// =====================================================

if (!admin) {

    window.location.replace(
        LOGIN_PAGE
    );

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
        value === ""
    ) {

        return "Not available";

    }

    return String(value);

}


// =====================================================
// LOAD DYNAMIC ADMIN DATA
// =====================================================
//
// These values come from the Supabase admin record
// that was returned during login.
//
// Therefore:
//
// Shamanta logs in
//     → Shamanta's data
//
// Tanwisha logs in
//     → Tanwisha's data
//
// Trishani logs in
//     → Trishani's data
//
// etc.
//
// =====================================================

if (adminName) {

    adminName.textContent =
        displayValue(
            admin.name ||
            admin.user_name
        );

}


if (adminFullName) {

    adminFullName.textContent =
        displayValue(
            admin.name
        );

}


if (adminUsername) {

    adminUsername.textContent =
        displayValue(
            admin.user_name
        );

}


if (adminEmail) {

    adminEmail.textContent =
        displayValue(
            admin.email_id
        );

}


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

    // Remove admin information
    sessionStorage.removeItem(
        "currentAdmin"
    );


    // Remove login flag
    sessionStorage.removeItem(
        "adminLoggedIn"
    );


    // Redirect to login
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
        logoutAdmin
    );

}


// =====================================================
// HANDLE BACK/FORWARD CACHE
// =====================================================
//
// This is important on mobile browsers.
//
// If the browser restores the dashboard from its
// back/forward cache, check the session again.
//
// =====================================================

window.addEventListener(
    "pageshow",
    event => {

        const adminSession =
            sessionStorage.getItem(
                "currentAdmin"
            );


        if (!adminSession) {

            window.location.replace(
                LOGIN_PAGE
            );

        }

    }
);