document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NUMBER + OTP
       ===================================================== */

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

    const pinCode = document.getElementById("pinCode");

    if (pinCode) {

        pinCode.addEventListener("input", function () {

            pinCode.value =
                pinCode.value.replace(/\D/g, "");

        });

    }


    /* =====================================================
       GSTIN
       ===================================================== */

    const gstin = document.getElementById("gstin");

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
        document.getElementById("newPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const toggleNewPassword =
        document.getElementById("toggleNewPassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const strengthFill =
        document.getElementById("strengthFill");

    const strengthText =
        document.getElementById("strengthText");

    const passwordMatchMessage =
        document.getElementById("passwordMatchMessage");

    const ruleLength =
        document.getElementById("ruleLength");

    const ruleUppercase =
        document.getElementById("ruleUppercase");

    const ruleLowercase =
        document.getElementById("ruleLowercase");

    const ruleNumber =
        document.getElementById("ruleNumber");

    const ruleSpecial =
        document.getElementById("ruleSpecial");


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
        document.getElementById("captchaCode");

    const captchaInput =
        document.getElementById("captchaInput");

    const refreshCaptcha =
        document.getElementById("refreshCaptcha");

    const captchaMessage =
        document.getElementById("captchaMessage");


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