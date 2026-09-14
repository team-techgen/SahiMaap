document.addEventListener("DOMContentLoaded", function () {

    const ownerPanel = document.getElementById("ownerPanel");

    const manufacturerPanel = document.getElementById("manufacturerPanel");

    const ownerTabs = document.querySelectorAll(
        '[data-registration-type="owner"]'
    );

    const manufacturerTabs = document.querySelectorAll(
        '[data-registration-type="manufacturer"]'
    );

    if (!ownerPanel || !manufacturerPanel) {

        console.error("Registration panels are missing.");

        return;
    }

    function showRegistration(type) {

        const ownerActive = type === "owner";

        ownerPanel.hidden = !ownerActive;

        manufacturerPanel.hidden = ownerActive;

        ownerTabs.forEach(function (tab) {

            tab.classList.toggle("active", ownerActive);
            tab.setAttribute(
                "aria-selected",
                ownerActive ? "true" : "false"
            );

        });

        manufacturerTabs.forEach(function (tab) {

            tab.classList.toggle("active", !ownerActive);
            tab.setAttribute(
                "aria-selected",
                !ownerActive ? "true" : "false"
            );

        });

    }

  // ================= URL REGISTRATION TYPE =================

const params = new URLSearchParams(window.location.search);
const registrationRole = params.get("role");

if (registrationRole === "manufacturer") {

    showRegistration("manufacturer");
} 
else {
  showRegistration("owner");

}

    ownerTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            showRegistration("owner");

        });

    });

    manufacturerTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            showRegistration("manufacturer");
        });
    });

});

// ================= EXISTING INSTRUMENT OWNER LOGIC =================

