const burgerIcon = document.querySelector('.hamburger-lines');
const popupMenu = document.querySelector('.pop-up-menu');
const headerWrapper = document.querySelector('.header-fixer')
const header = document.querySelector('.header');
const header1 = document.querySelector('.header-fixer');
const body = document.querySelector('.body');
const popupItems = document.querySelectorAll('.popup__item');


const emptySpaceClose = e => e.target.classList.contains('black-bg') ? burgerToggle() : null;
let burgerState = false;
let bodyListener = null;

const burgerToggle = () => {
  burgerState = !burgerState;
  burgerIcon.classList.toggle('burger-flip');
  setTimeout(() => {
    header.classList.toggle('header-pets-change');
    headerWrapper.classList.toggle('header-pets-change')
  }, 350)
  popupMenu.classList.toggle('popup-right');
  body.classList.toggle('black-bg');
  body.classList.toggle('scroll-disable')

  if (burgerState) {
    body.addEventListener('click', emptySpaceClose);
  } else {
    body.removeEventListener('click', emptySpaceClose);
  }
}

burgerIcon.addEventListener('click', burgerToggle);

popupItems.forEach(x => x.addEventListener('click', burgerToggle));