const burgerIcon = document.querySelector('.hamburger-lines');
const popupMenu = document.querySelector('.pop-up-menu');
const header = document.querySelector('.header');


burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('burger-flip');
  header.classList.toggle('header-pets-change');
  popupMenu.classList.toggle('popup-right');
})