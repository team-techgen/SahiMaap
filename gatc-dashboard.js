// =====================================================
// GATC DASHBOARD
// =====================================================


// =====================================================
// GET LOGGED-IN GATC
// =====================================================

const currentGatcData =
    sessionStorage.getItem("currentGatc");


// =====================================================
// ACCESS GUARD
// =====================================================

if (!currentGatcData) {

    window.location.replace("login.html");

}


// =====================================================
// LOAD GATC DATA
// =====================================================

let gatcUser = null;

try {

    gatcUser =
        JSON.parse(currentGatcData);

}
catch (error) {

    console.error(
        "Invalid GATC session:",
        error
    );

    sessionStorage.removeItem(
        "currentGatc"
    );

    window.location.replace(
        "login.html"
    );

}


// =====================================================
// DISPLAY GATC INFORMATION
// =====================================================

if (gatcUser) {


    // Welcome name

    const gatcName =
        document.getElementById("gatc-name");

    if (gatcName) {

        gatcName.textContent =
            gatcUser.name || "GATC Officer";

    }


    // Profile name

    const profileName =
        document.getElementById("profile-name");

    if (profileName) {

        profileName.textContent =
            gatcUser.name || "—";

    }


    // Email

    const profileEmail =
        document.getElementById("profile-email");

    if (profileEmail) {

        profileEmail.textContent =
            gatcUser.email || "—";

    }


    // GATC ID

    const profileGatcId =
        document.getElementById("profile-gatc-id");

    if (profileGatcId) {

        profileGatcId.textContent =
            gatcUser.id || "—";

    }


    // PIN

    const profilePin =
        document.getElementById("profile-pin");

    if (profilePin) {

        profilePin.textContent =
            gatcUser.pin || "—";

    }


    // Account created

    const profileCreatedAt =
        document.getElementById(
            "profile-created-at"
        );


    if (profileCreatedAt) {

        if (gatcUser.created_at) {

            const createdDate =
                new Date(
                    gatcUser.created_at
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
// TESTING STATUS
// =====================================================

const testingStatus =
    document.getElementById(
        "testing-status"
    );

if (testingStatus) {

    testingStatus.textContent =
        "Active";

}


// =====================================================
// LOGOUT
// =====================================================

function logoutGatc() {

    sessionStorage.removeItem(
        "currentGatc"
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
// TEST INSTRUMENT
// =====================================================

const testInstrumentBtn =
    document.getElementById(
        "test-instrument-btn"
    );

if (testInstrumentBtn) {

    testInstrumentBtn.addEventListener(
        "click",
        function () {

            alert(
                "Instrument testing will be available here."
            );

        }
    );

}


// =====================================================
// LOGOUT EVENT
// =====================================================

const logoutButton =
    document.getElementById(
        "logout-btn"
    );

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logoutGatc
    );

}