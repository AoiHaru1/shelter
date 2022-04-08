const headerListItems = document.querySelectorAll('.header__item');

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
