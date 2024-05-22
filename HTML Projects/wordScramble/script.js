const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;//decrement maxTime by -1
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();//calling fun, so the game restart
    },1000)
}

const initGame = () => {
    initTimer(30);//calling initTimer fun with passing 30 as maxTime value
    //getting random object from words
    let randomObj=words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");//splitting each letter of random word
    for(let i= wordArray.length-1; i>0;i--)
        {
        let j = Math.floor(Math.random()*(i+1));//getting random number
        let temp = wordArray[i];//shuffling and swiping wordArray letters randomly
        wordArray[i] = wordArray[j];
        wordArray[j]= temp;
    }
    wordText.innerText = wordArray.join("");//passsing shuffled word as word text
    hintText.innerText = randomObj.hint;//passsing random object hint as hint text
    correctWord = randomObj.word.toLowerCase();//passing random value to correctWord
    inputField.value = "";//making input field empty
    //setting input maxlength attribute to word length 
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
}
initGame();

const checkWord = () =>{
    let userWord = inputField.value.toLocaleLowerCase();//getting user value
    if(!userWord) return alert("Please enter a word check");//if user don't enter anything
    
    //if user word doesn't match with the correct word
    if(userWord !== correctWord)
        return alert(`Oops! ${userWord} is not a correct word`);
    
    //if above two cond are failed then shoe congrats becoz user word is correct
    alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);

    initGame();//calling method
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click",checkWord);