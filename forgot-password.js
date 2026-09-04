
/* =========================================================
   SUPABASE CONFIG
   ========================================================= */

const SUPABASE_URL =
    "https://tceummqoawvmqqprzkpr.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_HicetVAd_hjnMlJtsjgEmw_x5WTKFci";


/* =========================================================
   ENDPOINTS
   ========================================================= */

const MANUFACTURER_TABLE_URL =
    `${SUPABASE_URL}/rest/v1/manufacturers`;

const OTP_FUNCTION_URL =
    `${SUPABASE_URL}/functions/v1/send-otp`;


/* =========================================================
   ROLE
   ========================================================= */

const forgotPasswordRole =
    sessionStorage.getItem("forgotPasswordRole") || "manufacturer";


/* =========================================================
   CAPTCHA
   ========================================================= */

const CAPTCHA_CHARACTERS =
    "ABDEFGHKMNPQRT" +
    "abdefghkmnpqrt" +
    "0123456789" +
    "@$#";

let currentCaptcha = "";
let changeCaptcha = "";


/* =========================================================
   RECOVERY STATE
   ========================================================= */

let loginValue = "";
let currentOtpEmail = "";

let firstOtpVerified = false;
let secondOtpSent = false;
let secondOtpVerified = false;

let resendSeconds = 0;
let changeResendSeconds = 0;

let resendTimer = null;
let changeResendTimer = null;

let isProcessing = false;


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const adminLogin =
    document.getElementById("adminLogin");

const captchaInput =
    document.getElementById("captchaInput");

const captchaDisplay =
    document.getElementById("captchaDisplay");

const changeCaptchaInput =
    document.getElementById("changeCaptchaInput");

const changeCaptchaDisplay =
    document.getElementById("changeCaptchaDisplay");

const sendOtpBtn =
    document.getElementById("sendOtpBtn");

const verifyOtpBtn =
    document.getElementById("verifyOtpBtn");

const resendOtpBtn =
    document.getElementById("resendOtpBtn");

const resendTimerDisplay =
    document.getElementById("resendTimer");

const changeAdminBtn =
    document.getElementById("changeAdminBtn");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const changeOtpInput =
    document.getElementById("changeOtpInput");

const resendChangeOtpBtn =
    document.getElementById("resendChangeOtpBtn");

const changeResendTimerDisplay =
    document.getElementById("changeResendTimer");

const changeOtpSection =
    document.getElementById("changeOtpSection");

const newPassword =
    document.getElementById("newPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const maskedEmail =
    document.getElementById("maskedEmail");

const messageBox =
    document.getElementById("messageBox");


/* =========================================================
   STEP ELEMENTS
   ========================================================= */

const step1 =
    document.getElementById("step1");

const step2 =
    document.getElementById("step2");

const step3 =
    document.getElementById("step3");

const successStep =
    document.getElementById("successStep");


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    generateCaptcha();
    generateChangeCaptcha();
    setupPasswordToggles();

});


/* =========================================================
   CAPTCHA GENERATOR
   ========================================================= */

function generateCaptcha() {

    let generated = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                CAPTCHA_CHARACTERS.length
            );

        generated +=
            CAPTCHA_CHARACTERS[randomIndex];

    }

    currentCaptcha = generated;

    if (captchaDisplay) {

        captchaDisplay.textContent =
            currentCaptcha;

    }

    if (captchaInput) {

        captchaInput.value = "";

    }

}


/* =========================================================
   SECOND CAPTCHA GENERATOR
   ========================================================= */

function generateChangeCaptcha() {

    let generated = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                CAPTCHA_CHARACTERS.length
            );

        generated +=
            CAPTCHA_CHARACTERS[randomIndex];

    }

    changeCaptcha = generated;

    if (changeCaptchaDisplay) {

        changeCaptchaDisplay.textContent =
            changeCaptcha;

    }

    if (changeCaptchaInput) {

        changeCaptchaInput.value = "";

    }

}


/* =========================================================
   CAPTCHA REFRESH
   ========================================================= */

document
    .getElementById("refreshCaptcha")
    ?.addEventListener("click", () => {

        generateCaptcha();

    });


