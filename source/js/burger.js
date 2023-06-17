const burgerSelector = ".menu-primary-container";
const menuSelector = ".menu";
const burgerToggleClass = "js-menu-open";

const burger = document.querySelector(burgerSelector);
const menu = document.querySelector(menuSelector);

if (burger && menu) {
  burger.addEventListener('click', function () {
    menu.classList.toggle(burgerToggleClass);
  })
}
