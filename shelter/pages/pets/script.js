import petCards from '../data/pets.js'

document.addEventListener('DOMContentLoaded', () => {
  const burgerIcon = document.querySelector('.hamburger-lines');
  const popupMenu = document.querySelector('.pop-up-menu');
  const headerWrapper = document.querySelector('.header-fixer')
  const header = document.querySelector('.header');
  const header1 = document.querySelector('.header-fixer');
  const body = document.querySelector('.body');
  const popupItems = document.querySelectorAll('.popup__item');
  const ourFriendsItem = document.querySelectorAll('.our-friends__item');
  const modalWindow = document.querySelector('.module-window');


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



  //popup sjow

  const searchObject = petName => {
    for (let i = 0; i < petCards.length; i++) {
      if (petCards[i]["name"] === petName) {
        return petCards[i]
      }
    }
  }

  ourFriendsItem.forEach(x => {
    x.addEventListener('click', (e) => {
      const target = e.target;
      let name = target

      if (target.classList.contains('our-friends__item')) {
        name = target.childNodes[3].innerHTML
      } else {
        name = target.parentNode.childNodes[3].innerHTML
      }

      const rightObject = searchObject(name);
      modalWindow.innerHTML =
        `
      <div class="inner">
      <img src="${rightObject["img"]}" alt="${rightObject["name"]}">
      <div class="module-text-block">
        <h2 class="module-title">${rightObject["name"]}</h2>
        <h3 class="module-subtitle">${rightObject["type"]} - ${rightObject["breed"]}</h3>
        <p class="module-description">${rightObject["description"]}</p>
        <ul class="module-chars">
          <li class="module-char">Age: <span>${rightObject["age"]}</span></li>
          <li class="module-char">Inoculations: <span>${rightObject["inoculations"]}</span></li>
          <li class="module-char">Diseases: <span>${rightObject["diseases"]}</span></li>
          <li class="module-char">Parasites: <span>${rightObject["parasites"]}</span></li>
        </ul>
      </div>
    </div>
    <div class="close-btn">
      <img class="close" src="../../assets/icons/module-close.png" alt="close">
    </div>
      `
      modalWindow.classList.toggle('fixed-toggle')
      body.classList.toggle('scroll-disable');
      body.classList.toggle('black-bg');
    })
  })

  document.addEventListener('click', (e) => {
    if (body.classList.contains('black-bg')) {
      if (e.target.classList.contains('close')
        || e.target.classList.contains('black-bg')
        || e.target.classList.contains('module-window')
        || e.target.classList.contains('close-btn')) {
        modalWindow.classList.toggle('fixed-toggle')
        body.classList.toggle('scroll-disable');
        body.classList.toggle('black-bg');
      }
    }
  })



  // pagination

  const shuffleArray = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  // shuffleArray(array) !

  const getPages = function (array, numOfPages) {
    const items = multiplyArray(array, 6),
      pages = [],
      itemsPerPage = items.length / numOfPages;
    for (let i = 0; i < numOfPages; i++) {
      pages.push(addPage(pages[i - 1] || [], items, itemsPerPage));
    }
    if (items.length) {
      return getPages(array, numOfPages);
    }
    return pages;

    function addPage(prevPage, items, itemsPerPage) {
      const page = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (page.indexOf(item) === -1 && prevPage[page.length] !== item) {
          page.push(...items.splice(i, 1))
          if (page.length === itemsPerPage) {
            break;
          }
          i = -1;
        }
      }
      return page;
    }
  }


  function multiplyArray(array, num) {
    const template = [...array];
    for (let i = 1; i < num; i++) {
      array = [...array, ...shuffleArray(template)];
    }
    return array;
  }

  const btnToLastPage = document.querySelector('.btn-nextdbl');
  const btnNext = document.querySelector('.btn-next');
  const btnToFirstPage = document.querySelector('.btn-prevdbl');
  const btnPrev = document.querySelector('.btn-prev');
  const currentPageNum = document.querySelector('.current-page span');
  const ourFriendItems = document.querySelectorAll('.our-friends__item');

  const arrOfIndexes = shuffleArray(petCards.map((_, i) => i));

  const setContentToCards = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      ourFriendItems[i].innerHTML =
        `
    <img src="${petCards[arr[i]]["img"]}" alt="${petCards[arr[i]]["name"]}" class="our-friends__item-img">
    <h4 class="our-friends__item-title">${petCards[arr[i]]["name"]}</h4>
    <button class="our-friends__item-btn btn2">Learn more</button>
    `
    }
  }

  const getCountOfPages = () => {
    const curWidth = window.innerWidth;
    return curWidth >= 1280 ? 6 : curWidth >= 768 ? 8 : 16;
  }

  let maximumSize = getCountOfPages();
  let currentPage = 1;

  let arrayOfPages = getPages(arrOfIndexes, maximumSize);

  setContentToCards(arrayOfPages[0])

  const limitOfPagesChecker = (num) => {
    if (num === maximumSize) {
      btnNext.classList.toggle('inactive');
      btnToLastPage.classList.toggle('inactive');
    }

    if (num === 1) {
      btnPrev.classList.toggle('inactive');
      btnToFirstPage.classList.toggle('inactive');
    }

    if (num > 1) {
      btnPrev.classList.remove('inactive');
      btnToFirstPage.classList.remove('inactive');
    }

    if (num < maximumSize) {
      btnNext.classList.remove('inactive');
      btnToLastPage.classList.remove('inactive');
    }

    if (num > 1 && num < maximumSize) {
      btnPrev.classList.remove('inactive');
      btnToFirstPage.classList.remove('inactive');
      btnNext.classList.remove('inactive');
      btnToLastPage.classList.remove('inactive');
    }
  }

  const changePageByClick = (dir, toggle) => {
    if (toggle && dir === 1) {
      currentPage = getCountOfPages();
      currentPageNum.innerHTML = currentPage;
    }
    if (toggle && dir === -1) {
      currentPage = 1;
      currentPageNum.innerHTML = currentPage;
    }
    if (!toggle && dir === 1) {
      currentPage += 1;
      currentPageNum.innerHTML = +currentPageNum.innerHTML + 1;
    }
    if (!toggle && dir === -1) {
      currentPage -= 1
      currentPageNum.innerHTML = +currentPageNum.innerHTML - 1;
    }
  }
  // buttons

  btnNext.addEventListener('click', () => {
    if (btnNext.classList.contains('inactive')) {
      return
    }
    changePageByClick(1, false);
    setContentToCards(arrayOfPages[currentPage - 1])
    limitOfPagesChecker(currentPage);
  })

  btnToLastPage.addEventListener('click', () => {
    if (btnNext.classList.contains('inactive')) {
      return
    }
    changePageByClick(1, true)
    setContentToCards(arrayOfPages[currentPage - 1])
    limitOfPagesChecker(currentPage);
  })

  btnPrev.addEventListener('click', () => {
    if (btnPrev.classList.contains('inactive')) {
      return
    }
    changePageByClick(-1, false)
    setContentToCards(arrayOfPages[currentPage - 1])
    limitOfPagesChecker(currentPage);
  })

  btnToFirstPage.addEventListener('click', () => {
    if (btnPrev.classList.contains('inactive')) {
      return
    }
    changePageByClick(-1, true);
    setContentToCards(arrayOfPages[currentPage - 1])
    limitOfPagesChecker(currentPage);
  })

  window.addEventListener('resize', () => {
    const changeCount = getCountOfPages()
    if (changeCount !== maximumSize) {
      currentPage = 1;
      maximumSize = changeCount;
      arrayOfPages = getPages(arrOfIndexes, maximumSize);
      setContentToCards(arrayOfPages[0])
      currentPageNum.innerHTML = currentPage;
      if (!btnPrev.classList.contains('inactive')) {
        btnPrev.classList.add('inactive')
        btnToFirstPage.classList.add('inactive')
        btnNext.classList.remove('inactive')
        btnToLastPage.classList.remove('inactive')
      }
    }
  })
})
