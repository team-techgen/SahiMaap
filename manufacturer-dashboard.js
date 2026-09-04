/* =========================================================
   SAHIMAAP - MANUFACTURER DASHBOARD
   ========================================================= */


/* =========================================================
   1. CHECK MANUFACTURER LOGIN SESSION
   ========================================================= */

const manufacturerSession =
    sessionStorage.getItem("currentManufacturer");


// If there is no Manufacturer login session,
// do NOT allow direct access to the dashboard.
if (!manufacturerSession) {

    window.location.replace("login.html");

} else {

    // Session exists, so continue loading dashboard.
    initializeManufacturerDashboard();

}


/* =========================================================
   2. INITIALIZE DASHBOARD
   ========================================================= */

async function initializeManufacturerDashboard() {

    let manufacturer;

    try {

        manufacturer = JSON.parse(manufacturerSession);

    } catch (error) {

        console.error(
            "Invalid manufacturer session:",
            error
        );

        sessionStorage.removeItem("currentManufacturer");

        window.location.replace("login.html");

        return;
    }


    // Make sure the session actually contains an ID.
    if (!manufacturer.id) {

        sessionStorage.removeItem("currentManufacturer");

        window.location.replace("login.html");

        return;
    }


    // Show the information already available
    // from the login session immediately.
    displaySessionInformation(manufacturer);


    // Fetch the complete manufacturer information.
    await loadManufacturerDetails(manufacturer.id);

}


/* =========================================================
   3. DISPLAY SESSION INFORMATION
   ========================================================= */

function displaySessionInformation(manufacturer) {

    const companyName =
        manufacturer.company_name || "Manufacturer";


    const welcomeName =
        document.getElementById(
            "manufacturer-company-name"
        );

    if (welcomeName) {
        welcomeName.textContent = companyName;
    }


    const profileCompany =
        document.getElementById(
            "profile-company-name"
        );

    if (profileCompany) {
        profileCompany.textContent = companyName;
    }


    const manufacturerType =
        document.getElementById(
            "profile-manufacturer-type"
        );

    if (manufacturerType) {
        manufacturerType.textContent =
            manufacturer.manufacturer_type || "—";
    }


    const contactPerson =
        document.getElementById(
            "profile-contact-person"
        );

    if (contactPerson) {
        contactPerson.textContent =
            manufacturer.contact_person || "—";
    }


    const email =
        document.getElementById(
            "profile-email"
        );

    if (email) {
        email.textContent =
            manufacturer.email || "—";
    }


    updateStatus(
        "account-status",
        manufacturer.account_status
    );


    updateStatus(
        "verification-status",
        manufacturer.verification_status
    );

}


/* =========================================================
   4. LOAD COMPLETE MANUFACTURER DETAILS
   ========================================================= */

async function loadManufacturerDetails(manufacturerId) {

    try {

        if (
            typeof supabaseClient ===
            "undefined"
        ) {

            throw new Error(
                "Supabase is not configured."
            );
        }


        const { data, error } =
            await supabaseClient
                .from("manufacturers")
                .select(`
                    id,
                    company_name,
                    manufacturer_type,
                    contact_person,
                    email,
                    manufacturing_license,
                    gstin,
                    instrument_category,
                    business_address,
                    state,
                    district,
                    pin_code,
                    mobile_number,
                    account_status,
                    verification_status
                `)
                .eq("id", manufacturerId)
                .maybeSingle();


        if (error) {

            console.error(
                "Manufacturer details error:",
                error
            );

            showDashboardError(
                "Unable to load manufacturer information."
            );

            return;
        }


        if (!data) {

            console.error(
                "Manufacturer record not found."
            );

            sessionStorage.removeItem(
                "currentManufacturer"
            );

            window.location.replace("login.html");

            return;
        }


        // Update dashboard with complete information.
        displayManufacturerDetails(data);


        // Load instrument overview.
        await loadInstrumentOverview(
            manufacturerId
        );


    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

        showDashboardError(
            "Unable to load dashboard information."
        );

    }

}


