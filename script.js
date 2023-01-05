import { questions } from './questions.js'
let numbers = [];
let arrayQuestions = [];
let correctAnswers = [];

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
    // console.log(numbers)
    document.querySelector('.question').textContent = arrayQuestions[0].question;
    const buttons = document.querySelectorAll('.button');
    for(let i = 0; i < 4; i++){
        buttons[i].textContent = arrayQuestions[0].answers[i].text;
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
            }else{
                button.classList.add('wrong');
            }
        }
    })
}
