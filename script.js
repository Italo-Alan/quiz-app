import { questions } from './questions.js'
let numbers = [], arrayQuestions = [], correctAnswers = [],  arr = [0,1,2,3];
let hitCount = 0;
let countQuest = 0;
let nextButton = document.querySelector('.next_btn');
nextButton.addEventListener('click', teste);
let seconds = document.querySelector('.time_seconds');
let countdown = 30;
seconds.innerHTML = countdown;
let count = 1;
let finishButton = document.getElementById('finish_btn');
finishButton.addEventListener('click', showFinalResult);
let times = document.querySelector('.timeQuestion');
const quizBox = document.querySelector('.quiz_box');
const resultBox = document.querySelector('.result_box');

//Gera a quantidade e os indices que serão usados no sistema geral
function randomNumbers(){
    for(let i = 0; i < 15; i++){
        let randomNumber = parseInt(Math.random() * (questions.length -1));
        if(!numbers.includes(randomNumber)){
            numbers.push(randomNumber);
        };
    };
    numbers.length = 5;
    return numbers;
};

randomNumbers();

//Gera as opções trocadas;
function randomOptions(array) {
let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    };

    return array;
};

//Chamar a função aqui faz com que as opções fiquem embaralhadas dificultando a pessoa lembrar da posição e se atentar exatamente a opção
randomOptions(arr);

//Exibe as perguntas e opções
function getQuestions(){
    document.querySelector('.question').textContent = arrayQuestions[countQuest].question;
    const buttons = document.querySelectorAll('.button');
    console.log('foi chamado do Get');
    for(let i = 0; i < 4; i++){
        buttons[i].textContent = arrayQuestions[countQuest].answers[arr[i]].text;
    };
    countQuest++;
};

function questionsArray(){
    for(let quest of numbers){
        arrayQuestions.push(questions.find( e => e.id == quest));
    };

    return arrayQuestions;
};

questionsArray();
getQuestions();

function rightAnswers(){
    for(let right of questions){
        correctAnswers.push(right.answers[4].correct);
    };

    return correctAnswers;
};

rightAnswers();

//Click dos botões
let buttons = document.querySelectorAll('.button');

function showAnswersOnClick(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', (e)=> {
            for(let i = 0; i < 4 ; i++){
                buttons[i].disabled = 'true';
            }
            clearInterval(stopCounting);
            
            nextButton.style.display="block";
            if(count == 5){
                nextButton.style.display="none";
            }
            if(correctAnswers.includes(buttons[i].textContent)){
                hitCount+= 1;
                console.log(`Certas: ${hitCount}`);
            }
            for(let button of buttons){
                if(correctAnswers.includes(button.textContent)){
                    button.classList.add('correct');
                }else{
                    button.classList.add('wrong');
                };
            };
        });
    };
};

function showAnswers(){
    for(let button of buttons){
        nextButton.style.display="block";
        if(correctAnswers.includes(button.textContent)){
            button.classList.add('correct');
        }else{
            button.classList.add('wrong');
        };
    };
};

showAnswersOnClick();


function teste(){
    // clearInterval(stopCounting);
    countdown = 31;
    for(let i = 0; i < 4 ; i++){
        buttons[i].disabled = false;
    }
    resetButtons();
    getQuestions();
    showTime();

    // showAnswersOnClick();
    count++;
    times.innerHTML = count;

    if(count === 5){
        finishButton.style.display = "block";
    }
}

function showTime(){
    let contador = setInterval( function (){
        countdown -= 1;
        seconds.innerHTML = countdown;
        console.log('Contando do ShowTIme()')
        if(countdown == 0){
            console.log('Parou pelo tempo');
            for(let i = 0; i < 4 ; i++){
                buttons[i].disabled = 'true';
            }
            clearInterval(contador);
            showAnswers();
        };
    }, 1000);
    
    return contador;
};

function stopShowTime(){
    let contador = setInterval( function (e){
        countdown -= 1;
        seconds.innerHTML = countdown;
        console.log('Contando do ShowTIme()')
        if(countdown == 0){
            console.log('Parou pelo tempo');

            for(let i = 0; i < 4 ; i++){
                buttons[i].disabled = 'true';
            };

            clearInterval(contador);
            showAnswers();
        };
    }, 1000);
    
    return contador;
};

let stopCounting = stopShowTime();

function showFinalResult(){
    quizBox.style.display="none";
    resultBox.style.display="block";
};

function resetButtons(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove('correct');
        buttons[i].classList.remove('wrong');
        nextButton.style.display="none";
    };
};