document
    .getElementById("refreshChangeCaptcha")
    ?.addEventListener("click", () => {

        generateChangeCaptcha();

    });


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(message, isError = false) {

    if (!messageBox) {
        return;
    }

    messageBox.textContent = message;

    messageBox.classList.remove(
        "success",
        "error"
    );

    messageBox.classList.add(
        isError ? "error" : "success"
    );

}


/* =========================================================
   BUTTON LOADING
   ========================================================= */

function setButtonLoading(
    button,
    loading,
    loadingText = "Processing..."
) {

    if (!button) {
        return;
    }

    const text =
        button.querySelector(".btn-text");

    const loader =
        button.querySelector(".btn-loader");

    button.disabled = loading;

    if (text) {
        text.hidden = loading;
    }

    if (loader) {

        loader.hidden = !loading;

        if (loading) {
            loader.textContent = loadingText;
        }

    }

}


/* =========================================================
   MASK EMAIL
   ========================================================= */

function maskEmail(email) {

    if (!email || !email.includes("@")) {
        return "";
    }

    const parts =
        email.split("@");

    const username =
        parts[0];

    const domain =
        parts.slice(1).join("@");

    if (username.length <= 2) {

        return (
            username.charAt(0) +
            "***@" +
            domain
        );

    }

    return (
        username.substring(0, 2) +
        "***@" +
        domain
    );

}


/* =========================================================
   STEP NAVIGATION
   ========================================================= */

function showStep(stepNumber) {

    step1.hidden = true;
    step2.hidden = true;
    step3.hidden = true;
    successStep.hidden = true;

    if (stepNumber === 1) {
        step1.hidden = false;
    }

    if (stepNumber === 2) {
        step2.hidden = false;
    }

    if (stepNumber === 3) {
        step3.hidden = false;
    }

    if (stepNumber === 4) {
        successStep.hidden = false;
    }

}


/* =========================================================
   FIND MANUFACTURER ACCOUNT
   =========================================================

   Manufacturer table:

   manufacturers

   Existing login flow already uses:

   username
   email
   password

   We use username OR email to find the account.
   ========================================================= */

async function getManufacturerRecovery(value) {

    const encodedValue =
        encodeURIComponent(value);

    const url =
        `${MANUFACTURER_TABLE_URL}` +
        `?select=id,company_name,manufacturer_type,contact_person,email,username,account_status,verification_status` +
        `&or=(username.eq.${encodedValue},email.eq.${encodedValue})` +
        `&limit=1`;


    const response =
        await fetch(url, {

            method: "GET",

            headers: {

                "apikey":
                    SUPABASE_ANON_KEY,

                "Authorization":
                    `Bearer ${SUPABASE_ANON_KEY}`,

                "Accept":
                    "application/json"

            }

        });


    if (!response.ok) {

        throw new Error(
            `Unable to access account database (${response.status}).`
        );

    }


    const data =
        await response.json();


    if (
        !Array.isArray(data) ||
        data.length === 0
    ) {

        return null;

    }


    return data[0];

}


/* =========================================================
   SEND REAL OTP
   ========================================================= */

async function sendRealOtp(email) {

    const response =
        await fetch(

            OTP_FUNCTION_URL,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    email: email,

                    action: "send"

                })

            }

        );


    let data;

    try {

        data =
            await response.json();

    } catch (_) {

        throw new Error(
            "OTP service returned an invalid response."
        );

    }


    if (
        !response.ok ||
        data.success !== true
    ) {

        throw new Error(
            data.message ||
            "Unable to send OTP."
        );

    }


    return data;

}


/* =========================================================
   VERIFY REAL OTP
   ========================================================= */

async function verifyRealOtp(
    email,
    otp
) {

    try {

        const response =
            await fetch(

                OTP_FUNCTION_URL,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        email: email,

                        otp: otp,

                        action: "verify"

                    })

                }

            );


        let data;

        try {

            data =
                await response.json();

        } catch (_) {

            return {

                success: false,

                message:
                    "Invalid OTP service response."

            };

        }


        if (
            !response.ok ||
            data.success !== true ||
            data.verified !== true
        ) {

            return {

                success: false,

                message:
                    data.message ||
                    "Invalid OTP."

            };

        }


        return {

            success: true,

            message:
                data.message ||
                "OTP verified successfully."

        };


    } catch (_) {

        return {

            success: false,

            message:
                "Unable to verify OTP."

        };

    }

}