/* =========================================================
   5. DISPLAY COMPLETE PROFILE
   ========================================================= */

function displayManufacturerDetails(data) {

    setText(
        "profile-company-name",
        data.company_name
    );


    setText(
        "profile-manufacturer-type",
        data.manufacturer_type
    );


    setText(
        "profile-contact-person",
        data.contact_person
    );


    setText(
        "profile-email",
        data.email
    );


    setText(
        "profile-mobile",
        data.mobile_number
    );


    setText(
        "profile-license",
        data.manufacturing_license
    );


    setText(
        "profile-gstin",
        data.gstin
    );


    setText(
        "profile-category",
        data.instrument_category
    );


    // Build the complete business address.
    const addressParts = [
        data.business_address,
        data.district,
        data.state,
        data.pin_code
    ].filter(Boolean);


    setText(
        "profile-address",
        addressParts.length
            ? addressParts.join(", ")
            : "—"
    );


    updateStatus(
        "account-status",
        data.account_status
    );


    updateStatus(
        "verification-status",
        data.verification_status
    );

}


/* =========================================================
   6. SAFE TEXT UPDATE
   ========================================================= */

function setText(elementId, value) {

    const element =
        document.getElementById(elementId);


    if (!element) {
        return;
    }


    element.textContent =
        value || "—";

}


/* =========================================================
   7. STATUS BADGE
   ========================================================= */

function updateStatus(elementId, status) {

    const element =
        document.getElementById(elementId);


    if (!element) {
        return;
    }


    element.textContent =
        status || "—";


    // Remove previous status classes.
    element.classList.remove(
        "status-approved",
        "status-pending",
        "status-active",
        "status-blocked",
        "status-suspended",
        "status-inactive"
    );


    if (!status) {
        return;
    }


    const normalizedStatus =
        String(status)
            .toLowerCase()
            .trim();


    element.classList.add(
        `status-${normalizedStatus}`
    );

}


/* =========================================================
   8. LOAD INSTRUMENT OVERVIEW
   ========================================================= */

async function loadInstrumentOverview(
    manufacturerId
) {

    /*
       IMPORTANT:

       The manufacturers table does NOT contain
       instrument records.

       So we do NOT invent a table name here.

       The four overview values remain 0 until
       the actual instrument table/schema is connected.
    */

    setText(
        "registered-count",
        "0"
    );

    setText(
        "verified-count",
        "0"
    );

    setText(
        "pending-count",
        "0"
    );

    setText(
        "expiring-count",
        "0"
    );

}


/* =========================================================
   9. DASHBOARD ERROR
   ========================================================= */

function showDashboardError(message) {

    const container =
        document.getElementById(
            "action-required-container"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-state-icon">
                !
            </div>

            <h3>
                Unable to Load Dashboard
            </h3>

            <p>
                ${message}
            </p>

        </div>

    `;

}


/* =========================================================
   10. LOGOUT
   ========================================================= */

function logoutManufacturer() {

    sessionStorage.removeItem(
        "currentManufacturer"
    );

    sessionStorage.removeItem(
        "loginRole"
    );


    window.location.replace(
        "login.html"
    );

}


/* =========================================================
   11. DASHBOARD BUTTONS
   ========================================================= */

const viewInstrumentsButton =
    document.getElementById(
        "view-instruments-btn"
    );


if (viewInstrumentsButton) {

    viewInstrumentsButton.addEventListener(
        "click",
        function () {

            /*
             * Instrument page will be connected
             * when that page is created.
             */

            console.log(
                "View Instruments clicked."
            );

        }
    );

}


const registerInstrumentButton =
    document.getElementById(
        "register-instrument-btn"
    );


if (registerInstrumentButton) {

    registerInstrumentButton.addEventListener(
        "click",
        function () {

            window.location.href = "instrument-registration.html";

            console.log(
                "Register Instrument clicked."
            );

        }
    );

}