document.addEventListener("DOMContentLoaded", function () {

    const ownerPanel = document.getElementById("ownerPanel");

    const ownerType = document.getElementById("ownerType");
    const organizationFields = document.getElementById("organizationFields");
    const organizationName = document.getElementById("organizationName");
    const contactPerson = document.getElementById("contactPerson");
    const designation = document.getElementById("designation");

    const menuButton = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    const mobileNumber = document.getElementById("mobileNumber");
    const sendOtp = document.getElementById("sendOtp");
    const mobileMessage = document.getElementById("mobileMessage");
    const mobileVerified = document.getElementById("mobileVerified");

    const otpModal = document.getElementById("otpModal");
    const otpMobileDisplay = document.getElementById("otpMobileDisplay");
    const otpBoxes = ownerPanel.querySelectorAll(".otp-box");
    const otpMessage = document.getElementById("otpMessage");
    const otpTimer = document.getElementById("otpTimer");
    const resendOtp = document.getElementById("resendOtp");
    const verifyOtp = document.getElementById("verifyOtp");

    const state = document.getElementById("state");
    const district = document.getElementById("district");
    const pinCode = document.getElementById("pinCode");

    const identityDetails = document.getElementById("identityDetails");
    const individualIdentity = document.getElementById("individualIdentity");
    const businessIdentity = document.getElementById("businessIdentity");

    let timerInterval;
    let secondsLeft = 30;

    const districtsByState = {
        "andhra-pradesh": ["Anantapur", "Guntur", "Kurnool", "Visakhapatnam"],
        "arunachal-pradesh": ["Itanagar Capital Complex", "Tawang", "West Kameng"],
        "assam": ["Dibrugarh", "Guwahati", "Jorhat", "Kamrup"],
        "bihar": ["Gaya", "Muzaffarpur", "Patna", "Purnia"],
        "chhattisgarh": ["Bilaspur", "Durg", "Raipur", "Rajnandgaon"],
        "goa": ["North Goa", "South Goa"],
        "gujarat": ["Ahmedabad", "Rajkot", "Surat", "Vadodara"],
        "haryana": ["Faridabad", "Gurugram", "Hisar", "Panipat"],
        "himachal-pradesh": ["Kangra", "Kullu", "Mandi", "Shimla"],
        "jharkhand": ["Bokaro", "Dhanbad", "Jamshedpur", "Ranchi"],
        "karnataka": ["Bengaluru Urban", "Mysuru", "Shivamogga", "Udupi"],
        "kerala": ["Ernakulam", "Kozhikode", "Thiruvananthapuram", "Thrissur"],
        "madhya-pradesh": ["Bhopal", "Gwalior", "Indore", "Jabalpur"],
        "maharashtra": ["Mumbai City", "Nagpur", "Nashik", "Pune"],
        "manipur": ["Bishnupur", "Imphal East", "Imphal West"],
        "meghalaya": ["East Khasi Hills", "Ri Bhoi", "West Garo Hills"],
        "mizoram": ["Aizawl", "Kolasib", "Lunglei"],
        "nagaland": ["Dimapur", "Kohima", "Mokokchung"],
        "odisha": ["Bhubaneswar", "Cuttack", "Ganjam", "Sambalpur"],
        "punjab": ["Amritsar", "Jalandhar", "Ludhiana", "Patiala"],
        "rajasthan": ["Ajmer", "Jaipur", "Jodhpur", "Udaipur"],
        "sikkim": ["Gangtok", "Gyalshing", "Namchi"],
        "tamil-nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
        "telangana": ["Hyderabad", "Karimnagar", "Khammam", "Warangal"],
        "tripura": ["Dhalai", "North Tripura", "West Tripura"],
        "uttar-pradesh": ["Agra", "Kanpur Nagar", "Lucknow", "Varanasi"],
        "uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar"],
        "west-bengal": ["Howrah", "Kolkata", "North 24 Parganas", "Siliguri"],
        "andaman-nicobar": ["Nicobar", "North and Middle Andaman", "South Andaman"],
        "chandigarh": ["Chandigarh"],
        "dadra-nagar-haveli-daman-diu": [
            "Dadra and Nagar Haveli",
            "Daman",
            "Diu"
        ],
        "delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi"],
        "jammu-kashmir": ["Anantnag", "Jammu", "Srinagar", "Udhampur"],
        "ladakh": ["Kargil", "Leh"],
        "lakshadweep": ["Lakshadweep"],
        "puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
    };

    function updateOwnerFields() {

        const isIndividual = ownerType.value === "individual";

        const isBusinessOwner =
            ownerType.value === "business" ||
            ownerType.value === "company";

        const hasOwnerType = ownerType.value !== "";

        organizationFields.classList.toggle(
            "show",
            hasOwnerType && !isIndividual
        );

        organizationName.required = hasOwnerType && !isIndividual;
        contactPerson.required = hasOwnerType && !isIndividual;
        designation.required = hasOwnerType && !isIndividual;

        identityDetails.hidden = !hasOwnerType;

        individualIdentity.hidden = !isIndividual;

        businessIdentity.hidden = !isBusinessOwner;

        if (isIndividual) {
            organizationName.value = "";
            contactPerson.value = "";
            designation.value = "";
        }
    }

    function updateDistricts() {

        const selectedState = state.value;

        district.innerHTML =
            '<option value="" selected disabled>Select District</option>';

        if (!selectedState || !districtsByState[selectedState]) {
            district.disabled = true;
            return;
        }

        districtsByState[selectedState].forEach(function (districtName) {

            const option = document.createElement("option");

            option.value = districtName;

            option.textContent = districtName;

            district.appendChild(option);

        });

        district.disabled = false;
    }

    function maskMobileNumber(number) {
        return "+91 " + number.slice(0, 2) + "******" + number.slice(-2);
    }

    function resetOtpBoxes() {
        otpBoxes.forEach(function (box) {
            box.value = "";
        });
    }

    function startOtpTimer() {

        clearInterval(timerInterval);

        secondsLeft = 30;
        resendOtp.disabled = true;

        timerInterval = setInterval(function () {

            secondsLeft--;

            otpTimer.textContent =
                "Resend OTP in 00:" +
                String(secondsLeft).padStart(2, "0");

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                otpTimer.textContent = "Did not receive the OTP?";
                resendOtp.disabled = false;
            }

        }, 1000);
    }

    function openOtpModal() {

        const mobile = mobileNumber.value.trim();

        if (!/^[0-9]{10}$/.test(mobile)) {
            mobileMessage.textContent =
                "Enter a valid 10-digit mobile number.";
            return;
        }

        mobileMessage.textContent = "";
        mobileVerified.hidden = true;

        otpMobileDisplay.textContent = maskMobileNumber(mobile);

        resetOtpBoxes();
        otpMessage.textContent = "";

        otpModal.hidden = false;

        startOtpTimer();

        otpBoxes[0].focus();
    }

    function verifyMobileOtp() {

        let enteredOtp = "";

        otpBoxes.forEach(function (box) {
            enteredOtp += box.value;
        });

        if (enteredOtp.length !== 6) {
            otpMessage.textContent = "Enter the complete 6-digit OTP.";
            return;
        }

        /* Demo OTP until an SMS backend is connected */
        if (enteredOtp !== "123456") {
            otpMessage.textContent = "Invalid OTP. Please try again.";
            return;
        }

        clearInterval(timerInterval);

        otpModal.hidden = true;

        mobileVerified.hidden = false;

        mobileMessage.textContent = "";
    }

    ownerType.addEventListener("change", updateOwnerFields);

    state.addEventListener("change", updateDistricts);

    mobileNumber.addEventListener("input", function () {
        mobileNumber.value = mobileNumber.value.replace(/\D/g, "");
        mobileMessage.textContent = "";
    });

    pinCode.addEventListener("input", function () {
        pinCode.value = pinCode.value.replace(/\D/g, "");
    });

    sendOtp.addEventListener("click", openOtpModal);

    resendOtp.addEventListener("click", function () {
        resetOtpBoxes();
        otpMessage.textContent = "";
        startOtpTimer();
        otpBoxes[0].focus();
    });

    verifyOtp.addEventListener("click", verifyMobileOtp);

    otpBoxes.forEach(function (box, index) {

        box.addEventListener("input", function () {

            box.value = box.value.replace(/\D/g, "");

            if (box.value && index < otpBoxes.length - 1) {
                otpBoxes[index + 1].focus();
            }

        });

        box.addEventListener("keydown", function (event) {

            if (
                event.key === "Backspace" &&
                !box.value &&
                index > 0
            ) {
                otpBoxes[index - 1].focus();
            }

        });

    });

    const ownerRegistrationForm =
        document.getElementById("ownerRegistrationForm");

    const username = document.getElementById("username");

    const newPassword = document.getElementById("newPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const toggleNewPassword =
        document.getElementById("toggleNewPassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const strengthFill = document.getElementById("strengthFill");

    const strengthText = document.getElementById("strengthText");

    const passwordMatchMessage =
        document.getElementById("passwordMatchMessage");

    const ruleLength = document.getElementById("ruleLength");
    const ruleUppercase = document.getElementById("ruleUppercase");
    const ruleLowercase = document.getElementById("ruleLowercase");
    const ruleNumber = document.getElementById("ruleNumber");
    const ruleSpecial = document.getElementById("ruleSpecial");

    const captchaCode = document.getElementById("captchaCode");
const captchaInput = document.getElementById("captchaInput");
const refreshCaptcha = document.getElementById("refreshCaptcha");
const captchaMessage = document.getElementById("captchaMessage");

let currentCaptcha = "";

    const accuracyDeclaration =
        document.getElementById("accuracyDeclaration");

    const termsDeclaration =
        document.getElementById("termsDeclaration");

    const notificationConsent =
        document.getElementById("notificationConsent");

    const accountMessage =
        document.getElementById("accountMessage");


    function togglePasswordVisibility(input, button) {

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
        } else {
            input.type = "password";
            button.textContent = "Show";
        }
    }


    function updatePasswordStrength() {

        const password = newPassword.value;

        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        const score =
            Number(hasLength) +
            Number(hasUppercase) +
            Number(hasLowercase) +
            Number(hasNumber) +
            Number(hasSpecial);

        ruleLength.classList.toggle("met", hasLength);
        ruleUppercase.classList.toggle("met", hasUppercase);
        ruleLowercase.classList.toggle("met", hasLowercase);
        ruleNumber.classList.toggle("met", hasNumber);
        ruleSpecial.classList.toggle("met", hasSpecial);

        const width = score * 20;

        strengthFill.style.width = width + "%";

        if (score <= 2) {
            strengthFill.style.background = "#c53d3d";
            strengthText.textContent = "Password strength: Weak";
        } else if (score <= 4) {
            strengthFill.style.background = "#d28a16";
            strengthText.textContent = "Password strength: Medium";
        } else {
            strengthFill.style.background = "#16834b";
            strengthText.textContent = "Password strength: Strong";
        }

        return score === 5;
    }


    function checkPasswordMatch() {

        if (!confirmPassword.value) {
            passwordMatchMessage.textContent = "";
            return false;
        }

        if (newPassword.value === confirmPassword.value) {
            passwordMatchMessage.textContent = "✓ Passwords match";
            passwordMatchMessage.style.color = "#16834b";
            return true;
        }

        passwordMatchMessage.textContent = "Passwords do not match.";
        passwordMatchMessage.style.color = "#c53d3d";

        return false;
    }


    newPassword.addEventListener("input", function () {
        updatePasswordStrength();
        checkPasswordMatch();
    });


    confirmPassword.addEventListener("input", checkPasswordMatch);


    toggleNewPassword.addEventListener("click", function () {
        togglePasswordVisibility(newPassword, toggleNewPassword);
    });


    toggleConfirmPassword.addEventListener("click", function () {
        togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
    });

        function generateCaptcha() {

        const characters =
            "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        let generatedCode = "";

        for (let index = 0; index < 6; index++) {
            generatedCode += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }

        currentCaptcha = generatedCode;

        captchaCode.textContent = currentCaptcha;

        captchaInput.value = "";

        captchaMessage.textContent = "";
    }

    refreshCaptcha.addEventListener("click", generateCaptcha);

    captchaInput.addEventListener("input", function () {
        captchaInput.value = captchaInput.value.toUpperCase();
        captchaMessage.textContent = "";
    });

    generateCaptcha();

    ownerRegistrationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        accountMessage.textContent = "";
        accountMessage.className = "account-message";

        if (!ownerRegistrationForm.checkValidity()) {
            ownerRegistrationForm.reportValidity();

            accountMessage.textContent =
                "Please complete all required fields.";

            accountMessage.classList.add("error");

            return;
        }

        if (mobileVerified.hidden) {
            accountMessage.textContent =
                "Verify your mobile number before creating the account.";

            accountMessage.classList.add("error");

            return;
        }

        if (!updatePasswordStrength()) {
            accountMessage.textContent =
                "Password does not meet all security requirements.";

            accountMessage.classList.add("error");

            return;
        }

        if (!checkPasswordMatch()) {
            accountMessage.textContent =
                "Passwords must match.";

            accountMessage.classList.add("error");

            return;
        }

        if (
    captchaInput.value.trim().toUpperCase() !== currentCaptcha
) {
    captchaMessage.textContent =
        "The CAPTCHA code does not match.";

    accountMessage.textContent =
        "Please enter the correct CAPTCHA code.";

    accountMessage.classList.add("error");

    generateCaptcha();

    return;
}

if (
    !accuracyDeclaration.checked ||
    !termsDeclaration.checked ||
    !notificationConsent.checked
) {
    accountMessage.textContent =
        "Please complete all declaration checkboxes.";

    accountMessage.classList.add("error");

    return;
}

        accountMessage.textContent =
            "✓ Registration successful. You can now log in.";

        accountMessage.classList.add("success");

        username.disabled = true;
        newPassword.disabled = true;
        confirmPassword.disabled = true;
    });

    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("mobile-active");
    });

});

