
/* =========================================================
   SAHIMAAP — MANUFACTURER DASHBOARD
   ========================================================= */


/* =========================================================
   1. GET CURRENT MANUFACTURER SESSION
   ========================================================= */

function getCurrentManufacturer() {

    const stored =
        sessionStorage.getItem("currentManufacturer");

    if (!stored) {
        return null;
    }

    try {

        const manufacturer = JSON.parse(stored);

        if (
            !manufacturer ||
            typeof manufacturer !== "object"
        ) {
            return null;
        }

        return manufacturer;

    } catch (error) {

        console.error(
            "Invalid manufacturer session:",
            error
        );

        sessionStorage.removeItem(
            "currentManufacturer"
        );

        return null;
    }
}


/* =========================================================
   2. SAFE TEXT UPDATE
   ========================================================= */

function setText(elementId, value) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.textContent =
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
            ? value
            : "Not available";
}


/* =========================================================
   3. LOAD DASHBOARD
   ========================================================= */

async function loadManufacturerDashboard() {

    const manufacturer =
        getCurrentManufacturer();


    /* -----------------------------------------------------
       NO SESSION
       ----------------------------------------------------- */

    if (!manufacturer) {

        console.warn(
            "No manufacturer session found."
        );

        window.location.replace("login.html");

        return;
    }


    /* -----------------------------------------------------
       GET SESSION DATA
       ----------------------------------------------------- */

    const manufacturerId =
        manufacturer.id ||
        manufacturer.manufacturer_id ||
        "";

    const companyName =
        manufacturer.company_name ||
        manufacturer.name ||
        "Manufacturer";

    const username =
        manufacturer.username ||
        manufacturer.user_name ||
        manufacturer.user ||
        "Not available";

    const email =
        manufacturer.email ||
        "Not available";

    const mobile =
        manufacturer.mobile_number ||
        manufacturer.mobile ||
        manufacturer.phone ||
        "Not available";

    const accountStatus =
        manufacturer.account_status ||
        "Active";


    /* -----------------------------------------------------
       WELCOME
       ----------------------------------------------------- */

    setText(
        "company-name",
        companyName
    );


    /* -----------------------------------------------------
       PROFILE
       ----------------------------------------------------- */

    setText(
        "profile-company",
        companyName
    );

    setText(
        "profile-id",
        manufacturerId
    );

    setText(
        "profile-username",
        username
    );

    setText(
        "profile-email",
        email
    );

    setText(
        "profile-mobile",
        mobile
    );

    setText(
        "profile-status",
        accountStatus
    );


    /* -----------------------------------------------------
       LOAD COMPLETE DATA FROM SUPABASE
       ----------------------------------------------------- */

    if (
        manufacturerId &&
        typeof supabaseClient !== "undefined"
    ) {

        await loadManufacturerFromSupabase(
            manufacturerId
        );

    } else {

        console.warn(
            "Manufacturer ID or Supabase client unavailable."
        );
    }
}


/* =========================================================
   4. LOAD MANUFACTURER FROM SUPABASE
   ========================================================= */

async function loadManufacturerFromSupabase(
    manufacturerId
) {

    try {

        const {
            data,
            error
        } = await supabaseClient
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


        /* -------------------------------------------------
           SUPABASE ERROR
           ------------------------------------------------- */

        if (error) {

            console.error(
                "Manufacturer details error:",
                error
            );

            return;
        }


        /* -------------------------------------------------
           MANUFACTURER NOT FOUND
           ------------------------------------------------- */

        if (!data) {

            console.warn(
                "Manufacturer record not found in Supabase."
            );

            return;
        }


        /* -------------------------------------------------
           UPDATE PROFILE
           ------------------------------------------------- */

        setText(
            "profile-company",
            data.company_name
        );

        setText(
            "profile-id",
            data.id
        );

        setText(
            "profile-username",
            getCurrentManufacturer()?.username ||
            getCurrentManufacturer()?.user_name ||
            getCurrentManufacturer()?.user ||
            "Not available"
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
            "profile-status",
            data.account_status
        );


        /* -------------------------------------------------
           UPDATE REGISTRATION STATUS CARD
           ------------------------------------------------- */

        const statusTitle =
            document.getElementById(
                "registration-status-title"
            );

        const statusText =
            document.getElementById(
                "registration-status-text"
            );

        const statusCard =
            document.getElementById(
                "registration-status-card"
            );


        if (
            data.account_status &&
            String(data.account_status)
                .toLowerCase()
                .trim() === "active"
        ) {

            if (statusTitle) {

                statusTitle.textContent =
                    "Manufacturer Account Active";
            }

            if (statusText) {

                statusText.textContent =
                    "Your manufacturer account is currently active and available for authorised SahiMaap services.";
            }

        } else {

            if (statusTitle) {

                statusTitle.textContent =
                    "Manufacturer Account Status";
            }

            if (statusText) {

                statusText.textContent =
                    `Current account status: ${
                        data.account_status ||
                        "Not available"
                    }`;
            }

            if (statusCard) {

                statusCard.classList.add(
                    "status-warning"
                );
            }
        }


        console.log(
            "Manufacturer dashboard loaded:",
            data
        );

    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );
    }
}


/* =========================================================
   5. OPEN PRODUCTS
   ========================================================= */

function openProducts() {

    window.location.href =
        "products.html";
}



/* =========================================================
   6. COMING SOON MESSAGE
   ========================================================= */

function showComingSoon(feature) {

    const existing =
        document.querySelector(".dashboard-toast");

    if (existing) {
        existing.remove();
    }

    const toast =
        document.createElement("div");

    toast.className = "dashboard-toast";

    toast.textContent =
        `${feature} will be available here.`;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            if (toast.parentNode) {
                toast.remove();
            }

        }, 200);

    }, 2600);
}


/* =========================================================
   7. LOGOUT
   ========================================================= */

function logoutManufacturer() {

    // Remove the SAME session created after login/OTP.

    sessionStorage.removeItem(
        "currentManufacturer"
    );

    sessionStorage.removeItem(
        "loginRole"
    );

    // Return to the existing login page.

    window.location.replace(
        "login.html"
    );
}


/* =========================================================
   8. PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* -----------------------------------------------
           CHECK MANUFACTURER SESSION
           ----------------------------------------------- */

        const manufacturer =
            getCurrentManufacturer();

        /*
           If there is no valid manufacturer session,
           send the user to the existing login page.

           IMPORTANT:
           NEVER redirect back to the dashboard here.
        */

        if (!manufacturer) {

            console.warn(
                "No manufacturer session found."
            );

            window.location.replace(
                "login.html"
            );

            return;
        }


        /* -----------------------------------------------
           LOAD MANUFACTURER DASHBOARD
           ----------------------------------------------- */

        loadManufacturerDashboard();


        /* -----------------------------------------------
           PRODUCTS BUTTON
           ----------------------------------------------- */

        const productsButton =
            document.getElementById(
                "products-button"
            );

        if (productsButton) {

            productsButton.addEventListener(
                "click",
                openProducts
            );
        }


        /* -----------------------------------------------
           LOGOUT BUTTON
           ----------------------------------------------- */

        const logoutButton =
            document.getElementById(
                "logout-button"
            );

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logoutManufacturer
            );
        }


        /* -----------------------------------------------
           COMING SOON CARDS
           ----------------------------------------------- */

        const comingSoonButtons =
            document.querySelectorAll(
                "[data-coming-soon]"
            );

        comingSoonButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        showComingSoon(
                            button.dataset.comingSoon
                        );

                    }
                );

            }
        );

    }
);

