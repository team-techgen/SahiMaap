// =========================================================
// SahiMaap — FOOTER
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const footerContainer = document.getElementById("footer-container");

    if (!footerContainer) {
        return;
    }

    fetch("footer.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load footer.html");
            }

            return response.text();

        })

        .then(data => {

            footerContainer.innerHTML = data;

        })

        .catch(error => {

            console.error("Footer loading error:", error);

        });

});