/* =========================================================
   CHANGE MANUFACTURER PASSWORD
   =========================================================

   IMPORTANT:

   We update ONLY the password belonging to the
   manufacturer account we found.

   ========================================================= */

async function resetManufacturerPassword(
    manufacturerId,
    email,
    otp,
    password
) {
    const response = await fetch(
        OTP_FUNCTION_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "reset_password",
                email: email,
                otp: otp,
                manufacturerId: manufacturerId,
                newPassword: password
            })
        }
    );

    let data;

    try {
        data = await response.json();
    } catch (_) {
        throw new Error(
            "Password reset service returned an invalid response."
        );
    }

    if (
        !response.ok ||
        data.success !== true ||
        data.passwordChanged !== true
    ) {
        throw new Error(
            data.message ||
            "Unable to change password."
        );
    }

    return data;
}


/* =========================================================
   STEP 1
   SEND FIRST OTP
   ========================================================= */

sendOtpBtn?.addEventListener(

    "click",

    async () => {

        if (isProcessing) {
            return;
        }


        const value =
            adminLogin.value.trim();

        const enteredCaptcha =
            captchaInput.value.trim();


        /* -----------------------------------------
           USER ID / EMAIL
        ----------------------------------------- */

        if (!value) {

            showMessage(

                "Please enter your User ID or registered email.",

                true

            );

            adminLogin.focus();

            return;

        }


        /* -----------------------------------------
           CAPTCHA
        ----------------------------------------- */

        if (!enteredCaptcha) {

            showMessage(

                "Please enter the CAPTCHA.",

                true

            );

            captchaInput.focus();

            return;

        }


        if (
            enteredCaptcha.toLowerCase() !==
            currentCaptcha.toLowerCase()
        ) {

            showMessage(

                "Incorrect CAPTCHA. Please try again.",

                true

            );

            generateCaptcha();

            captchaInput.focus();

            return;

        }


        /* -----------------------------------------
           START PROCESS
        ----------------------------------------- */

        isProcessing = true;


        setButtonLoading(

            sendOtpBtn,

            true,

            "Checking..."

        );


        showMessage(
            "Checking account..."
        );


        try {

            /* -------------------------------------
               CHECK ROLE
            ------------------------------------- */

            if (forgotPasswordRole !== "manufacturer") {

                throw new Error(
                    "This account recovery role is not currently available."
                );

            }


            /* -------------------------------------
               FIND MANUFACTURER ACCOUNT
            ------------------------------------- */

            const account =
                await getManufacturerRecovery(value);


            if (!account) {

                showMessage(

                    "User ID or registered email does not exist.",

                    true

                );

                generateCaptcha();

                return;

            }


            /* -------------------------------------
               GET REGISTERED EMAIL
            ------------------------------------- */

            const emailValue =
                account.email ??
                account.email_id ??
                account.emailId ??
                "";


            currentOtpEmail =
                String(emailValue).trim();


            if (!currentOtpEmail) {

                showMessage(

                    "No registered email address was found.",

                    true

                );

                return;

            }


            /* -------------------------------------
               STORE LOGIN VALUE
            ------------------------------------- */

            loginValue = value;


            /* -------------------------------------
               STORE MANUFACTURER ID
            ------------------------------------- */

            sessionStorage.setItem(
                "forgotManufacturerId",
                String(account.id)
            );


            /* -------------------------------------
               SEND FIRST OTP
            ------------------------------------- */

            showMessage(
                "Sending verification OTP..."
            );


            const result =
                await sendRealOtp(
                    currentOtpEmail
                );


            showMessage(

                result.message ||
                "OTP sent successfully."

            );


            if (maskedEmail) {

                maskedEmail.textContent =
                    `OTP sent to ${maskEmail(currentOtpEmail)}`;

            }


            /* -------------------------------------
               MOVE TO STEP 2
            ------------------------------------- */

            firstOtpVerified = false;


            const otpInput =
                document.getElementById("otpInput");


            if (otpInput) {

                otpInput.value = "";

            }


            showStep(2);

            startResendTimer();


           const otpBoxes =
    document.getElementById("otpBoxes");

if (otpBoxes && otpBoxes.focusFirst) {
    otpBoxes.focusFirst();
}

        } catch (error) {

            showMessage(

                error.message ||
                "Unable to process your request.",

                true

            );

            generateCaptcha();


        } finally {

            isProcessing = false;

            setButtonLoading(

                sendOtpBtn,

                false

            );

        }

    }

);


