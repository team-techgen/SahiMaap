/* =========================================================
   SAHIMAAP — ABOUT PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const elements = document.querySelectorAll(
        ".capability-card, .stakeholder-card, .intro-highlight"
    );


    elements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(18px)";

        element.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        elements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        elements.forEach(function (element) {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        });

    }



    /* =====================================================
       THREE LANGUAGE SYSTEM
    ===================================================== */

    const translations = {

        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            aboutTag:
                "About SahiMaap",

            heroTitle:
                "Making Legal Metrology|Simple, Clear & Connected",

            heroDescription:
                "SahiMaap is a digital platform designed to simplify the verification and certification of weighing and measuring instruments.",

            heroPoint:
                "One connected platform for registration, verification, certification and compliance.",

            cardTitle:
                "Digital Instrument Identity",

            verified:
                "Verified",

            instrumentLabel:
                "INSTRUMENT",

            weighingInstrument:
                "Weighing Instrument",

            statusLabel:
                "STATUS",

            identityLabel:
                "IDENTITY",

            permanentQr:
                "Permanent QR",

            qrTitle:
                "One Instrument → One Digital Identity",

            qrDescription:
                "Verification certificate and history linked to the instrument.",


            introTag:
                "What is SahiMaap?",

            introTitle:
                "One Connected Platform for|Legal Metrology Verification",

            introP1:
                "SahiMaap is a digital Legal Metrology verification and compliance platform designed to simplify the verification of weighing and measuring instruments.",

            introP2:
                "It brings instrument owners, Legal Metrology Officers (LMOs), GATCs, departments and consumers together through one connected system.",

            introP3:
                "From instrument registration and application to scheduling, field verification, approval and digital certification, SahiMaap makes the entire process more organized and traceable.",

            lifecycleTitle:
                "Complete Verification Lifecycle",

            lifecycleText:
                "Registration → Application → Scheduling → Verification → Approval → Certification → Monitoring",


            capabilityTag:
                "Core Capabilities",

            capabilityTitle:
                "Built for Transparent,|Traceable Verification",

            capabilityDescription:
                "SahiMaap connects digital identity, verification and compliance into one system.",

            cap1Title:
                "Permanent QR Identity",

            cap1Text:
                "Every instrument receives a permanent QR-based digital identity linked to its verification records.",

            cap2Title:
                "Rule-Driven Verification",

            cap2Text:
                "Verification can be guided through applicable rules and digitally defined tests.",

            cap3Title:
                "Offline Field Support",

            cap3Text:
                "Field data can be recorded in low or no-connectivity areas and synchronized later.",

            cap4Title:
                "Validity Tracking",

            cap4Text:
                "Verification validity and re-verification requirements can be tracked throughout the lifecycle.",


            workflowTag:
                "How SahiMaap Works",

            workflowTitle:
                "A Simple Digital Verification Journey",

            workflowDescription:
                "Every stage of the verification process remains connected and traceable.",

            step1Title:
                "Register",

            step1Text:
                "Instrument",

            step2Title:
                "Apply",

            step2Text:
                "Application",

            step3Title:
                "Schedule",

            step3Text:
                "Verification",

            step4Title:
                "Verify",

            step4Text:
                "Field Check",

            step5Title:
                "Approve",

            step5Text:
                "Review",

            step6Title:
                "Certify",

            step6Text:
                "Certificate",

            step7Title:
                "Monitor",

            step7Text:
                "Validity",


            stakeholderTag:
                "One Connected Ecosystem",

            stakeholderTitle:
                "Connecting Everyone Involved",

            stake1Title:
                "Instrument Owners",

            stake1Text:
                "Register instruments, submit applications and access verification certificates.",

            stake2Title:
                "LMOs & GATCs",

            stake2Text:
                "Manage scheduling, field verification, observations and records.",

            stake3Title:
                "Departments",

            stake3Text:
                "Get better visibility into verification status, validity and activities.",

            stake4Title:
                "Consumers",

            stake4Text:
                "Access instrument verification information through QR-based verification.",


            goalTag:
                "Our Goal",

            goalTitle:
                "More Efficient.|More Transparent.|More Trustworthy.",

            goalP1:
                "Each instrument is provided with a permanent QR-based digital identity, allowing its verification status, certificate and history to be accessed easily.",

            goalP2:
                "SahiMaap brings these capabilities together to make verification more efficient, transparent and trustworthy."

        },


        /* =================================================
           HINDI
        ================================================= */

        hi: {

            aboutTag:
                "सहीमाप के बारे में",

            heroTitle:
                "कानूनी मापविज्ञान को|सरल, स्पष्ट और जुड़ा हुआ बनाना",

            heroDescription:
                "SahiMaap एक डिजिटल प्लेटफ़ॉर्म है जिसे तौलने और मापने वाले उपकरणों के सत्यापन और प्रमाणन को सरल बनाने के लिए तैयार किया गया है।",

            heroPoint:
                "पंजीकरण, सत्यापन, प्रमाणन और अनुपालन के लिए एक जुड़ा हुआ प्लेटफ़ॉर्म।",

            cardTitle:
                "डिजिटल उपकरण पहचान",

            verified:
                "सत्यापित",

            instrumentLabel:
                "उपकरण",

            weighingInstrument:
                "तौलने का उपकरण",

            statusLabel:
                "स्थिति",

            identityLabel:
                "पहचान",

            permanentQr:
                "स्थायी QR",

            qrTitle:
                "एक उपकरण → एक डिजिटल पहचान",

            qrDescription:
                "सत्यापन प्रमाणपत्र और इतिहास उपकरण से जुड़े रहते हैं।",


            introTag:
                "सहीमाप क्या है?",

            introTitle:
                "कानूनी मापविज्ञान सत्यापन के लिए|एक जुड़ा हुआ प्लेटफ़ॉर्म",

            introP1:
                "SahiMaap एक डिजिटल कानूनी मापविज्ञान सत्यापन और अनुपालन प्लेटफ़ॉर्म है, जिसे तौलने और मापने वाले उपकरणों के सत्यापन को सरल बनाने के लिए तैयार किया गया है।",

            introP2:
                "इसके माध्यम से उपकरण मालिकों, कानूनी मापविज्ञान अधिकारियों (LMOs), GATCs, विभागों और उपभोक्ताओं को एक ही प्रणाली से जोड़ा जाता है।",

            introP3:
                "उपकरण पंजीकरण और आवेदन से लेकर शेड्यूलिंग, फील्ड सत्यापन, अनुमोदन और डिजिटल प्रमाणन तक पूरी प्रक्रिया को अधिक व्यवस्थित और ट्रेस करने योग्य बनाया जाता है।",

            lifecycleTitle:
                "पूर्ण सत्यापन जीवनचक्र",

            lifecycleText:
                "पंजीकरण → आवेदन → शेड्यूलिंग → सत्यापन → अनुमोदन → प्रमाणन → निगरानी",


            capabilityTag:
                "मुख्य क्षमताएँ",

            capabilityTitle:
                "पारदर्शी और|ट्रेस करने योग्य सत्यापन के लिए",

            capabilityDescription:
                "SahiMaap डिजिटल पहचान, सत्यापन और अनुपालन को एक ही प्रणाली में जोड़ता है।",

            cap1Title:
                "स्थायी QR पहचान",

            cap1Text:
                "प्रत्येक उपकरण को उसके सत्यापन रिकॉर्ड से जुड़ी स्थायी QR-आधारित डिजिटल पहचान दी जाती है।",

            cap2Title:
                "नियम-आधारित सत्यापन",

            cap2Text:
                "सत्यापन को लागू नियमों और डिजिटल रूप से परिभाषित परीक्षणों के आधार पर निर्देशित किया जा सकता है।",

            cap3Title:
                "ऑफलाइन फील्ड सहायता",

            cap3Text:
                "कम या बिना कनेक्टिविटी वाले क्षेत्रों में फील्ड डेटा दर्ज किया जा सकता है और बाद में सिंक्रोनाइज़ किया जा सकता है।",

            cap4Title:
                "वैधता निगरानी",

            cap4Text:
                "सत्यापन की वैधता और पुनः सत्यापन की आवश्यकताओं को पूरे जीवनचक्र में ट्रैक किया जा सकता है।",


            workflowTag:
                "सहीमाप कैसे काम करता है",

            workflowTitle:
                "एक सरल डिजिटल सत्यापन यात्रा",

            workflowDescription:
                "सत्यापन प्रक्रिया का प्रत्येक चरण जुड़ा हुआ और ट्रेस करने योग्य रहता है।",

            step1Title:
                "पंजीकरण",

            step1Text:
                "उपकरण",

            step2Title:
                "आवेदन",

            step2Text:
                "आवेदन प्रक्रिया",

            step3Title:
                "शेड्यूल",

            step3Text:
                "सत्यापन",

            step4Title:
                "सत्यापन",

            step4Text:
                "फील्ड जाँच",

            step5Title:
                "अनुमोदन",

            step5Text:
                "समीक्षा",

            step6Title:
                "प्रमाणन",

            step6Text:
                "प्रमाणपत्र",

            step7Title:
                "निगरानी",

            step7Text:
                "वैधता",


            stakeholderTag:
                "एक जुड़ा हुआ पारिस्थितिकी तंत्र",

            stakeholderTitle:
                "सभी संबंधित पक्षों को जोड़ना",

            stake1Title:
                "उपकरण मालिक",

            stake1Text:
                "उपकरण पंजीकृत करें, आवेदन जमा करें और सत्यापन प्रमाणपत्र प्राप्त करें।",

            stake2Title:
                "LMOs और GATCs",

            stake2Text:
                "शेड्यूलिंग, फील्ड सत्यापन, निरीक्षण और रिकॉर्ड का प्रबंधन करें।",

            stake3Title:
                "विभाग",

            stake3Text:
                "सत्यापन स्थिति, वैधता और गतिविधियों की बेहतर जानकारी प्राप्त करें।",

            stake4Title:
                "उपभोक्ता",

            stake4Text:
                "QR-आधारित सत्यापन के माध्यम से उपकरण की सत्यापन जानकारी प्राप्त करें।",


            goalTag:
                "हमारा लक्ष्य",

            goalTitle:
                "अधिक कुशल।|अधिक पारदर्शी।|अधिक विश्वसनीय।",

            goalP1:
                "प्रत्येक उपकरण को स्थायी QR-आधारित डिजिटल पहचान दी जाती है, जिससे उसकी सत्यापन स्थिति, प्रमाणपत्र और इतिहास को आसानी से देखा जा सकता है।",

            goalP2:
                "SahiMaap इन क्षमताओं को एक साथ लाकर सत्यापन को अधिक कुशल, पारदर्शी और विश्वसनीय बनाने में सहायता करता है।"

        },


        /* =================================================
           BENGALI
        ================================================= */

        bn: {

            aboutTag:
                "SahiMaap সম্পর্কে",

            heroTitle:
                "লিগ্যাল মেট্রোলজিকে|সহজ, স্পষ্ট ও সংযুক্ত করা",

            heroDescription:
                "SahiMaap একটি ডিজিটাল প্ল্যাটফর্ম, যা ওজন ও পরিমাপের যন্ত্রের যাচাই এবং সার্টিফিকেশন প্রক্রিয়াকে সহজ করার জন্য তৈরি করা হয়েছে।",

            heroPoint:
                "নিবন্ধন, যাচাই, সার্টিফিকেশন ও কমপ্লায়েন্সের জন্য একটি সংযুক্ত প্ল্যাটফর্ম।",

            cardTitle:
                "ডিজিটাল যন্ত্র পরিচয়",

            verified:
                "যাচাইকৃত",

            instrumentLabel:
                "যন্ত্র",

            weighingInstrument:
                "ওজন মাপার যন্ত্র",

            statusLabel:
                "অবস্থা",

            identityLabel:
                "পরিচয়",

            permanentQr:
                "স্থায়ী QR",

            qrTitle:
                "একটি যন্ত্র → একটি ডিজিটাল পরিচয়",

            qrDescription:
                "যাচাই সার্টিফিকেট এবং ইতিহাস যন্ত্রটির সঙ্গে সংযুক্ত থাকে।",


            introTag:
                "SahiMaap কী?",

            introTitle:
                "লিগ্যাল মেট্রোলজি যাচাইয়ের জন্য|একটি সংযুক্ত প্ল্যাটফর্ম",

            introP1:
                "SahiMaap একটি ডিজিটাল লিগ্যাল মেট্রোলজি যাচাই ও কমপ্লায়েন্স প্ল্যাটফর্ম, যা ওজন ও পরিমাপের যন্ত্রের যাচাই প্রক্রিয়াকে সহজ করার জন্য তৈরি করা হয়েছে।",

            introP2:
                "এর মাধ্যমে যন্ত্রের মালিক, লিগ্যাল মেট্রোলজি অফিসার (LMO), GATC, বিভাগ এবং ভোক্তাদের একটি সংযুক্ত ব্যবস্থার মাধ্যমে একত্রিত করা হয়।",

            introP3:
                "যন্ত্র নিবন্ধন ও আবেদন থেকে শুরু করে সময় নির্ধারণ, ফিল্ড যাচাই, অনুমোদন এবং ডিজিটাল সার্টিফিকেশন পর্যন্ত পুরো প্রক্রিয়াকে আরও সংগঠিত ও ট্রেসযোগ্য করা হয়।",

            lifecycleTitle:
                "সম্পূর্ণ যাচাই জীবনচক্র",

            lifecycleText:
                "নিবন্ধন → আবেদন → সময় নির্ধারণ → যাচাই → অনুমোদন → সার্টিফিকেশন → পর্যবেক্ষণ",


            capabilityTag:
                "মূল সক্ষমতা",

            capabilityTitle:
                "স্বচ্ছ ও|ট্রেসযোগ্য যাচাইয়ের জন্য",

            capabilityDescription:
                "SahiMaap ডিজিটাল পরিচয়, যাচাই এবং কমপ্লায়েন্সকে একটি ব্যবস্থার মধ্যে সংযুক্ত করে।",

            cap1Title:
                "স্থায়ী QR পরিচয়",

            cap1Text:
                "প্রতিটি যন্ত্রকে তার যাচাই রেকর্ডের সঙ্গে যুক্ত একটি স্থায়ী QR-ভিত্তিক ডিজিটাল পরিচয় দেওয়া হয়।",

            cap2Title:
                "নিয়ম-ভিত্তিক যাচাই",

            cap2Text:
                "প্রযোজ্য নিয়ম এবং ডিজিটালভাবে নির্ধারিত পরীক্ষার মাধ্যমে যাচাই প্রক্রিয়াকে পরিচালনা করা যায়।",

            cap3Title:
                "অফলাইন ফিল্ড সহায়তা",

            cap3Text:
                "কম বা কোনও সংযোগ না থাকা এলাকাতেও ফিল্ড ডেটা রেকর্ড করা যায় এবং পরে সিঙ্ক্রোনাইজ করা যায়।",

            cap4Title:
                "বৈধতা পর্যবেক্ষণ",

            cap4Text:
                "যাচাইয়ের বৈধতা এবং পুনরায় যাচাইয়ের প্রয়োজনীয়তাগুলি পুরো জীবনচক্র জুড়ে ট্র্যাক করা যায়।",


            workflowTag:
                "SahiMaap কীভাবে কাজ করে",

            workflowTitle:
                "একটি সহজ ডিজিটাল যাচাই যাত্রা",

            workflowDescription:
                "যাচাই প্রক্রিয়ার প্রতিটি ধাপ সংযুক্ত এবং ট্রেসযোগ্য থাকে।",

            step1Title:
                "নিবন্ধন",

            step1Text:
                "যন্ত্র",

            step2Title:
                "আবেদন",

            step2Text:
                "আবেদন",

            step3Title:
                "সময় নির্ধারণ",

            step3Text:
                "যাচাই",

            step4Title:
                "যাচাই",

            step4Text:
                "ফিল্ড পরীক্ষা",

            step5Title:
                "অনুমোদন",

            step5Text:
                "পর্যালোচনা",

            step6Title:
                "সার্টিফিকেশন",

            step6Text:
                "সার্টিফিকেট",

            step7Title:
                "পর্যবেক্ষণ",

            step7Text:
                "বৈধতা",


            stakeholderTag:
                "একটি সংযুক্ত ইকোসিস্টেম",

            stakeholderTitle:
                "সকল সংশ্লিষ্ট পক্ষকে সংযুক্ত করা",

            stake1Title:
                "যন্ত্রের মালিক",

            stake1Text:
                "যন্ত্র নিবন্ধন করুন, আবেদন জমা দিন এবং যাচাই সার্টিফিকেট দেখুন।",

            stake2Title:
                "LMO ও GATC",

            stake2Text:
                "সময় নির্ধারণ, ফিল্ড যাচাই, পর্যবেক্ষণ এবং রেকর্ড পরিচালনা করুন।",

            stake3Title:
                "বিভাগ",

            stake3Text:
                "যাচাইয়ের অবস্থা, বৈধতা এবং কার্যক্রম সম্পর্কে আরও ভালো তথ্য পান।",

            stake4Title:
                "ভোক্তা",

            stake4Text:
                "QR-ভিত্তিক যাচাইয়ের মাধ্যমে যন্ত্রের যাচাই সংক্রান্ত তথ্য দেখুন।",


            goalTag:
                "আমাদের লক্ষ্য",

            goalTitle:
                "আরও দক্ষ।|আরও স্বচ্ছ।|আরও বিশ্বাসযোগ্য।",

            goalP1:
                "প্রতিটি যন্ত্রকে একটি স্থায়ী QR-ভিত্তিক ডিজিটাল পরিচয় দেওয়া হয়, যার মাধ্যমে তার যাচাইয়ের অবস্থা, সার্টিফিকেট এবং ইতিহাস সহজে দেখা যায়।",

            goalP2:
                "SahiMaap এই সক্ষমতাগুলিকে একত্রিত করে যাচাই প্রক্রিয়াকে আরও দক্ষ, স্বচ্ছ এবং বিশ্বাসযোগ্য করতে সহায়তা করে।"

        }

    };



    /* =====================================================
       APPLY LANGUAGE
    ===================================================== */

    function applyLanguage(language) {

        const content =
            translations[language];

        if (!content) {
            return;
        }


        document.documentElement
            .setAttribute("lang", language);


        document
            .querySelectorAll("[data-i18n]")
            .forEach(function (element) {

                const key =
                    element.getAttribute("data-i18n");

                if (!content[key]) {
                    return;
                }


                const value =
                    content[key];


                if (value.includes("|")) {

                    element.innerHTML =
                        value
                            .split("|")
                            .map(function (part) {
                                return part.trim();
                            })
                            .join("<br>");

                } else {

                    element.textContent =
                        value;

                }

            });


        document
            .querySelectorAll(".language-btn")
            .forEach(function (button) {

                button.classList.remove("active");

            });


        const activeButton =
            document.querySelector(
                '.language-btn[data-lang="' +
                language +
                '"]'
            );


        if (activeButton) {

            activeButton.classList.add("active");

        }


        localStorage.setItem(
            "sahimaapLanguage",
            language
        );

    }



    /* =====================================================
       LANGUAGE BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".language-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const language =
                        button.getAttribute("data-lang");

                    applyLanguage(language);

                }
            );

        });



        /* =====================================================
       LOAD SAVED LANGUAGE
    ===================================================== */

    const savedLanguage =
        localStorage.getItem(
            "sahimaapLanguage"
        );


    if (
        savedLanguage &&
        translations[savedLanguage]
    ) {

        applyLanguage(savedLanguage);

    } else {

        applyLanguage("en");

    }


    /* =====================================================
       HIDE ABOUT LINK ONLY ON ABOUT PAGE
       ABOUT LINK REMAINS VISIBLE ON ALL OTHER PAGES
    ===================================================== */

    function hideAboutLinkOnCurrentPage() {

        const navLinks =
            document.querySelector(".nav-links");

        if (!navLinks) {
            return;
        }

        const links =
            navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            const text =
                link.textContent
                    .trim()
                    .toLowerCase();

            const href =
                (
                    link.getAttribute("href") || ""
                ).toLowerCase();

            if (
                text === "about" ||
                href === "about.html" ||
                href === "./about.html" ||
                href.endsWith("/about.html")
            ) {

                link.style.display = "none";

            }

        });

    }


    /* =====================================================
       CHECK HEADER AFTER IT IS LOADED
    ===================================================== */

    hideAboutLinkOnCurrentPage();


    const headerContainer =
        document.getElementById("header-container");


    if (headerContainer) {

        const headerObserver =
            new MutationObserver(function () {

                hideAboutLinkOnCurrentPage();

            });


        headerObserver.observe(
            headerContainer,
            {
                childList: true,
                subtree: true
            }
        );

    }

});