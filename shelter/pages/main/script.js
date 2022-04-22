import petCards from '../data/pets.json' assert { type: 'json'};

const headerListItems = document.querySelectorAll('.header__item');
const burgerIcon = document.querySelector('.hamburger-lines');
const popupMenu = document.querySelector('.pop-up-menu');
const header = document.querySelector('.header');
const body = document.querySelector('.body');
const popupItems = document.querySelectorAll('.popup__item');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector(".arrow-left");
const ourFriendsItem = document.querySelectorAll('.our-friends__item');


// !!burger 

const emptySpaceClose = e => e.target.classList.contains('black-bg') ? burgerToggle() : null;
let burgerState = false;
let bodyListener = null;

const burgerToggle = () => {
  burgerState = !burgerState;
  burgerIcon.classList.toggle('burger-flip');
  header.classList.toggle('header-pets-change');
  popupMenu.classList.toggle('popup-right');
  body.classList.toggle('scroll-disable');
  body.classList.toggle('black-bg');

  if (burgerState) {
    body.addEventListener('click', emptySpaceClose);
  } else {
    body.removeEventListener('click', emptySpaceClose);
  }
}

burgerIcon.addEventListener('click', burgerToggle);

popupItems.forEach(x => x.addEventListener('click', burgerToggle));



// !!carousel

// shows the number of how many cards we add on the page

const cardsToShow = (wid) => {
  return wid >= 1280 ? 3 : wid >= 768 ? 2 : 1
}

let width = window.innerWidth;
let countOfShownCards = cardsToShow(width);

// function that randomize the order of pets card

function shufflePetsOrder(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

let shuffle = shufflePetsOrder(petCards);

// set imgs

let currentInd = 0;

const setCards = (count, dir) => {
  if (dir === -1) {
    currentInd = (shuffle.length + currentInd - count * 2) % shuffle.length
  }
  for (let i = 0; i < count; i++) {
    const item = shuffle[currentInd];
    currentInd += 1;
    if (currentInd > petCards.length - 1) currentInd = 0;
    const itemContent =
      `
    <img src="${item["img"]}" alt="${item["name"]}" class="our-friends__item-img">
    <h4 class="our-friends__item-title">${item["name"]}</h4>
    <button class="our-friends__item-button btn2">Learn more</button>
    `
    ourFriendsItem[i].innerHTML = itemContent
  }
}



const sameImageCheckerOnResize = () => {
  const a = ourFriendsItem[0].childNodes[3].innerHTML;
  const y = ourFriendsItem[1].childNodes[3].innerHTML;
  const x = ourFriendsItem[2].childNodes[3].innerHTML;

  const changedWidth = cardsToShow(window.innerWidth)

  return a === y || a === x || x === y || changedWidth !== countOfShownCards;
}


window.addEventListener('resize', () => {
  if (sameImageCheckerOnResize()) {
    const startPoint = ourFriendsItem[0].childNodes[3].innerHTML
    for (let i = 0; i < shuffle.length; i++) {
      if (startPoint === shuffle[i].name) {
        countOfShownCards = cardsToShow(window.innerWidth);
        currentInd = i;
        setCards(3);
        currentInd = i;
        setCards(countOfShownCards);
      }
    }
  }
})

setCards(countOfShownCards, 1);

arrowRight.addEventListener('click', () => {
  countOfShownCards = cardsToShow(window.innerWidth);
  setCards(countOfShownCards, 1);
})

arrowLeft.addEventListener('click', () => {
  countOfShownCards = cardsToShow(window.innerWidth);
  setCards(countOfShownCards, -1);
})

// popup show up

ourFriendsItem.forEach(x => {
  x.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('our-friends__item-button')) {

    }
  })
})



