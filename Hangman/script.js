// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);
//console.log(lettersArray);

// select letters container
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");
  // create text node
  let theLetter = document.createTextNode(letter);
  // append text node to span
  span.appendChild(theLetter);
  // add class to span
  span.className = "letter-box";
  // append span to letters container
  lettersContainer.appendChild(span);
}); 

// object of words
const words = {
  programming:["php","javascript","go","scala","fortran","r","mysql","python"],
  movies:["prestige","inception","parasite","interstellar","whiplash","memento","coco","up"],
  people:["albert einstein","hitchcock","alexander","cleopatra","Mahatma Gandhi"],
  countries:["syria","palestine","yemen","egypt","bahrain","qatar"]
}

//get random property

let allKeys = Object.keys(words);


// random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// category
let randomPropName = allKeys[randomPropNumber];

// the length of the keys 0 to 3 -- category words
let randomPropValue = words[randomPropName];


// the length of the string of the 4 keys 0 to 7-- random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// let randomValueValue = words[randomPropName][randomValueNumber]; same 
let randomValueValue = randomPropValue[randomValueNumber];
console.log(randomValueValue);

// set category info 
document.querySelector(".game-info .category span").innerHTML = randomPropName;


// select letters-guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);
console.log(lettersAndSpace);

// create spans depend on word
lettersAndSpace.forEach(letter => {

  // create empty span 
  let emptySpan = document.createElement("span");

  // if letter is space
    if (letter === ' ' ) {

      //add class to the span
      emptySpan.className = 'with-space';
    }

    // append span to the letters guess container
    lettersGuessContainer.appendChild(emptySpan);
})


// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts 
let wrongAttempts = 0;

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters
document.addEventListener("click", function(e) { 
  
   // set the chose status 
    let theStatus = false;
  if(e.target.className === 'letter-box'){

    e.target.classList.add("clicked");

    // get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    //console.log(lettersAndSpace);
    
    theChosenWord.forEach((wordLetter, wordIndex) => {

      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordLetter){

        //set status to correct      
        theStatus = true;

        // loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          
          if (wordIndex === spanIndex){
            span.innerHTML = theClickedLetter;
          }
        });

         // console.log(`Found At Index Number ${index}`);
      }

    });
    // outside Loop 
    console.log(theStatus);

    //if the letter is wrong
    if (theStatus !== true) {

      //increase the wrong attempts
      wrongAttempts++;
  
      //add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      
      // play fail sound
      document.getElementById("fail").play();
      
      if (wrongAttempts === 8){

        endGame();

        lettersContainer.classList.add("finished");
      }
      
    }else{
    // play fail success sound
    document.getElementById("success").play();
    }
  }
});


// endgame function
function endGame() {

  //popup div
  let div = document.createElement("div");
  let btnReplay = document.createElement("button");
  let textReplay =document.createTextNode(`Restart The Game `);
  btnReplay.appendChild(textReplay);


  // create text
  let divText = document.createTextNode(`Game Over, The word Is ${randomValueValue}`);

  // append text to div
  div.appendChild(divText);

  // add class on div
  div.className = 'popup';

  //append to the body
  document.body.appendChild(div);
  btnReplay.classList.add("rePlay");
  document.body.appendChild(btnReplay);
  btnReplay.addEventListener("click" ,function(){
  window.location.reload();
  

  })

}









