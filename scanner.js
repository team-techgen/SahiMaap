
/* =========================================
   SAHIMAAP QR SCANNER
========================================= */

let scanner = null;
let scanned = false;


/* =========================================
   START SCANNER
========================================= */

function startScanner() {

    scanner = new Html5Qrcode("reader");

    const config = {
        fps: 10,

        qrbox: {
            width: 210,
            height: 210
        }
    };


    scanner.start(

        {
            facingMode: "environment"
        },

        config,

        onScanSuccess,

        onScanError

    ).catch(function (error) {

        console.error("Camera error:", error);

        document.getElementById("resultMessage").textContent =
            "Unable to access camera. Please allow camera permission and try again.";

    });
}


/* =========================================
   QR SUCCESS
========================================= */

function onScanSuccess(decodedText) {

    if (scanned) {
        return;
    }

    if (!decodedText || decodedText.trim() === "") {
        return;
    }


    scanned = true;


    /* Display scanned QR value */

    document.getElementById("resultMessage").textContent =
        decodedText;


    /* Stop camera */

    stopScanner();


    /* Start verification */

    verifyInstrument(decodedText.trim());
}


/* =========================================
   QR SCAN ERROR
========================================= */

function onScanError(errorMessage) {

    /*
        Ignore continuous scan errors.

        html5-qrcode calls this repeatedly while
        it is searching for a QR code.
    */

}


/* =========================================
   STOP SCANNER
========================================= */

function stopScanner() {

    if (!scanner) {
        return;
    }

    scanner.stop()
        .then(function () {

            console.log("Scanner stopped.");

        })
        .catch(function (error) {

            console.error(
                "Could not stop scanner:",
                error
            );

        });
}


/* =========================================
   VERIFY INSTRUMENT
========================================= */

async function verifyInstrument(instrumentUid) {

    const resultBox =
        document.getElementById("verificationResult");


    /* Loading state */

    resultBox.innerHTML = `

        <div class="verification-card">

            <div style="text-align:center;">

                <div style="
                    font-size:32px;
                    margin-bottom:10px;
                ">
                    ⟳
                </div>

                <div style="
                    color:#124d6b;
                    font-size:16px;
                    font-weight:600;
                ">
                    Verifying instrument...
                </div>

            </div>

        </div>

    `;


    try {

        /*
         * IMPORTANT:
         * These values must match the existing
         * SahiMaap Supabase project.
         */

        const supabaseUrl =
            "https://tceummqoawvmqqprzkpr.supabase.co";


        const supabaseAnonKey =
            "YOUR_SUPABASE_ANON_KEY";


        const response = await fetch(

            `${supabaseUrl}/rest/v1/rpc/verify_instrument_qr`,

            {

                method: "POST",

                headers: {

                    "apikey": supabaseAnonKey,

                    "Authorization":
                        `Bearer ${supabaseAnonKey}`,

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    p_instrument_uid:
                        instrumentUid

                })

            }

        );


        /* =================================
           RESPONSE
        ================================= */

        if (
            response.status >= 200 &&
            response.status < 300
        ) {

            const data = await response.json();


            const rows =
                Array.isArray(data)
                    ? data
                    : [data];


            if (
                rows.length > 0 &&
                typeof rows[0] === "object"
            ) {

                displayVerificationResult(
                    rows[0]
                );

            } else {

                showError(
                    "No verification data found."
                );

            }

        } else {

            showError(
                `Verification failed (${response.status}).`
            );

        }

    } catch (error) {

        console.error(error);

        showError(
            "Unable to verify instrument. Check internet connection."
        );

    }

}


/* =========================================
   DISPLAY RESULT
========================================= */