/* =========================================================
   STEP 2
   VERIFY FIRST OTP
   ========================================================= */

verifyOtpBtn?.addEventListener(

    "click",

    async () => {

        if (isProcessing) {
            return;
        }


        const otpInput =
            document.getElementById("otpInput");


        const otp =
            otpInput
                ? otpInput.value.trim()
                : "";


        if (!otp) {

            showMessage(

                "Please enter the OTP.",

                true

            );

            return;

        }


        if (!/^\d{6}$/.test(otp)) {

            showMessage(

                "Please enter the complete 6-digit OTP.",

                true

            );

            return;

        }


        if (!currentOtpEmail) {

            showMessage(

                "OTP session not found. Please start again.",

                true

            );

            return;

        }


        isProcessing = true;


        setButtonLoading(

            verifyOtpBtn,

            true,

            "Verifying..."

        );


        showMessage(
            "Verifying OTP..."
        );


        try {

            const result =
                await verifyRealOtp(

                    currentOtpEmail,

                    otp

                );


            if (!result.success) {

                showMessage(

                    result.message ||
                    "Invalid OTP.",

                    true

                );

                return;

            }


            firstOtpVerified = true;


            showMessage(
                "OTP verified successfully."
            );


            showStep(3);


            generateChangeCaptcha();


            newPassword.focus();


        } catch (error) {

            showMessage(

                error.message ||
                "Unable to verify OTP.",

                true

            );

        } finally {

            isProcessing = false;


            setButtonLoading(

                verifyOtpBtn,

                false

            );

        }

    }

);


/* =========================================================
   RESEND FIRST OTP
   ========================================================= */

resendOtpBtn?.addEventListener(

    "click",

    async () => {

        if (
            resendSeconds > 0 ||
            isProcessing ||
            !currentOtpEmail
        ) {

            return;

        }


        isProcessing = true;

        resendOtpBtn.disabled = true;


        showMessage(
            "Sending a new OTP..."
        );


        try {

            const result =
                await sendRealOtp(
                    currentOtpEmail
                );


            const otpInput =
                document.getElementById("otpInput");


            if (otpInput) {

                otpInput.value = "";

            }


            showMessage(

                result.message ||
                "A new OTP has been sent."

            );


            startResendTimer();


        } catch (error) {

            showMessage(

                error.message ||
                "Unable to resend OTP.",

                true

            );

        } finally {

            isProcessing = false;

        }

    }

);


/* =========================================================
   FIRST OTP TIMER
   ========================================================= */

function startResendTimer() {

    clearInterval(resendTimer);

    resendSeconds = 60;

    updateResendTimer();


    resendTimer =
        setInterval(

            () => {

                resendSeconds--;

                updateResendTimer();


                if (resendSeconds <= 0) {

                    clearInterval(
                        resendTimer
                    );

                    resendTimer = null;


                    if (resendOtpBtn) {

                        resendOtpBtn.disabled =
                            false;

                    }


                    if (resendTimerDisplay) {

                        resendTimerDisplay.textContent =
                            "";

                    }

                }

            },

            1000

        );

}


/* =========================================================
   UPDATE FIRST TIMER
   ========================================================= */

function updateResendTimer() {

    if (!resendTimerDisplay) {
        return;
    }


    if (resendSeconds > 0) {

        resendTimerDisplay.textContent =
            `Resend available in ${resendSeconds}s`;


        if (resendOtpBtn) {

            resendOtpBtn.disabled = true;

        }

    } else {

        resendTimerDisplay.textContent = "";


        if (resendOtpBtn) {

            resendOtpBtn.disabled = false;

        }

    }

}


