// =====================================================
// ELEMENTS
// =====================================================

const menuButton =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");

const roleOptions =
    document.querySelectorAll(".role-option");

const loginHeader =
    document.querySelector(".login-header");

const loginForm =
    document.getElementById("loginForm");

const otpSection =
    document.getElementById("otpSection");

const roleSelector =
    document.querySelector(".role-selector");

const loginTitle =
    document.getElementById("loginTitle");

const loginSubtitle =
    document.getElementById("loginSubtitle");

const idLabel =
    document.getElementById("idLabel");

const userId =
    document.getElementById("userId");

const password =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const loginMessage =
    document.getElementById("loginMessage");

const roleIconContainer =
    document.getElementById("roleIconContainer");


// =====================================================
// CAPTCHA
// =====================================================

const captchaCode =
    document.getElementById("captchaCode");

const captchaInput =
    document.getElementById("captchaInput");

const refreshCaptcha =
    document.getElementById("refreshCaptcha");

const captchaMessage =
    document.getElementById("captchaMessage");


// =====================================================
// OTP
// =====================================================

const otpBoxes =
    document.querySelectorAll(".otp-box");

const otpMessage =
    document.getElementById("otpMessage");

const otpContact =
    document.getElementById("otpContact");

const otpTimer =
    document.getElementById("otpTimer");

const verifyOtp =
    document.getElementById("verifyOtp");

const resendOtp =
    document.getElementById("resendOtp");

const editLogin =
    document.getElementById("editLogin");


// =====================================================
// SUPABASE OTP FUNCTION
// =====================================================

const OTP_FUNCTION_URL =
    "https://tceummqoawvmqqprzkpr.supabase.co/functions/v1/send-otp";


// =====================================================
// OTP STATE
// =====================================================

let currentChallengeId = null;

let currentOtpEmail = "";


// =====================================================
// STORE LOGGED-IN ADMIN
// =====================================================

let currentAdmin = null;


// =====================================================
// MOBILE MENU
// =====================================================

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle(
            "mobile-active"
        );

    });

}


// =====================================================
// ROLE ICONS
// =====================================================

const roleIcons = {

    owner: `
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle
                cx="12"
                cy="8"
                r="3.5"
            ></circle>

            <path
                d="M5 20c.7-3.4 3.2-5.2 7-5.2s6.3 1.8 7 5.2"
            ></path>
        </svg>
    `,

    manufacturer: `
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M3 21h18"></path>
            <path d="M4 21V10l6 3V9l5 3V5l5 2v14"></path>
            <path d="M8 17v4"></path>
            <path d="M12 16v5"></path>
            <path d="M16 17v4"></path>
        </svg>
    `,

    gatc: `
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M4 21V5.5L12 3l8 2.5V21"></path>
            <path d="M3 21h18"></path>
            <path d="M7 9v8"></path>
            <path d="M10 9v8"></path>
            <path d="M14 9v8"></path>
            <path d="M17 9v8"></path>
            <path d="M6 7h12"></path>
        </svg>
    `,

    lmo: `
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <rect
                x="4"
                y="5"
                width="16"
                height="15"
                rx="2"
            ></rect>

            <circle
                cx="9"
                cy="10"
                r="2"
            ></circle>

            <path
                d="M6.5 16c.5-1.5 1.3-2.2 2.5-2.2s2 .7 2.5 2.2"
            ></path>

            <path d="M13 9h4"></path>
            <path d="M13 12h4"></path>
            <path d="M13 15h3"></path>
        </svg>
    `,

    admin: `
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path
                d="M12 3l7 3v5c0 4.5-2.8 7.9-7 10-4.2-2.1-7-5.5-7-10V6l7-3z"
            ></path>

            <circle
                cx="12"
                cy="10"
                r="2"
            ></circle>

            <path
                d="M8.5 16c.7-1.7 1.8-2.5 3.5-2.5s2.8.8 3.5 2.5"
            ></path>
        </svg>
    `
};


// =====================================================
// OTP ICON
// =====================================================

const otpIcon = "🔐";


// =====================================================
// SET ROLE ICON
// =====================================================

