const wordEl = document.getElementById("word");
const wrongletterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
let words = [
  "khokho",
  "kabaddi",
  "satolia",
  "ludo",
  "pachisi",
  "kancha",
  "gillidanda",
  "kithkith",
  "mallakhamb",
  "cricket",
  "baseball",
  "pool",
  "golf",
  "pyramids",
  "carom",
  "socer",
  "basketball",
  "tenis",
  "volleyball",
  "badminton",
  "boxing",
  "tabletennis",
  "karate",
  "judo",
  "darts",
  "bowling",
  "archery",
  "apple",
  "banana",
  "apricots",
  "avacado",
  "blackberries",
  "breadfruit",
  "cantaloupe",
  "carambola",
  "clementine",
  "coconut meat",
  "custardapple",
  "datefruit",
  "feijioa",
  "figs",
  "grapes",
  "guava",
  "jackfruit",
  "javaplum",
  "kiwi",
  "lemon",
  "longan",
  "lychee",
  "mango",
  "olives",
  "papaya",
  "orange",
  "pear",
  "pitaya",
  "pineapple",
  "watermelon"
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
          <span class="letter"=>
          ${correctLetters.includes(letter) ? letter : ""}
          </span>`
    )
    .join(" ")}`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You Won!";
    popup.style.display = "flex";
  }
}
//displayWord();
//update wrong letters
function updateWrongLettersEl() {
  wrongletterEl.innerHTML = `${wrongLetters.length > 0 ? `<p>wrong</p>` : ""}
          ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;
  //display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you are Lost!";
    popup.style.display = "flex";
  }
}
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
//keydown press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    //push letter if it is not already there on correct position
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});
playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});
displayWord();