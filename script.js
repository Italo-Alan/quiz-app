import { questions } from './questions.js'
let numbers = [];
let arrayQuestions = [];
let correctAnswers = [];
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

//Exibe as perguntas e opções
function getQuestions(){
    
    document.querySelector('.question').textContent = arrayQuestions[countQuest].question;
    const buttons = document.querySelectorAll('.button');
    for(let i = 0; i < 4; i++){
        buttons[i].textContent = arrayQuestions[countQuest].answers[i].text;
    }
    countQuest++
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
                // hitCount += 1;
                console.log(`Certas: ${hitCount}`)
            }else{
                button.classList.add('wrong');
            }
        }
    })
}

let nextButton = document.querySelector('.next_btn').addEventListener('click', teste);

function teste(e){
    e.preventDefault();
    getQuestions();
    let times = document.querySelector('.timeQuestion');
    count++
    times.innerHTML = count;

    // if(count == 5){
    //     nextButton.innerHTML = "Finish Quiz";
    // }
}

// let time = 30;
let seconds = document.querySelector('.time_seconds');