function setRoleIcon(role) {

    if (!roleIconContainer) {
        return;
    }

    const icon =
        roleIcons[role];

    if (!icon) {
        return;
    }

    roleIconContainer.innerHTML =
        icon;
}


// =====================================================
// ROLE DATA
// =====================================================

const roleData = {

    owner: {

        title:
            "Instrument Owner Login",

        subtitle:
            "Login to manage your weighing and measuring instruments.",

        label:
            "Username / Email",

        placeholder:
            "Enter your username or email"

    },

    manufacturer: {

        title:
            "Manufacturer Login",

        subtitle:
            "Login to manage instruments manufactured and registered with SahiMaap.",

        label:
            "Username / Email",

        placeholder:
            "Enter your username or email"

    },

    gatc: {

        title:
            "GATC Login",

        subtitle:
            "Login to manage verification activities and test centre records.",

        label:
            "GATC ID / Email",

        placeholder:
            "Enter your GATC ID or email"

    },

    lmo: {

        title:
            "LMO Login",

        subtitle:
            "Login to conduct and monitor Legal Metrology verification activities.",

        label:
            "LMO ID / Email",

        placeholder:
            "Enter your LMO ID or email"

    },

    admin: {

        title:
            "Admin Login",

        subtitle:
            "Login to manage and monitor the SahiMaap Legal Metrology platform.",

        label:
            "Admin ID / Email",

        placeholder:
            "Enter your admin ID or email"

    }

};


// =====================================================
// INITIAL ROLE
// =====================================================

setRoleIcon("owner");


// =====================================================
// ROLE SELECTION
// =====================================================

roleOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            roleOptions.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });

            option.classList.add(
                "active"
            );

            const role =
                option.dataset.role;

            const data =
                roleData[role];

            if (!data) {
                return;
            }

            setRoleIcon(role);

            if (loginTitle) {

                loginTitle.textContent =
                    data.title;

            }

            if (loginSubtitle) {

                loginSubtitle.textContent =
                    data.subtitle;

            }

            if (idLabel) {

                idLabel.textContent =
                    data.label;

            }

            if (userId) {

                userId.placeholder =
                    data.placeholder;

            }

            if (loginMessage) {

                loginMessage.textContent =
                    "";

            }

            if (captchaMessage) {

                captchaMessage.textContent =
                    "";

            }

            generateCaptcha();

        }
    );

});


// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

if (
    togglePassword &&
    password
) {

    togglePassword.addEventListener(
        "click",
        () => {

            if (
                password.type ===
                "password"
            ) {

                password.type =
                    "text";

                togglePassword.textContent =
                    "Hide";

            } else {

                password.type =
                    "password";

                togglePassword.textContent =
                    "Show";

            }

        }
    );

}


// =====================================================
// CAPTCHA
// =====================================================

const captchaCharacters =
    "ABDEFGHKMNPQTabdefghkmnpqrt0123456789@#";

let currentCaptcha = "";


function generateCaptcha() {

    if (!captchaCode) {
        return;
    }

    currentCaptcha = "";

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                captchaCharacters.length
            );

        currentCaptcha +=
            captchaCharacters[
                randomIndex
            ];

    }

    captchaCode.textContent =
        currentCaptcha;

    if (captchaInput) {

        captchaInput.value =
            "";

    }

    if (captchaMessage) {

        captchaMessage.textContent =
            "";

    }

}


generateCaptcha();


// =====================================================
// REFRESH CAPTCHA
// =====================================================

if (refreshCaptcha) {

    refreshCaptcha.addEventListener(
        "click",
        () => {

            generateCaptcha();

            if (captchaInput) {
                captchaInput.focus();
            }

        }
    );

}


// =====================================================
// CAPTCHA INPUT
// =====================================================

if (captchaInput) {

    captchaInput.addEventListener(
        "input",
        () => {

            captchaInput.value =
                captchaInput.value.trim();

            if (captchaMessage) {

                captchaMessage.textContent =
                    "";

            }

        }
    );

}


// =====================================================
// SUPABASE ADMIN LOGIN
// =====================================================

