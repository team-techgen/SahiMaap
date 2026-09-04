// =====================================================
// LMO DASHBOARD
// =====================================================


// =====================================================
// GET LOGGED-IN LMO
// =====================================================

const currentLmoData =
    sessionStorage.getItem("currentLmo");


// =====================================================
// ACCESS GUARD
// =====================================================

if (!currentLmoData) {

    // User did not come through LMO login
    window.location.replace("login.html");

}


// =====================================================
// LOAD LMO DATA
// =====================================================

let lmoUser = null;

try {

    lmoUser =
        JSON.parse(currentLmoData);

}
catch (error) {

    console.error(
        "Invalid LMO session:",
        error
    );

    sessionStorage.removeItem(
        "currentLmo"
    );

    window.location.replace(
        "login.html"
    );

}


// =====================================================
// DISPLAY LMO INFORMATION
// =====================================================

if (lmoUser) {

    // -----------------------------
    // Welcome Name
    // -----------------------------

    const lmoName =
        document.getElementById("lmo-name");

    if (lmoName) {
        lmoName.textContent =
            lmoUser.name || "LMO Officer";
    }


    // -----------------------------
    // Profile Name
    // -----------------------------

    const profileName =
        document.getElementById("profile-name");

    if (profileName) {
        profileName.textContent =
            lmoUser.name || "—";
    }


    // -----------------------------
    // Email
    // -----------------------------

    const profileEmail =
        document.getElementById("profile-email");

    if (profileEmail) {
        profileEmail.textContent =
            lmoUser.email || "—";
    }


    // -----------------------------
    // LMO ID
    // -----------------------------

    const profileLmoId =
        document.getElementById("profile-lmo-id");

    if (profileLmoId) {
        profileLmoId.textContent =
            lmoUser.id || "—";
    }


    // -----------------------------
    // PIN
    // -----------------------------

    const profilePin =
        document.getElementById("profile-pin");

    if (profilePin) {
        profilePin.textContent =
            lmoUser.pin || "—";
    }


    // -----------------------------
    // Account Created
    // -----------------------------

    const profileCreatedAt =
        document.getElementById(
            "profile-created-at"
        );

    if (profileCreatedAt) {

        if (lmoUser.created_at) {

            const createdDate =
                new Date(
                    lmoUser.created_at
                );

            profileCreatedAt.textContent =
                createdDate.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

        }
        else {

            profileCreatedAt.textContent =
                "—";

        }

    }

}


// =====================================================
// ACCOUNT STATUS
// =====================================================

const accountStatus =
    document.getElementById(
        "account-status"
    );

if (accountStatus) {

    accountStatus.textContent =
        "Active";

}


// =====================================================
// OFFICER STATUS
// =====================================================

const officerStatus =
    document.getElementById(
        "officer-status"
    );

if (officerStatus) {

    officerStatus.textContent =
        "Active";

}


// =====================================================
// LOGOUT
// =====================================================

function logoutLmo() {

    sessionStorage.removeItem(
        "currentLmo"
    );

    sessionStorage.removeItem(
        "loginRole"
    );

    window.location.replace(
        "login.html"
    );

}


// =====================================================
// VIEW ASSIGNED INSTRUMENTS
// =====================================================

const viewInstrumentsBtn =
    document.getElementById(
        "view-instruments-btn"
    );

if (viewInstrumentsBtn) {

    viewInstrumentsBtn.addEventListener(
        "click",
        function () {

            alert(
                "Assigned instrument management will be available here."
            );

        }
    );

}


// =====================================================
// VERIFY INSTRUMENT
// =====================================================

const verifyInstrumentBtn =
    document.getElementById(
        "verify-instrument-btn"
    );

if (verifyInstrumentBtn) {

    verifyInstrumentBtn.addEventListener(
        "click",
        function () {

            alert(
                "Instrument verification will be available here."
            );

        }
    );

}


// =====================================================
// LOGOUT EVENT
// =====================================================

// If your header contains a logout button,
// these common IDs/classes will be detected.

const logoutButton =
    document.getElementById(
        "logout-btn"
    );

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logoutLmo
    );

}