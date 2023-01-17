import { questions } from './questions.js'
let numbers = [], arrayQuestions = [], correctAnswers = [],  arr = [0,1,2,3];
let hitCount = 0;
let countQuest = 0;

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
            clearInterval(stopCounting);
            if(correctAnswers.includes(buttons[i].textContent)){
                hitCount+= 1;
                console.log(`Certas: ${hitCount}`);
            }
            for(let button of buttons){
                if(button.disabled == false){
                    button.disbaled = 'true';
                }
                if(correctAnswers.includes(button.textContent)){
                    button.classList.add('correct');
                    if(!button.disabled){
                        button.disbaled = 'true';
                    }
                    console.log(button.disabled);
                }else{
                    button.classList.add('wrong');
                };
            };
        });
    };
};

function showAnswers(){
    for(let button of buttons){
        if(correctAnswers.includes(button.textContent)){
            button.classList.add('correct');
            if(!button.disabled){
                button.disbaled = 'true';
            }
            console.log(button.disabled);
        }else{
            button.classList.add('wrong');
        };
    };
};

showAnswersOnClick();

let nextButton = document.querySelector('.next_btn');
nextButton.addEventListener('click', teste);
let seconds = document.querySelector('.time_seconds');
let countdown = 30;
seconds.innerHTML = countdown;
let count = 1;
let finishButton = document.getElementById('finish_btn');
finishButton.addEventListener('click', finishScreen);

function teste(){
    resetButtons();
    getQuestions();
    countdown = 31;
    showTime();
    let times = document.querySelector('.timeQuestion');
    count++;
    times.innerHTML = count;

    if(count == 5){
        nextButton.style.display = "none";
        finishButton.style.display = "block";
    }
}

function showTime(){
    let contador = setInterval( function (e){
        countdown -= 1;
        seconds.innerHTML = countdown;
        
        if(countdown == 0){
            clearInterval(contador);
            showAnswers();
        };
    }, 1000);
    
    return contador;
};


let stopCounting = showTime();

function finishScreen(){
    console.log('Finalizou e mudou a tela');
};

function resetButtons(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove('correct');
        buttons[i].classList.remove('wrong');
    };
};
