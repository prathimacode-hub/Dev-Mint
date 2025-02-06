const buttonColors = ["red", "green", "blue", "yellow"];

let level = 0;
let isStarted = false;
let sequencePattern = [];
let userSequencePattern = [];

document.addEventListener("keypress", () => {
  if (!isStarted) {
    document.body.style.backgroundColor = "#024";
    document.getElementById("title").textContent = "Level " + level;
    nextSequence();
    isStarted = true;
  }
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const userChosenColor = this.id;
    userSequencePattern.push(userChosenColor);
    playSound(userChosenColor);
    userPress(userChosenColor);
    buttonPressCheck(userSequencePattern.length - 1);
  });
});

function buttonPressCheck(currentLevel) {
  if (sequencePattern[currentLevel] === userSequencePattern[currentLevel]) {
    if (sequencePattern.length === userSequencePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function nextSequence() {
  userSequencePattern = [];
  level++;
  document.getElementById("title").textContent = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  sequencePattern.push(randomColor);
  console.log(sequencePattern);
  const button = document.getElementById(randomColor);
  button.style.opacity = "0";
  setTimeout(() => {
    button.style.opacity = "1";
  }, 100);
  playSound(randomColor);
}

function playSound(colorName) {
  const audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}

function userPress(colorName) {
  const button = document.getElementById(colorName);
  button.classList.add("pressedButton");
  setTimeout(() => {
    button.classList.remove("pressedButton");
  }, 100);
}

function gameOver() {
  document.getElementById("title").textContent = "Game over!, press to start";
  document.body.style.backgroundColor = "red";

  restart();
}

function restart() {
  isStarted = false;
  level = 0;
  sequencePattern = [];
  userSequencePattern = [];
}
