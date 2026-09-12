/* =========================================
   SITEMAP DROP-DOWN FUNCTION
========================================= */

function toggleMenu(menuId, button) {

    // Get the selected menu
    const menu = document.getElementById(menuId);

    // Get arrow
    const arrow = button.querySelector(".arrow");


    // Close other menus

    const allMenus = document.querySelectorAll(".sub-menu");

    allMenus.forEach(function (item) {

        if (item.id !== menuId) {
            item.classList.remove("show");
        }

    });


    // Open / close selected menu

    menu.classList.toggle("show");


    // Change arrow direction

    if (menu.classList.contains("show")) {

        arrow.textContent = "▲";

    } else {

        arrow.textContent = "▼";

    }

}