/* =========================================================
   CHANGE USER ID
   ========================================================= */

changeAdminBtn?.addEventListener(

    "click",

    () => {

        clearInterval(resendTimer);

        clearInterval(changeResendTimer);


        loginValue = "";

        currentOtpEmail = "";

        firstOtpVerified = false;

        secondOtpSent = false;

        secondOtpVerified = false;


        sessionStorage.removeItem(
            "forgotManufacturerId"
        );


        const otpInput =
            document.getElementById("otpInput");


        if (otpInput) {

            otpInput.value = "";

        }


        adminLogin.focus();


        showStep(1);

        showMessage("");

        generateCaptcha();

    }

);


/* =========================================================
   STEP 3
   SEND SECOND OTP
   ========================================================= */

changePasswordBtn?.addEventListener(

    "click",

    async () => {

        if (isProcessing) {
            return;
        }


        /* -----------------------------------------
           SECOND OTP ALREADY SENT?
        ----------------------------------------- */

        if (secondOtpSent) {

            await verifySecondOtp();

            return;

        }


        /* -----------------------------------------
           FIRST OTP MUST BE VERIFIED
        ----------------------------------------- */

        if (!firstOtpVerified) {

            showMessage(

                "Please verify the first OTP first.",

                true

            );

            showStep(2);

            return;

        }


        const password =
            newPassword.value;

        const confirm =
            confirmPassword.value;

        const enteredCaptcha =
            changeCaptchaInput.value.trim();


        /* -----------------------------------------
           PASSWORD
        ----------------------------------------- */

        if (!password) {

            showMessage(

                "Please enter a new password.",

                true

            );

            newPassword.focus();

            return;

        }


        if (password.length < 6) {

            showMessage(

                "New password must contain at least 6 characters.",

                true

            );

            newPassword.focus();

            return;

        }


        /* -----------------------------------------
           CONFIRM PASSWORD
        ----------------------------------------- */

        if (!confirm) {

            showMessage(

                "Confirm your new password.",

                true

            );

            confirmPassword.focus();

            return;

        }


        if (password !== confirm) {

            showMessage(

                "New password and confirmation password do not match.",

                true

            );

            confirmPassword.focus();

            return;

        }


        /* -----------------------------------------
           SECOND CAPTCHA
        ----------------------------------------- */

        if (!enteredCaptcha) {

            showMessage(

                "Enter the second CAPTCHA.",

                true

            );

            changeCaptchaInput.focus();

            return;

        }


        if (
            enteredCaptcha.toLowerCase() !==
            changeCaptcha.toLowerCase()
        ) {

            showMessage(

                "Incorrect CAPTCHA. Please try again.",

                true

            );

            generateChangeCaptcha();

            changeCaptchaInput.focus();

            return;

        }


        if (!currentOtpEmail) {

            showMessage(

                "Registered email was not found.",

                true

            );

            return;

        }


        /* -----------------------------------------
           SEND SECOND OTP
        ----------------------------------------- */

        isProcessing = true;


        setButtonLoading(

            changePasswordBtn,

            true,

            "Sending OTP..."

        );


        showMessage(
            "Sending verification OTP..."
        );


        try {

            const result =
                await sendRealOtp(
                    currentOtpEmail
                );


            secondOtpSent = true;

            secondOtpVerified = false;


            changeOtpInput.value = "";

            changeOtpSection.hidden = false;


            changePasswordBtn.querySelector(
                ".btn-text"
            ).textContent =
                "Verify OTP & Change Password";


            showMessage(

                result.message ||
                "Verification OTP sent."

            );


            startChangeResendTimer();

           const changeOtpBoxes =
    document.getElementById("changeOtpBoxes");

if (
    changeOtpBoxes &&
    changeOtpBoxes.focusFirst
) {
    changeOtpBoxes.focusFirst();
}


        } catch (error) {

            showMessage(

                error.message ||
                "Unable to send verification OTP.",

                true

            );

        } finally {

            isProcessing = false;


            setButtonLoading(

                changePasswordBtn,

                false

            );

        }

    }

);


