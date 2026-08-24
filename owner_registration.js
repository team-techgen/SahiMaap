document.addEventListener("DOMContentLoaded", function () {

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
    const otpBoxes = document.querySelectorAll(".otp-box");
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