function displayVerificationResult(data) {

    const resultBox =
        document.getElementById("verificationResult");


    const status =
        text(data.result_status).toUpperCase();


    let statusClass = "";
    let icon = "⚠";
    let description =
        "The scanned instrument could not be verified.";


    if (status === "VERIFIED") {

        statusClass = "verified";

        icon = "✓";

        description =
            "This instrument has a valid verification certificate.";

    }

    else if (status === "EXPIRED") {

        statusClass = "expired";

        description =
            "The verification certificate has expired.";

    }

    else if (status === "NOT_VERIFIED") {

        statusClass = "not-verified";

        description =
            "This instrument does not have an approved verification certificate.";

    }


    let certificateHTML = "";


    /* =================================
       CERTIFICATE HEADER
    ================================= */

    if (status === "VERIFIED") {

        certificateHTML = `

            <div class="certificate-header">

                <div class="certificate-icon">
                    ✓
                </div>

                <div class="certificate-title">
                    LEGAL METROLOGY VERIFICATION CERTIFICATE
                </div>

            </div>

        `;

    }


    /* =================================
       CERTIFICATE DETAILS
    ================================= */

    certificateHTML += `

        <div class="certificate-details">

            ${certificateRow(
                "Certificate No.",
                data.certificate_no
            )}

            ${certificateRow(
                "Instrument ID",
                data.instrument_uid
            )}

            ${certificateRow(
                "Device Type",
                data.device_type
            )}

            ${certificateRow(
                "Instrument",
                data.instrument_name
            )}

            ${certificateRow(
                "Make",
                data.make
            )}

            ${certificateRow(
                "Model",
                data.model
            )}

            ${certificateRow(
                "Serial Number",
                data.serial_number
            )}

            ${certificateRow(
                "Manufacturer",
                data.manufacturer
            )}

            ${certificateRow(
                "Address",
                data.address
            )}

            ${certificateRow(
                "Year of Manufacture",
                data.year_of_manufacture
            )}

            ${certificateRow(
                "Verification Date",
                displayDate(data.verification_date)
            )}

            ${certificateRow(
                "Valid Up To",
                displayDate(data.valid_up_to)
            )}

            ${certificateRow(
                "Verified By",
                data.verified_by
            )}

        </div>

    `;


    /* =================================
       FINAL CARD
    ================================= */

    resultBox.innerHTML = `

        <div class="verification-card">

            <div class="status-row">

                <span class="status-icon">
                    ${icon}
                </span>

                <span
                    class="status-title"
                    style="color:${getStatusColor(status)}"
                >
                    ${getStatusTitle(status)}
                </span>

            </div>

            <p class="status-description">
                ${description}
            </p>

            ${certificateHTML}

        </div>

    `;


    /* Show Scan Again */

    document.getElementById("scanAgainBtn")
        .style.display = "block";
}


/* =========================================
   CERTIFICATE ROW
========================================= */

function certificateRow(label, value) {

    return `

        <div class="certificate-row">

            <div class="certificate-label">
                ${label}
            </div>

            <div class="certificate-value">
                ${text(value)}
            </div>

        </div>

    `;
}


/* =========================================
   TEXT HELPER
========================================= */

function text(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "-";
    }


    const result =
        String(value).trim();


    return result === ""
        ? "-"
        : result;
}


/* =========================================
   DATE FORMATTER
========================================= */

function displayDate(value) {

    if (!value) {
        return "-";
    }


    const textValue =
        String(value);


    if (textValue.length < 10) {
        return textValue;
    }


    const date =
        textValue.substring(0, 10);


    const parts =
        date.split("-");


    if (parts.length !== 3) {
        return date;
    }


    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}


/* =========================================
   STATUS TITLE
========================================= */

function getStatusTitle(status) {

    switch (status) {

        case "VERIFIED":
            return "VERIFIED";

        case "EXPIRED":
            return "EXPIRED";

        case "NOT_VERIFIED":
            return "NOT VERIFIED";

        default:
            return "INVALID";
    }
}


/* =========================================
   STATUS COLOR
========================================= */

function getStatusColor(status) {

    switch (status) {

        case "VERIFIED":
            return "#238B5A";

        case "EXPIRED":
            return "#D66A00";

        default:
            return "#C62828";
    }
}


/* =========================================
   ERROR
========================================= */

function showError(message) {

    document.getElementById(
        "verificationResult"
    ).innerHTML = `

        <div class="verification-card">

            <div class="status-row">

                <span
                    class="status-icon"
                    style="color:#C62828;"
                >
                    !
                </span>

                <span
                    class="status-title"
                    style="color:#C62828;"
                >
                    INVALID
                </span>

            </div>

            <p class="status-description">
                ${message}
            </p>

        </div>

    `;


    document.getElementById("scanAgainBtn")
        .style.display = "block";
}


/* =========================================
   SCAN AGAIN
========================================= */

function scanAgain() {

    scanned = false;


    document.getElementById(
        "verificationResult"
    ).innerHTML = "";


    document.getElementById(
        "resultMessage"
    ).textContent =
        "No QR code scanned yet.";


    document.getElementById(
        "scanAgainBtn"
    ).style.display = "none";


    startScanner();
}


/* =========================================
   BACK BUTTON
========================================= */

function goBack() {

    window.history.back();

}


/* =========================================
   START WHEN PAGE LOADS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        startScanner();

    }
);

