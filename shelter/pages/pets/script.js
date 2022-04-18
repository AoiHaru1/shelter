const burgerIcon = document.querySelector('.hamburger-lines');
const popupMenu = document.querySelector('.pop-up-menu');
const header = document.querySelector('.header');
const body = document.querySelector('.body');
const popupItems = document.querySelectorAll('.popup__item');


const burgerToggle = () => {
  burgerIcon.classList.toggle('burger-flip');
  header.classList.toggle('header-pets-change');
  popupMenu.classList.toggle('popup-right');
  body.classList.toggle('black-bg')
}

burgerIcon.addEventListener('click', burgerToggle);

popupItems.forEach(x => x.addEventListener('click', burgerToggle))