async function verifyAdminWithSupabase(
    enteredUserId,
    enteredPassword
) {

    try {

        if (
            typeof supabaseClient ===
            "undefined"
        ) {

            throw new Error(
                "Supabase is not configured."
            );

        }

        const {
            data,
            error
        } =
            await supabaseClient.rpc(
                "verify_admin_login",
                {
                    login_value:
                        enteredUserId,

                    password_value:
                        enteredPassword
                }
            );

        if (error) {

            console.error(
                "Supabase error:",
                error
            );

            throw new Error(
                "Unable to connect to the login database."
            );

        }

        if (
            !data ||
            data.length === 0
        ) {

            return null;

        }

        return data[0];

    }

    catch (error) {

        console.error(
            "Admin login error:",
            error
        );

        throw error;

    }

}

// =====================================================
// SUPABASE MANUFACTURER LOGIN
// =====================================================

async function verifyManufacturerWithSupabase(
    enteredUserId,
    enteredPassword
) {
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
                    username,
                    account_status,
                    verification_status
                `)
                .or(
                    `username.eq.${enteredUserId},email.eq.${enteredUserId}`
                )
                .eq(
                    "password",
                    enteredPassword
                )
                .maybeSingle();

        if (error) {
            console.error(
                "Manufacturer Supabase error:",
                error
            );

            throw new Error(
                "Unable to connect to the login database."
            );
        }

        if (!data) {
            return null;
        }

        return data;
    }
    catch (error) {
        console.error(
            "Manufacturer login error:",
            error
        );

        throw error;
    }
}
// =====================================================
// SEND REAL OTP
// =====================================================

async function sendRealOTP(email) {

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
                        email:
                            email,

                        action:
                            "send"
                    })
                }
            );

        let data;

        try {

            data =
                await response.json();

        }

        catch {

            throw new Error(
                "OTP service returned an invalid response."
            );

        }

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to send OTP."
            );

        }

        currentChallengeId =
            data.challengeId ||
            null;

        currentOtpEmail =
            email;

        return data;

    }

    catch (error) {

        console.error(
            "Send OTP error:",
            error
        );

        throw error;

    }

}


// =====================================================
// VERIFY REAL OTP
// =====================================================

async function verifyRealOTP(
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
                        email:
                            email,

                        otp:
                            otp,

                        action:
                            "verify"
                    })
                }
            );

        let data;

        try {

            data =
                await response.json();

        }

        catch {

            return {
                success: false,

                message:
                    "OTP service returned an invalid response."
            };

        }

        if (
            !response.ok ||
            !data.success ||
            !data.verified
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

    }

    catch (error) {

        console.error(
            "Verify OTP error:",
            error
        );

        return {
            success: false,

            message:
                "Unable to verify OTP. Please try again."
        };

    }

}


// =====================================================
// LOGIN → DATABASE → REAL OTP
// =====================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const enteredUserId =
                userId
                    ? userId.value.trim()
                    : "";

            const enteredPassword =
                password
                    ? password.value.trim()
                    : "";

            const enteredCaptcha =
                captchaInput
                    ? captchaInput.value.trim()
                    : "";


            // =================================================
            // USERNAME / EMAIL
            // =================================================

            if (!enteredUserId) {

                showLoginError(
                    "Please enter your username/email."
                );

                if (userId) {
                    userId.focus();
                }

                return;

            }


            // =================================================
            // PASSWORD
            // =================================================

            if (!enteredPassword) {

                showLoginError(
                    "Please enter your password."
                );

                if (password) {
                    password.focus();
                }

                return;

            }


            // =================================================
            // CAPTCHA
            // =================================================

            if (!enteredCaptcha) {

                showCaptchaError(
                    "Please enter the CAPTCHA."
                );

                if (captchaInput) {
                    captchaInput.focus();
                }

                return;

            }


            // =================================================
            // CAPTCHA VERIFICATION
            // =================================================

            if (
                enteredCaptcha.toLowerCase() !==
                currentCaptcha.toLowerCase()
            ) {

                showCaptchaError(
                    "Incorrect CAPTCHA. Please try again."
                );

                generateCaptcha();

                if (captchaInput) {
                    captchaInput.focus();
                }

                return;

            }


           // =================================================
// ROLE CHECK
// =================================================

const selectedRole =
    document.querySelector(
        ".role-option.active"
    );

const role =
    selectedRole
        ? selectedRole.dataset.role
        : "";

if (
    role !== "admin" &&
    role !== "manufacturer"
) {
    showLoginError(
        "This login is currently available for Admin and Manufacturer only."
    );
    return;
}


            // =================================================
            // SHOW DATABASE CHECKING
            // =================================================

            if (loginMessage) {

                loginMessage.textContent =
                    "Checking login details...";

                loginMessage.style.color =
                    "#087da3";

            }

            const loginButton =
                loginForm.querySelector(
                    'button[type="submit"]'
                );

            if (loginButton) {

                loginButton.disabled =
                    true;

                loginButton.textContent =
                    "Checking...";

            }


            // =================================================
// CHECK SUPABASE
// =================================================

let loginData = null;

try {

    if (role === "admin") {

        // Existing Admin login — DO NOT CHANGE
        loginData =
            await verifyAdminWithSupabase(
                enteredUserId,
                enteredPassword
            );

    }
    else if (role === "manufacturer") {

        // Manufacturer login — no RPC
        loginData =
            await verifyManufacturerWithSupabase(
                enteredUserId,
                enteredPassword
            );
    }

}
catch (error) {

    if (loginButton) {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }

    showLoginError(
        "Database connection failed. Please try again."
    );

    return;
}


// =================================================
// INVALID LOGIN
// =================================================

if (!loginData) {

    if (loginButton) {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }

    showLoginError(
        "Invalid username/email or password."
    );

    generateCaptcha();

    return;
}


           // =================================================
// FIND REGISTERED EMAIL
// =================================================

const loginEmail =
    role === "admin"
        ? (
            loginData.email_id ||
            loginData.email ||
            loginData.emailId ||
            ""
        )
        : (
            loginData.email ||
            ""
        );

if (!loginEmail) {

    if (loginButton) {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }

    showLoginError(
        role === "manufacturer"
            ? "No registered email address was found for this manufacturer."
            : "No registered email address was found for this admin."
    );

    return;
}


           // =================================================
// SAVE LOGIN DATA TEMPORARILY
// =================================================

if (role === "admin") {

    currentAdmin = loginData;

    sessionStorage.setItem(
        "currentAdmin",
        JSON.stringify(loginData)
    );

}
else if (role === "manufacturer") {

    sessionStorage.setItem(
        "currentManufacturer",
        JSON.stringify(loginData)
    );

}

sessionStorage.setItem(
    "loginRole",
    role
);


            // =================================================
            // SEND REAL OTP
            // =================================================

            if (loginMessage) {

                loginMessage.textContent =
                    "Sending verification OTP...";

                loginMessage.style.color =
                    "#087da3";

            }

            try {

                const otpResult =
                    await sendRealOTP(
                        loginEmail
                    );

                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Login";

                }


                // =================================================
                // CAPTCHA SUCCESS
                // =================================================

                if (captchaMessage) {

                    captchaMessage.textContent =
                        "CAPTCHA verified.";

                    captchaMessage.style.color =
                        "#2c8a5a";

                }


                // =================================================
                // OTP CONTACT
                // =================================================

                if (otpContact) {

                    otpContact.textContent =
                        "OTP sent to " +
                        maskEmail(loginEmail);

                }


                // =================================================
                // SWITCH TO OTP SCREEN
                // =================================================

                loginForm.style.display =
                    "none";

                if (roleSelector) {

                    roleSelector.style.display =
                        "none";

                }

                if (loginHeader) {

                    loginHeader.style.display =
                        "none";

                }

                if (otpSection) {

                    otpSection.style.display =
                        "block";

                    const otpIconContainer =
                        otpSection.querySelector(
                            ".admin-icon"
                        );

                    if (otpIconContainer) {

                        otpIconContainer.innerHTML =
                            otpIcon;

                    }

                }


                // =================================================
                // CLEAR OTP BOXES
                // =================================================

                otpBoxes.forEach(
                    box => {

                        box.value =
                            "";

                    }
                );


                // =================================================
                // OTP MESSAGE
                // =================================================

                if (otpMessage) {

                    otpMessage.textContent =
                        otpResult.message ||
                        "OTP sent successfully.";

                    otpMessage.style.color =
                        "#2c8a5a";

                }


                // =================================================
                // FOCUS OTP
                // =================================================

                if (
                    otpBoxes.length > 0
                ) {

                    otpBoxes[0].focus();

                }


                // =================================================
                // START 1-MINUTE RESEND TIMER
                // =================================================

                startTimer();

            }

            catch (error) {

                console.error(
                    "OTP sending failed:",
                    error
                );

                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Login";

                }

                showLoginError(
                    error.message ||
                    "Unable to send OTP. Please try again."
                );


               if (role === "admin") {

   sessionStorage.removeItem(
    "currentAdmin"
);

sessionStorage.removeItem(
    "currentManufacturer"
);

sessionStorage.removeItem(
    "loginRole"
);

currentAdmin = null;

}
else if (role === "manufacturer") {

    sessionStorage.removeItem(
        "currentManufacturer"
    );

}

sessionStorage.removeItem(
    "loginRole"
);

            }

        }
    );

}


// =====================================================
// MASK EMAIL
// =====================================================

function maskEmail(email) {

    if (!email) {
        return "";
    }

    const parts =
        email.split("@");

    if (
        parts.length !== 2
    ) {

        return email;

    }

    const name =
        parts[0];

    const domain =
        parts[1];

    if (
        name.length <= 2
    ) {

        return (
            name.charAt(0) +
            "***@" +
            domain
        );

    }

    return (
        name.substring(0, 2) +
        "***@" +
        domain
    );

}


// =====================================================
// ERROR HELPERS
// =====================================================

function showLoginError(
    message
) {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent =
        message;

    loginMessage.style.color =
        "#d9534f";

}


function showCaptchaError(
    message
) {

    if (!captchaMessage) {
        return;
    }

    captchaMessage.textContent =
        message;

    captchaMessage.style.color =
        "#d9534f";

}


// =====================================================
// OTP BOXES
// =====================================================

otpBoxes.forEach(
    (box, index) => {

        box.addEventListener(
            "input",
            () => {

                box.value =
                    box.value.replace(
                        /\D/g,
                        ""
                    );

                if (
                    box.value &&
                    index <
                    otpBoxes.length - 1
                ) {

                    otpBoxes[
                        index + 1
                    ].focus();

                }

            }
        );


        box.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Backspace" &&
                    !box.value &&
                    index > 0
                ) {

                    otpBoxes[
                        index - 1
                    ].focus();

                }

            }
        );


        box.addEventListener(
            "paste",
            event => {

                event.preventDefault();

                const pasted =
                    event.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, 6);

                pasted
                    .split("")
                    .forEach(
                        (digit, i) => {

                            if (
                                otpBoxes[i]
                            ) {

                                otpBoxes[i]
                                    .value =
                                    digit;

                            }

                        }
                    );

                if (
                    pasted.length > 0
                ) {

                    const focusIndex =
                        Math.min(
                            pasted.length,
                            otpBoxes.length - 1
                        );

                    otpBoxes[
                        focusIndex
                    ].focus();

                }

            }
        );

    }
);


// =====================================================
// OTP RESEND TIMER
// =====================================================
//
// IMPORTANT:
//
// Server OTP validity:
// 5 minutes
//
// Resend cooldown:
// 1 minute
//
// The OTP itself remains valid for 5 minutes.
// Only another OTP request is blocked for 1 minute.
// =====================================================

const RESEND_COOLDOWN =
    60;

let timeLeft =
    RESEND_COOLDOWN;

let timer =
    null;


// =====================================================
// START TIMER
// =====================================================

function startTimer() {

    clearInterval(timer);

    timeLeft =
        RESEND_COOLDOWN;


    updateTimerDisplay();


    timer =
        setInterval(
            () => {

                timeLeft--;


                updateTimerDisplay();


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timer
                    );

                    timer =
                        null;

                }

            },
            1000
        );

}


// =====================================================
// UPDATE TIMER DISPLAY
// =====================================================

function updateTimerDisplay() {

    if (!otpTimer) {
        return;
    }


    if (
        timeLeft > 0
    ) {

        otpTimer.textContent =
            "Resend OTP in " +
            formatTime(timeLeft);

        if (resendOtp) {

            resendOtp.disabled =
                true;

        }

    }

    else {

        otpTimer.textContent =
            "You can resend the OTP.";

        if (resendOtp) {

            resendOtp.disabled =
                false;

        }

    }

}


// =====================================================
// FORMAT TIMER
// =====================================================

function formatTime(seconds) {

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remainingSeconds =
        seconds % 60;


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


// =====================================================
// VERIFY OTP
// =====================================================

if (verifyOtp) {

    verifyOtp.addEventListener(
        "click",
        async () => {

            let enteredOtp =
                "";

            otpBoxes.forEach(
                box => {

                    enteredOtp +=
                        box.value;

                }
            );


            // =================================================
            // OTP LENGTH
            // =================================================

            if (
                enteredOtp.length !==
                6
            ) {

                if (otpMessage) {

                    otpMessage.textContent =
                        "Please enter the complete 6-digit OTP.";

                    otpMessage.style.color =
                        "#d9534f";

                }

                return;

            }


            // =================================================
            // CHECK EMAIL
            // =================================================

            if (!currentOtpEmail) {

                if (otpMessage) {

                    otpMessage.textContent =
                        "OTP session not found. Please login again.";

                    otpMessage.style.color =
                        "#d9534f";

                }

                return;

            }


            // =================================================
            // DISABLE VERIFY BUTTON
            // =================================================

            verifyOtp.disabled =
                true;

            verifyOtp.textContent =
                "Verifying...";


            // =================================================
            // VERIFY WITH SUPABASE
            // =================================================

            const result =
                await verifyRealOTP(
                    currentOtpEmail,
                    enteredOtp
                );


            // =================================================
            // RE-ENABLE VERIFY BUTTON
            // =================================================

            verifyOtp.disabled =
                false;

            verifyOtp.textContent =
                "Verify OTP";


            // =================================================
            // SUCCESS
            // =================================================

            if (
                result.success
            ) {

                showSuccessfulLogin();

                return;

            }


            // =================================================
            // INVALID / EXPIRED OTP
            // =================================================

            if (otpMessage) {

                otpMessage.textContent =
                    result.message ||
                    "Invalid OTP. Please try again.";

                otpMessage.style.color =
                    "#d9534f";

            }


            // Clear OTP
            otpBoxes.forEach(
                box => {

                    box.value =
                        "";

                }
            );


            if (
                otpBoxes.length > 0
            ) {

                otpBoxes[0].focus();

            }

        }
    );

}


// =====================================================
// SUCCESSFUL LOGIN
// =====================================================

function showSuccessfulLogin() {

    clearInterval(timer);
    timer = null;

    if (otpMessage) {
        otpMessage.textContent =
            "Login successful!";

        otpMessage.style.color =
            "#2c8a5a";
    }

    const loginRole =
        sessionStorage.getItem(
            "loginRole"
        );
    

    // =================================================
    // ADMIN SESSION
    // =================================================

    if (loginRole === "admin") {

        if (
            !sessionStorage.getItem(
                "currentAdmin"
            )
        ) {
            if (otpMessage) {
                otpMessage.textContent =
                    "Login session could not be created.";

                otpMessage.style.color =
                    "#d9534f";
            }

            return;
        }

        setTimeout(() => {

            window.location.replace(
                "admin-dashboard.html"
            );

        }, 500);

        return;
    }


    // =================================================
    // MANUFACTURER SESSION
    // =================================================

    if (
        loginRole ===
        "manufacturer"
    ) {

        if (
            !sessionStorage.getItem(
                "currentManufacturer"
            )
        ) {
            if (otpMessage) {
                otpMessage.textContent =
                    "Login session could not be created.";

                otpMessage.style.color =
                    "#d9534f";
            }

            return;
        }

        setTimeout(() => {

            // CHANGE THIS FILE NAME IF
            // YOUR TEAM HAS A DIFFERENT
            // MANUFACTURER DASHBOARD NAME.

            window.location.replace(
                "manufacturer-dashboard.html"
            );

        }, 500);

        return;
    }


    // =================================================
    // UNKNOWN ROLE
    // =================================================

    if (otpMessage) {

        otpMessage.textContent =
            "Invalid login role.";

        otpMessage.style.color =
            "#d9534f";
    }
}


    



// =====================================================
// RESEND OTP
// =====================================================

if (resendOtp) {

    resendOtp.addEventListener(
        "click",
        async () => {

            // =================================================
            // CHECK 1-MINUTE COOLDOWN
            // =================================================

            if (
                timeLeft > 0
            ) {

                if (otpMessage) {

                    otpMessage.textContent =
                        "Please wait " +
                        formatTime(timeLeft) +
                        " before requesting another OTP.";

                    otpMessage.style.color =
                        "#d9534f";

                }

                return;

            }


            // =================================================
            // CHECK OTP SESSION
            // =================================================

            if (!currentOtpEmail) {

                if (otpMessage) {

                    otpMessage.textContent =
                        "OTP session not found. Please login again.";

                    otpMessage.style.color =
                        "#d9534f";

                }

                return;

            }


            // =================================================
            // DISABLE RESEND
            // =================================================

            resendOtp.disabled =
                true;


            if (otpMessage) {

                otpMessage.textContent =
                    "Sending a new OTP...";

                otpMessage.style.color =
                    "#087da3";

            }


            try {

                const result =
                    await sendRealOTP(
                        currentOtpEmail
                    );


                // =================================================
                // CLEAR OLD OTP
                // =================================================

                otpBoxes.forEach(
                    box => {

                        box.value =
                            "";

                    }
                );


                // =================================================
                // SUCCESS MESSAGE
                // =================================================

                if (otpMessage) {

                    otpMessage.textContent =
                        result.message ||
                        "A new OTP has been sent.";

                    otpMessage.style.color =
                        "#2c8a5a";

                }


                // =================================================
                // RESTART 1-MINUTE TIMER
                // =================================================

                startTimer();


                if (
                    otpBoxes.length > 0
                ) {

                    otpBoxes[0].focus();

                }

            }

            catch (error) {

                console.error(
                    "Resend OTP error:",
                    error
                );


                if (otpMessage) {

                    otpMessage.textContent =
                        error.message ||
                        "Unable to resend OTP.";

                    otpMessage.style.color =
                        "#d9534f";

                }


                // Allow retry if sending failed
                resendOtp.disabled =
                    false;

            }

        }
    );

}


// =====================================================
// EDIT LOGIN
// =====================================================

if (editLogin) {

    editLogin.addEventListener(
        "click",
        () => {

            clearInterval(timer);

            timer =
                null;


            currentChallengeId =
                null;

            currentOtpEmail =
                "";


            // Remove temporary admin session
            sessionStorage.removeItem(
                "currentAdmin"
            );

            currentAdmin =
                null;


            // =================================================
            // HIDE OTP
            // =================================================

            if (otpSection) {

                otpSection.style.display =
                    "none";

            }


            // =================================================
            // SHOW LOGIN
            // =================================================

            if (loginForm) {

                loginForm.style.display =
                    "block";

            }


            if (roleSelector) {

                roleSelector.style.display =
                    "block";

            }


            if (loginHeader) {

                loginHeader.style.display =
                    "block";

            }


            // =================================================
            // CLEAR OTP MESSAGE
            // =================================================

            if (otpMessage) {

                otpMessage.textContent =
                    "";

            }


            // =================================================
            // CLEAR LOGIN MESSAGE
            // =================================================

            if (loginMessage) {

                loginMessage.textContent =
                    "";

            }


            // =================================================
            // CLEAR OTP BOXES
            // =================================================

            otpBoxes.forEach(
                box => {

                    box.value =
                        "";

                }
            );


            // =================================================
            // RESET RESEND BUTTON
            // =================================================

            if (resendOtp) {

                resendOtp.disabled =
                    false;

            }


            // =================================================
            // FOCUS USER ID
            // =================================================

            if (userId) {

                userId.focus();

            }

        }
    );

}