/* =========================================================
   VERIFY SECOND OTP
   ========================================================= */

async function verifySecondOtp() {

    if (isProcessing) {
        return;
    }


    const otp =
        changeOtpInput.value.trim();


    if (!otp) {

        showMessage(

            "Please enter the verification OTP.",

            true

        );

        changeOtpInput.focus();

        return;

    }


    if (!/^\d{6}$/.test(otp)) {

        showMessage(

            "Please enter the complete 6-digit OTP.",

            true

        );

        return;

    }


    isProcessing = true;


    setButtonLoading(

        changePasswordBtn,

        true,

        "Verifying..."

    );


    showMessage(
        "Verifying OTP..."
    );


    try {

showMessage(
    "Verifying OTP and updating password..."
);


        /* -----------------------------------------
           GET SAVED MANUFACTURER ID
        ----------------------------------------- */

        const manufacturerId =
            sessionStorage.getItem(
                "forgotManufacturerId"
            );


        if (!manufacturerId) {

            throw new Error(
                "Manufacturer recovery session not found."
            );

        }


        /* -----------------------------------------
           CHANGE PASSWORD
        ----------------------------------------- */

        const password =
            newPassword.value;


        const result =
    await resetManufacturerPassword(
        manufacturerId,
        currentOtpEmail,
        otp,
        password
    );

secondOtpVerified = true;

        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        clearInterval(resendTimer);

        clearInterval(changeResendTimer);


        sessionStorage.removeItem(
            "forgotManufacturerId"
        );


        showStep(4);


        showMessage(

            "Your password has been changed successfully."

        );


    } catch (error) {

        showMessage(

            error.message ||
            "Unable to change password.",

            true

        );

    } finally {

        isProcessing = false;


        setButtonLoading(

            changePasswordBtn,

            false

        );

    }

}


/* =========================================================
   RESEND SECOND OTP
   ========================================================= */

resendChangeOtpBtn?.addEventListener(

    "click",

    async () => {

        if (
            changeResendSeconds > 0 ||
            isProcessing ||
            !currentOtpEmail
        ) {

            return;

        }


        isProcessing = true;

        resendChangeOtpBtn.disabled = true;


        showMessage(
            "Sending a new verification OTP..."
        );


        try {

            const result =
                await sendRealOtp(
                    currentOtpEmail
                );


            changeOtpInput.value = "";


            showMessage(

                result.message ||
                "A new verification OTP has been sent."

            );


            startChangeResendTimer();


        } catch (error) {

            showMessage(

                error.message ||
                "Unable to resend OTP.",

                true

            );

        } finally {

            isProcessing = false;

        }

    }

);


/* =========================================================
   SECOND OTP TIMER
   ========================================================= */

function startChangeResendTimer() {

    clearInterval(changeResendTimer);

    changeResendSeconds = 60;

    updateChangeResendTimer();


    changeResendTimer =
        setInterval(

            () => {

                changeResendSeconds--;

                updateChangeResendTimer();


                if (
                    changeResendSeconds <= 0
                ) {

                    clearInterval(
                        changeResendTimer
                    );

                    changeResendTimer = null;


                    if (resendChangeOtpBtn) {

                        resendChangeOtpBtn.disabled =
                            false;

                    }


                    if (changeResendTimerDisplay) {

                        changeResendTimerDisplay.textContent =
                            "";

                    }

                }

            },

            1000

        );

}


/* =========================================================
   UPDATE SECOND TIMER
   ========================================================= */

function updateChangeResendTimer() {

    if (!changeResendTimerDisplay) {
        return;
    }


    if (changeResendSeconds > 0) {

        changeResendTimerDisplay.textContent =
            `Resend available in ${changeResendSeconds}s`;


        if (resendChangeOtpBtn) {

            resendChangeOtpBtn.disabled = true;

        }

    } else {

        changeResendTimerDisplay.textContent =
            "";


        if (resendChangeOtpBtn) {

            resendChangeOtpBtn.disabled = false;

        }

    }

}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function setupPasswordToggles() {

    const toggleButtons =
        document.querySelectorAll(
            ".password-toggle"
        );


    toggleButtons.forEach(

        button => {

            button.addEventListener(

                "click",

                () => {

                    const targetId =
                        button.dataset.target;


                    const input =
                        document.getElementById(
                            targetId
                        );


                    if (!input) {
                        return;
                    }


                    if (
                        input.type ===
                        "password"
                    ) {

                        input.type =
                            "text";


                        button.setAttribute(
                            "aria-label",
                            "Hide password"
                        );

                    } else {

                        input.type =
                            "password";


                        button.setAttribute(
                            "aria-label",
                            "Show password"
                        );

                    }

                }

            );

        }

    );

}


