// Page switching and the small interactions for the three screens.
document.getElementById("question-text").textContent = websiteInfo.question;
const pages = document.querySelectorAll(".page");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const snowPile = document.getElementById("snow-pile");
let noClicks = 0;

function showPage(number) {
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById("page-" + number).classList.add("active");
}

yesButton.addEventListener("click", () => showPage("two"));

document.getElementById("next-page").addEventListener("click", () => showPage("three"));
document.getElementById("back-page").addEventListener("click", () => showPage("two"));

noButton.addEventListener("click", () => {
  noClicks++;
  if (noClicks < 5) {
    // Keep the button within the screen while it dodges.
    const maxX = Math.max(20, window.innerWidth - noButton.offsetWidth - 20);
    const maxY = Math.max(20, window.innerHeight - noButton.offsetHeight - 20);
    noButton.style.position = "fixed";
    noButton.style.left = Math.floor(Math.random() * maxX) + "px";
    noButton.style.top = Math.floor(Math.random() * maxY) + "px";
    noButton.classList.add("dodging");
  } else {
  noButton.classList.add("burst");

  setTimeout(() => {
    noButton.style.visibility = "hidden";
  }, 250);
}
});

function makeSnowBurst() {
  for (let i = 0; i < 22; i++) {
    const flake = document.createElement("span");
    flake.className = "burst-flake";
    flake.style.setProperty("--x", (Math.random() * 220 - 110) + "px");
    flake.style.setProperty("--y", (Math.random() * -150 - 20) + "px");
    document.querySelector("#page-one .question-content").appendChild(flake);
    setTimeout(() => flake.remove(), 950);
  }
}
// Load the memory cards from config.js.
const thumbnails = document.getElementById("memory-thumbnails");
const memoryTitle = document.getElementById("memory-title");
const memoryMessage = document.getElementById("memory-message");
const mainPhoto = document.getElementById("main-photo");
const mainVideo = document.getElementById("main-video");

function selectMemory(index) {
  const memory = websiteInfo.memories[index];
  memoryTitle.textContent = memory.title;
  memoryMessage.textContent = memory.message;
  mainVideo.pause();
  mainVideo.hidden = true;
  mainPhoto.hidden = false;

  if (memory.type === "video") {
    mainVideo.src = memory.file;
    mainVideo.hidden = false;
    mainPhoto.hidden = true;
  } else {
    mainPhoto.src = memory.file;
  }

  document.querySelectorAll(".memory-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("selected", i === index);
  });
}


websiteInfo.memories.forEach((memory, index) => {
  const card = document.createElement("button");
  card.className = "memory-thumb";
  card.type = "button";
  card.innerHTML = `<img src="${memory.file}" alt="Memory ${index + 1}"><span>${memory.title}</span>`;
  card.addEventListener("click", () => selectMemory(index));
  thumbnails.appendChild(card);
});
selectMemory(0);

// Letter opening/closing sequence. CSS handles the visual movement.
const letterOverlay = document.getElementById("letter-overlay");
const letterPaper = document.getElementById("letter-paper");
document.getElementById("letter-text").textContent = websiteInfo.letter;
document.getElementById("letter-signature").textContent = websiteInfo.signature;
document.querySelector(".letter-inside-photo img").src = websiteInfo.letterPhoto;

document.getElementById("open-letter").addEventListener("click", () => {
  letterOverlay.classList.add("open");
  document.body.classList.add("letter-open");
});
document.getElementById("close-letter").addEventListener("click", () => {
  letterOverlay.classList.remove("open");
  document.body.classList.remove("letter-open");
});
