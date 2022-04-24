import petCards from '../data/pets.json' assert { type: 'json'};

const burgerIcon = document.querySelector('.hamburger-lines');
const popupMenu = document.querySelector('.pop-up-menu');
const header = document.querySelector('.header');
const body = document.querySelector('.body');
const popupItems = document.querySelectorAll('.popup__item');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector(".arrow-left");
const ourFriendsItem = document.querySelectorAll('.our-friends__item');
const modalWindow = document.querySelector('.module-window')


// !!burger 

let burgerState = false;
let bodyListener = null;

const emptySpaceClose = (e) =>{
  e.target.classList.contains('black-bg') && burgerState ? burgerToggle() : null;
} 

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

const setToRight = () => {
  for (let i = 0; i < ourFriendsItem.length; i++) {
    ourFriendsItem[i].style.transition = "none"
    ourFriendsItem[i].classList.remove('turn-left');
    ourFriendsItem[i].classList.add('carousel-swap');
    setTimeout(() => {
      ourFriendsItem[i].style.transition = "right 0.2s ease-out"
      ourFriendsItem[i].classList.remove('carousel-swap');
    }, 10)
  }
}

const setToLeft = () => {
  for (let i = 0; i < ourFriendsItem.length; i++) {
    ourFriendsItem[i].style.transition = "none"
    ourFriendsItem[i].classList.remove('carousel-swap');
    ourFriendsItem[i].classList.add('turn-left');
    setTimeout(() => {
      ourFriendsItem[i].style.transition = "right 0.2s ease-out"
      ourFriendsItem[i].classList.remove('turn-left'); 
    }, 10)
  }
}

arrowRight.addEventListener('click', () => {
  setTimeout(() => {
    countOfShownCards = cardsToShow(window.innerWidth);
    setCards(countOfShownCards, 1);
  }, 200)

  setTimeout(() => {
    setToLeft();
  }, 210)

  for (let i = 0; i < ourFriendsItem.length; i++) {
    setTimeout(() => {
      ourFriendsItem[i].classList.add('carousel-swap')
    }, 0)
  }
})

arrowLeft.addEventListener('click', () => {
  setTimeout(() => {
    countOfShownCards = cardsToShow(window.innerWidth);
    setCards(countOfShownCards, -1);
  }, 200)

  setTimeout(() => {
    setToRight();
  }, 210)

  for (let i = 0; i < ourFriendsItem.length; i++) {
    setTimeout(() => {
      ourFriendsItem[i].classList.add('turn-left')
    }, 0)
  }
})





// popup show up

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
    console.log(name.childNodes[3])

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