/* =========================================================
   ENTER KEY SUPPORT
   ========================================================= */

adminLogin?.addEventListener(

    "keydown",

    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendOtpBtn.click();

        }

    }

);


captchaInput?.addEventListener(

    "keydown",

    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendOtpBtn.click();

        }

    }

);


document.getElementById(
    "otpInput"
)?.addEventListener(

    "keydown",

    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            verifyOtpBtn.click();

        }

    }

);


changeOtpInput?.addEventListener(

    "keydown",

    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            changePasswordBtn.click();

        }

    }

);


/* =========================================================
   CLEANUP
   ========================================================= */

window.addEventListener(

    "beforeunload",

    () => {

        clearInterval(resendTimer);

        clearInterval(changeResendTimer);

    }

);

/* =========================================================
   OTP BOXES
   Connects the 6 OTP boxes to the existing hidden inputs
========================================================= */

function setupOtpBoxes(boxContainerId, hiddenInputId) {

    const container =
        document.getElementById(boxContainerId);

    const hiddenInput =
        document.getElementById(hiddenInputId);

    if (!container || !hiddenInput) {
        return;
    }

    const boxes =
        container.querySelectorAll(".otp-box");

    function syncOtp() {

        let otp = "";

        boxes.forEach(box => {
            otp += box.value;
        });

        hiddenInput.value = otp;
    }

    boxes.forEach((box, index) => {

        box.addEventListener("input", () => {

            /* Allow numbers only */
            box.value =
                box.value.replace(/\D/g, "");

            if (box.value && index < boxes.length - 1) {
                boxes[index + 1].focus();
            }

            syncOtp();
        });

        box.addEventListener("keydown", event => {

            /* Backspace */
            if (
                event.key === "Backspace" &&
                !box.value &&
                index > 0
            ) {
                boxes[index - 1].focus();
            }

            /* Left arrow */
            if (
                event.key === "ArrowLeft" &&
                index > 0
            ) {
                event.preventDefault();
                boxes[index - 1].focus();
            }

            /* Right arrow */
            if (
                event.key === "ArrowRight" &&
                index < boxes.length - 1
            ) {
                event.preventDefault();
                boxes[index + 1].focus();
            }

            /* Enter */
            if (event.key === "Enter") {
                event.preventDefault();

                if (hiddenInputId === "otpInput") {
                    verifyOtpBtn?.click();
                } else {
                    changePasswordBtn?.click();
                }
            }

        });

        /* Paste complete OTP */
        box.addEventListener("paste", event => {

            event.preventDefault();

            const pasted =
                (event.clipboardData ||
                 window.clipboardData)
                    .getData("text")
                    .replace(/\D/g, "")
                    .slice(0, 6);

            if (!pasted) {
                return;
            }

            pasted
                .split("")
                .forEach((digit, i) => {
                    if (boxes[i]) {
                        boxes[i].value = digit;
                    }
                });

            syncOtp();

            const nextIndex =
                Math.min(
                    pasted.length,
                    boxes.length - 1
                );

            boxes[nextIndex].focus();
        });

    });

    /* Helper functions */
    container.clearOtp = function () {

        boxes.forEach(box => {
            box.value = "";
        });

        hiddenInput.value = "";
    };

    container.focusFirst = function () {
        if (boxes.length > 0) {
            boxes[0].focus();
        }
    };

    container.syncOtp = syncOtp;
}


/* =========================================================
   INITIALIZE OTP BOXES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupOtpBoxes(
        "otpBoxes",
        "otpInput"
    );

    setupOtpBoxes(
        "changeOtpBoxes",
        "changeOtpInput"
    );

});