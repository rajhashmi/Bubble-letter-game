//Creating Elements
let main = document.querySelector("#gameContainer");
let mistakes = document.querySelector("#mistakes");
let score = document.querySelector("#score");
const letters = "abcdefghijklmnopqrstuvwxyz";
let scoreN = 0;
let mistakesN = 0;
let mistakeLimit = 6;
let ID = 1;
//Function

function get_random_number(min, max) {
  return Math.random() * (max - min) + min;
}

let bubbleMaker = setInterval(() => {
  let bubble = document.createElement("div");
  let bubble_id = letters[Math.floor(Math.random() * letters.length)];
  bubble.classList.add("bubble");
  bubble.style.left = `${Math.random() * (main.offsetWidth - 50)}px`;
  bubble.textContent = bubble_id;
  bubble.id = ID;
  main.appendChild(bubble);
  animateBubble(bubble, ID);
  ID++;
}, 1000);

function animateBubble(bubble, id) {
  const randomSpeed = get_random_number(6, 14);
  const element_ID = id;
  let num = 0;
  bubble.interval = setInterval(() => {
    let isPresentElement = document.getElementById(element_ID);
    let id_Present;
    
    if (isPresentElement) {
        id_Present = isPresentElement.id;
    } else {
        id_Present = undefined;
    }
    
    if (id_Present) {
        if (num < main.offsetHeight) {
            isPresentElement.style.bottom = `${num++}px`;
        } else {
            mistakesN++;
            mistakes.textContent = `Mistake: ${mistakesN}`;
            main.removeChild(isPresentElement);
            clearInterval(bubble.interval);

            if (mistakesN >= mistakeLimit) {
                clearInterval(bubbleMaker);
                removeBubblesImmediately();
            }

            return "div Deleted";
        }
    } else {
        clearInterval(bubble.interval);
    }
}, randomSpeed);

}      
                           
function removeBubblesImmediately() {
  const all_elements = document.querySelectorAll(".bubble");
  all_elements.forEach((element) => {
      remove_Bubble_Child(element);
  });
}

function remove_Bubble_Child(bubble_element) {
  main.removeChild(bubble_element);
}

window.addEventListener("keydown", (e) => {
  let keyPress = e.key;
  const all_elements = document.querySelectorAll(".bubble");
  if (all_elements.length > 0) {
    all_elements.forEach((element) => {
      if (keyPress === element.textContent) {
        remove_Bubble_Child(element);
        scoreN++
        score.textContent = `Scrore: ${scoreN}`
      }
    });
  }
  console.log(all_elements);
});
