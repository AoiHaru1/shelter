const headerListItems = document.querySelectorAll('.header__item');
const burgerIcon = document.querySelector('.hamburger-lines');
const popupMenu = document.querySelector('.pop-up-menu');
const header = document.querySelector('.header');


//active class switch in header

const activeClassRemover = selector => headerListItems.forEach(x => x.classList.remove(selector))

const delayedSwapBack = (selector) => {
  setTimeout(() => {
    activeClassRemover(selector)
    headerListItems[0].classList.add(selector)
  }, 500)
}

headerListItems[2].addEventListener('click', () => {
  activeClassRemover('active');
  headerListItems[2].classList.toggle('active');
  delayedSwapBack('active');
})

headerListItems[3].addEventListener('click', () => {
  activeClassRemover('active');
  headerListItems[3].classList.toggle('active');
  delayedSwapBack('active');
})

// burger 

burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('burger-flip');
  header.classList.toggle('header-pets-change');
  popupMenu.classList.toggle('popup-right');
})
