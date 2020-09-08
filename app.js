const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let disabled = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleClick);
    gameContainer.append(newDiv);
  }
}

const handleClick = (e) => {
  if (disabled) {
    return;
  }
  if (e.target.classList.contains("flipped")) {
    return;
  }

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    disabled = true;
    let card1Class = card1.className;
    let card2Class = card2.className;
    if (card1Class === card2Class) {
      cardsFlipped = cardsFlipped + 2;
      card1.removeEventListener("click", handleClick);
      card2.removeEventListener("click", handleClick);
      card1 = null;
      card2 = null;
      disabled = false;
    } else {
      setTimeout(() => {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        disabled = false;
      }, 1500);
    }
  }
  if (cardsFlipped === COLORS.length) {
    alert("game over!");
    createDivsForColors(shuffledColors);
  }
};

createDivsForColors(shuffledColors);
