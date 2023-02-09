let newWord = document.getElementById("new-word");
let imageForNewWord = document.getElementById("new-word-img")
let saveBtn = document.getElementById("save-word")
let amountOfWords = localStorage.length
let currentWord = 0
let prevWord = document.getElementById("prev-word")
let nextWord = document.getElementById("next-word")
let checkWord = document.getElementById("word-check")
let wordInput = document.getElementById("word-input")
let btnCorrect = document.getElementById("btn-correct")
let btnWrong = document.getElementById("btn-wrong")
// console.log("Image For NewWord: ", imageForNewWord)
// console.log({ newWord });
initState()

newWord.addEventListener("change", (e) => {
  newWord.value = e.target.value;
  console.log(newWord.value);
});

imageForNewWord.addEventListener("change", (e) => {
    imageForNewWord.value = e.target.value;
    if(imageForNewWord.value.length > 1) {
        let image = document.getElementById("image-new-word")
        image.src = imageForNewWord.value
    }
    console.log(imageForNewWord.value);
  });

wordInput.addEventListener("change", (e) => {
    wordInput.value = e.target.value
    console.log("Word Input: ", wordInput.value)
})

saveBtn.addEventListener("click", saveWord)
checkWord.addEventListener("click", wordChecker)
nextWord.addEventListener("click", displayNextItem)
prevWord.addEventListener("click", displayPrevItem)


//FUNCTION DECLARATION
function saveWord () {
    if(newWord.value.length > 1 && imageForNewWord.value.length > 1) {
        let word = newWord.value
        let image = imageForNewWord.value
        let wordValue = {word, image}
        let valueJson = JSON.stringify(wordValue)
        try {
            localStorage.setItem(`${amountOfWords}`, valueJson)
            amountOfWords++;
        }
        catch(err) {
            console.error(err)
        }
        
    }
}

function initState(num = 0) {
    let image = document.getElementById("saved-word")
    console.log(JSON.parse(localStorage.getItem(`${num}`))?.image)
    image.src = JSON.parse(localStorage.getItem(`${num}`))?.image
}

function displayNextItem() {
    btnCorrect.classList.add("d-none")
    btnWrong.classList.add("d-block")
    let displayItem
    if(currentWord == localStorage.length - 1) {
        displayItem = "0"
    } else {
        displayItem = JSON.stringify(+currentWord + 1)
    }
    currentWord = displayItem
    initState(displayItem)
    console.log(displayItem, currentWord)
}

function displayPrevItem() {
    let displayItem
    if(currentWord == 0) {
        displayItem = JSON.stringify(localStorage.length - 1)
    } else {
        displayItem = JSON.stringify(+currentWord - 1)
    }
    currentWord = displayItem
    initState(displayItem)
    console.log(displayItem, currentWord)
}

function wordChecker() {
    console.log("check!")
    let strWordInput = wordInput.value.toLowerCase();
    let strWord = JSON.parse(localStorage.getItem(currentWord)).word.toLowerCase();
    console.log(strWord, strWordInput)
    console.log(btnCorrect, btnWrong)
    if(strWord == strWordInput)  {
        console.log("Correct")
        btnCorrect.classList.remove("d-none")}
    else {
        console.log("Wrong")
        btnWrong.classList.remove("d-none")
}}