// Setting game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} Game Created By Eslam Hagras`;


//Setting Game Options

let numbersOfTries = 6;
let numberOfLitters = 6;
let currentTry = 1;
let numberOfHints = 2;

// manage words

let wordToGuess = "";
const words = ["Create","Update","Delete","Master","Branch","Mainly","Elzero","School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// manage Hints

document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);


function generateInput (){
    const inputsContainer = document.querySelector(".inputs")
    // craet Main Try Div
    for (let i = 1;i <=numbersOfTries; i++ ){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;

        if(i !== 1 ) tryDiv.classList.add("disabled-inputs");
        // Craet Inputes
        for (let j = 1 ; j <= numberOfLitters; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id=`guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    } 
    inputsContainer.children[0].children[1].focus();

    // Disable All Inputs Except First one

    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));


    const inputs = document.querySelectorAll("input");
    inputs.forEach((input , index) => {
        input.addEventListener("input",function() {
          //  console.log(index);
          const nextInput = inputs[index + 1];
        //   علشان تعمل نكس ع الحرف الى بعده لازم تمسك الاول الحرف وبعد كدة تعمل عليه فوكس
          if (nextInput) nextInput.focus();
          
        } );

         input.addEventListener("keydown",function(event) {
         //console.log(event);
            const currentIndex = Array.from(inputs).indexOf(this); /// or event.target
           // console.log(currentIndex);
           //  للى بعدده  input  علشان السهم يمن يحركك لل
           if(event.key === "ArrowRight"){
                const nextInput =currentIndex +1 ;
                if(nextInput < inputs.length ) inputs[nextInput].focus();
           }
            if(event.key === "ArrowLeft"){
                const prevInput =currentIndex -1 ;
                if(prevInput >= 0  ) inputs[prevInput].focus();
           }
    });
    });
};


const guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);

 console.log(wordToGuess);
 
function handleGuesses(){
     let successGuess = true;
     
     for (let i = 1 ; i <= numberOfLitters ; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];

        // game Logic

        if(letter === actualLetter){
            // letter is correct and in place
            inputField.classList.add("yes-in-place");


        }else if (wordToGuess.includes(letter) && letter != ""){
             // letter is correct and not in  place
            inputField.classList.add("not-in-place");
            successGuess = false;
           

        }else{
            // letter is wrong 
            inputField.classList.add("wrong");
            successGuess = false;
        }
     }

     //check if user win or lose
     if (successGuess){
        messageArea.innerHTML = `You Win The Word Is  <span> ${wordToGuess} </span> `;
        if (numberOfHints === 2){
             messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
             getHintButton.disabled=true;

        }
        

        let allTries = document.querySelectorAll(".inputs > div");
        // disable all trys
        allTries.forEach((tryDiv)=> tryDiv.classList.add("disabled-inputs"));

        // disable guessbutton  
        guessButton.disabled = true;
     }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));

        currentTry++;

        
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));

        let el = document.querySelector(`.try-${currentTry}`);
        if (el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        } else {
             guessButton.disabled = true;
             getHintButton.disabled=true;
              messageArea.innerHTML = `You Lose The Word Is  <span> ${wordToGuess} </span> `;
        }  
     }
}

 function getHint() {
    if (numberOfHints > 0 ){
       numberOfHints--;
       document.querySelector(".hint span").innerHTML = numberOfHints;
    }
      if (numberOfHints === 0 ){
         getHintButton.disabled = true;
      }

      const enabledInputs = document.querySelectorAll("input:not([disabled])");

      const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
     // console.log(emptyEnabledInputs);
      if(emptyEnabledInputs.length > 0 ){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput =emptyEnabledInputs[randomIndex];
        const indexToFill =Array.from(enabledInputs).indexOf(randomInput);

        if (indexToFill !== -1){
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }

        //   console.log(indexToFill);
        //  console.log(randomInput);
        //  console.log(randomIndex);
      }

}


function handlBackSpeace (event){
    if (event.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if (currentIndex > 0){
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();


        }
    }

}
document.addEventListener("keydown",handlBackSpeace);

window.onload = function (){
generateInput ()
};