import { questions } from './questions.js'
let numbers = [];
let arrayQuestions = [];
let correctAnswers = [];
let arr = [0,1,2,3];
let count = 1;
let hitCount = 0;
let countQuest = 0

// let next = document.querySelector('.next').addEventListener('click', nextQuestion)
//Gera a quantidade e os indices que serão usados no sistema geral
function randomNumbers(){
    for(let i = 0; i < 15; i++){
        let randomNumber = parseInt(Math.random() * (questions.length -1));
        if(!numbers.includes(randomNumber)){
            numbers.push(randomNumber)
        }
    }
    numbers.length = 5;
    return numbers;
}

randomNumbers()

//Gera as opções trocadas;
function randomOptions(array) {
let currentIndex = array.length,  randomIndex;

while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
}

return array;
}

//Exibe as perguntas e opções
function getQuestions(){
    document.querySelector('.question').textContent = arrayQuestions[countQuest].question;
    const buttons = document.querySelectorAll('.button');
    for(let i = 0; i < 4; i++){
        console.log(arr[i])
        buttons[i].textContent = arrayQuestions[countQuest].answers[arr[i]].text;
    }
}

function questionsArray(){
    for(let quest of numbers){
        arrayQuestions.push(questions.find( e => e.id == quest));
    }

    return arrayQuestions;
}

questionsArray();
getQuestions();

function rightAnswers(){
    for(let right of questions){
        correctAnswers.push(right.answers[4].correct);
    }

    return correctAnswers
}

rightAnswers()

//Click dos botões
let buttons = document.querySelectorAll('.button');

for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', (e)=> {
        for(let button of buttons){
            if(correctAnswers.includes(button.textContent)){
                button.classList.add('correct');
                console.log(`Certas: ${hitCount}`)
            }else{
                button.classList.add('wrong');
            }
        }
    })
}

let nextButton = document.querySelector('.next_btn').addEventListener('click', teste);
let seconds = document.querySelector('.time_seconds');
let countdown = 5;
seconds.innerHTML = countdown;

function teste(){
    countdown = 5;
    getQuestions();
    let times = document.querySelector('.timeQuestion');
    count++
    times.innerHTML = count;
}

let contador = setInterval( function (e){
   countdown -= 1;
   seconds.innerHTML = countdown;

   if(countdown == 0){
    clearInterval(contador);
   }
}, 1000);