// ================= EXISTING MANUFACTURER LOGIC =================
document.addEventListener("DOMContentLoaded", function () {

    const manufacturerPanel = document.getElementById("manufacturerPanel");

    /* =====================================================
       MOBILE NUMBER + OTP
       ===================================================== */

    const mobileNumber = document.getElementById("manufacturer-mobileNumber");
    const sendOtp = document.getElementById("manufacturer-sendOtp");
    const mobileMessage = document.getElementById("manufacturer-mobileMessage");
    const mobileVerified = document.getElementById("manufacturer-mobileVerified");

    const otpModal = document.getElementById("manufacturer-otpModal");
    const otpMobileDisplay = document.getElementById("manufacturer-otpMobileDisplay");
    const otpBoxes = manufacturerPanel.querySelectorAll(".otp-box");
    const otpMessage = document.getElementById("manufacturer-otpMessage");
    const otpTimer = document.getElementById("manufacturer-otpTimer");
    const resendOtp = document.getElementById("manufacturer-resendOtp");
    const verifyOtp = document.getElementById("manufacturer-verifyOtp");

    let timerInterval;
    let secondsLeft = 30;


    function maskMobileNumber(number) {

        return "+91 " +
            number.substring(0, 2) +
            "******" +
            number.substring(8, 10);

    }


    function resetOtpBoxes() {

        otpBoxes.forEach(function (box) {
            box.value = "";
        });

    }


    function startOtpTimer() {

        clearInterval(timerInterval);

        secondsLeft = 30;

        resendOtp.disabled = true;

        otpTimer.textContent =
            "Resend OTP in 00:30";


        timerInterval = setInterval(function () {

            secondsLeft--;

            otpTimer.textContent =
                "Resend OTP in 00:" +
                String(secondsLeft).padStart(2, "0");


            if (secondsLeft <= 0) {

                clearInterval(timerInterval);

                otpTimer.textContent =
                    "Did not receive the OTP?";

                resendOtp.disabled = false;

            }

        }, 1000);

    }


    if (sendOtp) {

        sendOtp.addEventListener("click", function () {

            const mobile =
                mobileNumber.value.trim();


            if (!/^[0-9]{10}$/.test(mobile)) {

                mobileMessage.textContent =
                    "Enter a valid 10-digit mobile number.";

                return;

            }


            mobileMessage.textContent = "";

            mobileVerified.hidden = true;

            otpMobileDisplay.textContent =
                maskMobileNumber(mobile);

            resetOtpBoxes();

            otpMessage.textContent = "";

            otpModal.hidden = false;

            startOtpTimer();


            if (otpBoxes.length > 0) {
                otpBoxes[0].focus();
            }

        });

    }


    if (verifyOtp) {

        verifyOtp.addEventListener("click", function () {

            let enteredOtp = "";


            otpBoxes.forEach(function (box) {
                enteredOtp += box.value;
            });


            if (enteredOtp.length !== 6) {

                otpMessage.textContent =
                    "Enter the complete 6-digit OTP.";

                return;

            }


            /*
             * DEMO OTP
             * Use 123456 for testing.
             */

            if (enteredOtp !== "123456") {

                otpMessage.textContent =
                    "Invalid OTP. Please try again.";

                return;

            }


            clearInterval(timerInterval);

            otpModal.hidden = true;

            mobileVerified.hidden = false;

            mobileMessage.textContent = "";

        });

    }


    if (resendOtp) {

        resendOtp.addEventListener("click", function () {

            resetOtpBoxes();

            otpMessage.textContent = "";

            startOtpTimer();


            if (otpBoxes.length > 0) {
                otpBoxes[0].focus();
            }

        });

    }


    otpBoxes.forEach(function (box, index) {

        box.addEventListener("input", function () {

            box.value =
                box.value.replace(/\D/g, "");


            if (
                box.value &&
                index < otpBoxes.length - 1
            ) {

                otpBoxes[index + 1].focus();

            }

        });


        box.addEventListener("keydown", function (event) {

            if (
                event.key === "Backspace" &&
                !box.value &&
                index > 0
            ) {

                otpBoxes[index - 1].focus();

            }

        });

    });


    /* =====================================================
       PIN CODE
       ===================================================== */

    const pinCode = document.getElementById("manufacturer-pinCode");

    if (pinCode) {

        pinCode.addEventListener("input", function () {

            pinCode.value =
                pinCode.value.replace(/\D/g, "");

        });

    }


    /* =====================================================
       GSTIN
       ===================================================== */

    const gstin = document.getElementById("manufacturer-gstin");

    if (gstin) {

        gstin.addEventListener("input", function () {

            gstin.value =
                gstin.value
                    .replace(/\s/g, "")
                    .toUpperCase();

        });

    }


    /* =====================================================
       PASSWORD
       ===================================================== */

    const newPassword =
        document.getElementById("manufacturer-newPassword");

    const confirmPassword =
        document.getElementById("manufacturer-confirmPassword");

    const toggleNewPassword =
        document.getElementById("manufacturer-toggleNewPassword");

    const toggleConfirmPassword =
        document.getElementById("manufacturer-toggleConfirmPassword");

    const strengthFill =
        document.getElementById("manufacturer-strengthFill");

    const strengthText =
        document.getElementById("manufacturer-strengthText");

    const passwordMatchMessage =
        document.getElementById("manufacturer-passwordMatchMessage");

    const ruleLength =
        document.getElementById("manufacturer-ruleLength");

    const ruleUppercase =
        document.getElementById("manufacturer-ruleUppercase");

    const ruleLowercase =
        document.getElementById("manufacturer-ruleLowercase");

    const ruleNumber =
        document.getElementById("manufacturer-ruleNumber");

    const ruleSpecial =
        document.getElementById("manufacturer-ruleSpecial");


    function togglePassword(input, button) {

        if (input.type === "password") {

            input.type = "text";

            button.textContent = "Hide";

        } else {

            input.type = "password";

            button.textContent = "Show";

        }

    }


    if (toggleNewPassword) {

        toggleNewPassword.addEventListener("click", function () {

            togglePassword(
                newPassword,
                toggleNewPassword
            );

        });

    }


    if (toggleConfirmPassword) {

        toggleConfirmPassword.addEventListener("click", function () {

            togglePassword(
                confirmPassword,
                toggleConfirmPassword
            );

        });

    }


    function updatePasswordStrength() {

        const password =
            newPassword.value;


        const hasLength =
            password.length >= 8;

        const hasUppercase =
            /[A-Z]/.test(password);

        const hasLowercase =
            /[a-z]/.test(password);

        const hasNumber =
            /[0-9]/.test(password);

        const hasSpecial =
            /[^A-Za-z0-9]/.test(password);


        ruleLength.classList.toggle(
            "met",
            hasLength
        );

        ruleUppercase.classList.toggle(
            "met",
            hasUppercase
        );

        ruleLowercase.classList.toggle(
            "met",
            hasLowercase
        );

        ruleNumber.classList.toggle(
            "met",
            hasNumber
        );

        ruleSpecial.classList.toggle(
            "met",
            hasSpecial
        );


        const score =
            Number(hasLength) +
            Number(hasUppercase) +
            Number(hasLowercase) +
            Number(hasNumber) +
            Number(hasSpecial);


        strengthFill.style.width =
            (score * 20) + "%";


        if (score <= 2) {

            strengthFill.style.background =
                "#c53d3d";

            strengthText.textContent =
                "Password strength: Weak";

        }

        else if (score <= 4) {

            strengthFill.style.background =
                "#d28a16";

            strengthText.textContent =
                "Password strength: Medium";

        }

        else {

            strengthFill.style.background =
                "#16834b";

            strengthText.textContent =
                "Password strength: Strong";

        }


        return score === 5;

    }


    function checkPasswordMatch() {

        if (!confirmPassword.value) {

            passwordMatchMessage.textContent = "";

            return false;

        }


        if (
            newPassword.value ===
            confirmPassword.value
        ) {

            passwordMatchMessage.textContent =
                "✓ Passwords match";

            passwordMatchMessage.style.color =
                "#16834b";

            return true;

        }


        passwordMatchMessage.textContent =
            "Passwords do not match.";

        passwordMatchMessage.style.color =
            "#c53d3d";

        return false;

    }


    if (newPassword) {

        newPassword.addEventListener(
            "input",
            function () {

                updatePasswordStrength();
                checkPasswordMatch();

            }
        );

    }


    if (confirmPassword) {

        confirmPassword.addEventListener(
            "input",
            checkPasswordMatch
        );

    }


    /* =====================================================
       CAPTCHA
       ===================================================== */

    const captchaCode =
        document.getElementById("manufacturer-captchaCode");

    const captchaInput =
        document.getElementById("manufacturer-captchaInput");

    const refreshCaptcha =
        document.getElementById("manufacturer-refreshCaptcha");

    const captchaMessage =
        document.getElementById("manufacturer-captchaMessage");


    let currentCaptcha = "";


    function generateCaptcha() {

        const characters =
            "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


        currentCaptcha = "";


        for (let i = 0; i < 6; i++) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    characters.length
                );


            currentCaptcha +=
                characters[randomIndex];

        }


        captchaCode.textContent =
            currentCaptcha;


        captchaInput.value = "";

        captchaMessage.textContent = "";

    }


    /* Generate CAPTCHA when page loads */

    generateCaptcha();


    /* Refresh CAPTCHA */

    if (refreshCaptcha) {

        refreshCaptcha.addEventListener(
            "click",
            function () {

                generateCaptcha();

            }
        );

    }


    /* CAPTCHA input */

    if (captchaInput) {

        captchaInput.addEventListener(
            "input",
            function () {

                captchaInput.value =
                    captchaInput.value.toUpperCase();

                captchaMessage.textContent = "";

            }
        );

    }


    /* =====================================================
       ⭐ FORM SUBMIT EVENT
       ===================================================== */

    const manufacturerRegistrationForm =
        document.getElementById(
            "manufacturerRegistrationForm"
        );


    if (manufacturerRegistrationForm) {

        manufacturerRegistrationForm.addEventListener(
            "submit",
            function (event) {

                /* STOP THE FORM FROM RELOADING */

                event.preventDefault();


                const accountMessage =
                    document.getElementById(
                        "accountMessage"
                    );


                accountMessage.textContent = "";

                accountMessage.className =
                    "account-message";


                /* =========================================
                   1. CHECK REQUIRED FIELDS
                   ========================================= */

                if (
                    !manufacturerRegistrationForm.checkValidity()
                ) {

                    manufacturerRegistrationForm
                        .reportValidity();

                    accountMessage.textContent =
                        "Please complete all required fields.";

                    accountMessage.classList.add(
                        "error"
                    );

                    return;

                }


                /* =========================================
                   2. CHECK MOBILE OTP
                   ========================================= */

                if (
                    mobileVerified.hidden
                ) {

                    accountMessage.textContent =
                        "Please verify your mobile number first.";

                    accountMessage.classList.add(
                        "error"
                    );

                    return;

                }


                /* =========================================
                   3. CHECK PASSWORD
                   ========================================= */

                if (
                    !updatePasswordStrength()
                ) {

                    accountMessage.textContent =
                        "Please create a strong password.";

                    accountMessage.classList.add(
                        "error"
                    );

                    return;

                }


                /* =========================================
                   4. CHECK PASSWORD MATCH
                   ========================================= */

                if (
                    !checkPasswordMatch()
                ) {

                    accountMessage.textContent =
                        "Passwords do not match.";

                    accountMessage.classList.add(
                        "error"
                    );

                    return;

                }


                /* =========================================
                   5. ⭐ CHECK CAPTCHA
                   ========================================= */

                const enteredCaptcha =
                    captchaInput.value
                        .trim()
                        .toUpperCase();


                if (
                    enteredCaptcha === ""
                ) {

                    captchaMessage.textContent =
                        "Please enter the CAPTCHA.";

                    captchaMessage.style.color =
                        "#c53d3d";

                    captchaInput.focus();

                    return;

                }


                if (
                    enteredCaptcha !==
                    currentCaptcha
                ) {

                    captchaMessage.textContent =
                        "Incorrect CAPTCHA. Please try again.";

                    captchaMessage.style.color =
                        "#c53d3d";


                    /*
                     * Generate a NEW CAPTCHA
                     */

                    generateCaptcha();

                    captchaInput.focus();

                    return;

                }


                /* CAPTCHA CORRECT */

                captchaMessage.textContent =
                    "✓ CAPTCHA verified.";

                captchaMessage.style.color =
                    "#16834b";


                /* =========================================
                   6. CHECK DECLARATIONS
                   ========================================= */

                const accuracyDeclaration =
                    document.getElementById(
                        "accuracyDeclaration"
                    );

                const termsDeclaration =
                    document.getElementById(
                        "termsDeclaration"
                    );

                const notificationConsent =
                    document.getElementById(
                        "notificationConsent"
                    );


                if (
                    !accuracyDeclaration.checked ||
                    !termsDeclaration.checked ||
                    !notificationConsent.checked
                ) {

                    accountMessage.textContent =
                        "Please complete all declaration checkboxes.";

                    accountMessage.classList.add(
                        "error"
                    );

                    return;

                }


                /* =========================================
                   7. SUCCESS
                   ========================================= */

                accountMessage.textContent =
                    "✓ Manufacturer registration successful!";

                accountMessage.classList.add(
                    "success"
                );


                const createAccount =
                    document.getElementById(
                        "createAccount"
                    );


                if (createAccount) {

                    createAccount.textContent =
                        "Registration Completed";

                    createAccount.disabled =
                        true;

                }

            }
        );

    }

});