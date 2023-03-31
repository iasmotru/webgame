const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;             //убирает лаг с двойным нажатием на одну карту
    this.classList.add('flip');
    if (!hasFlippedCard)
        {hasFlippedCard = true;
        firstCard = this;}
    else
        {hasFlippedCard = false;
        secondCard = this;

        //совпадают ли карты?
        checkForMatch()
    }
}

//проверка на совпадение
function checkForMatch() {
    if (firstCard.dataset.type ===
        secondCard.dataset.type) {         //карты совпадают
        disableCards();                         //больше не кликабельные
    } else {                                    //карты не совпадают
        unflipCards();                          //переворачиваются обратно
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    lockBoard = false;
}

//перевернуть несовпадающие карты обратно
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
    }, 1500);
}

//рандомайзер
(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));