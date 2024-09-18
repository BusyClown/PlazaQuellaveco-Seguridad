const questions = [
    {
        question: '¿Cuáles son las dos capas de seguridad para la conducción?',
        answers: [
            { text: 'Relojes de vigilancia del sueño y Sistema ADAS', correct: true },
            { text: 'Monitoreo de taludes y Alerta temprana', correct: false },
            { text: 'Comunicación continua y Vigias.', correct: false }
        ]
    },
    {
        question: 'Forma parte del sistema ADAS:',
        answers: [
            { text: 'Cámara, Mobileye, GPS', correct: true },
            { text: 'Supervisores de Línea, Copiloto', correct: false },
            { text: 'Linea de fuego, Cinturón de Seguridad', correct: false },
        ]
    },
    {
        question: '¿Con qué tecnología contamos en Quellaveco para cuidar de la salud de la gente?',
        answers: [
            { text: 'Telemedicina', correct: true },
            { text: 'Piezómetros', correct: false },
            { text: 'Uso de drones', correct: false }
        ]
    },
    {
        question: '¿El servicio de telemedicina se utiliza para...?',
        answers: [
            { text: 'Emergencias', correct: true },
            { text: 'Campañas de vacunación', correct: false },
            { text: 'Campañas de salud', correct: false }
        ]
    }
];

const startButton          = document.getElementById('start-btn');
const questionContainer    = document.getElementById('question-container');
const questionElement      = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement         = document.getElementById('score');
const nextButton           = document.getElementById('next-btn');
const rptButton            = document.getElementById('rpt-btn');
const resetButton          = document.getElementById('reset-btn');
const msgScore             = document.getElementById("msg-score");


let shuffledQuestions;
let currentQuestionIndex;
let score;
let rptCorrect = false;

document.addEventListener(
    "DOMContentLoaded", function() {
        showScreen(1);
    }
);

startButton.addEventListener(
    "click", function() {
        showScreen(2);
        startGame();

    }
);

nextButton.addEventListener(
    "click", function() {
        if (rptCorrect) {
            score++;
            rptCorrect = false;
        }

        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            showScreen(3);
            endGame();  
            if (score == 0) {
                msgCongratulation("Intentalo otra vez");
            } else if (score > 0 && score < 4) {
                msgCongratulation("Puedes mejorar");
            } else if (score == 4) {
                msgCongratulation("¡LO LOGRASTE!")
            }
        } 
    }
)

rptButton.addEventListener(
    "click", function() {
        showScreen(4);
    }
)

resetButton.addEventListener(
    "click", function() {
        location.reload();
    }
)

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    hiddenNextBtn();
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    myAnim ();
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.sort(() => Math.random() - 0.5).forEach(
        answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
        
            answerButtonsElement.appendChild(button);
        }
    );
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    stylesDefault()
    this.style.backgroundColor = "aquamarine";
    if (correct) {
        rptCorrect = true;
    } else {
        rptCorrect = false;
    }
    showNextBtn();
}

function endGame() {
    scoreElement.innerText = score;
}

function hiddenNextBtn() {
    document.querySelectorAll('.next-btn').forEach(
        function(elemento) {
            elemento.style.display = 'none';
        }
    );
}

function showNextBtn() {
    document.getElementById('next-btn').style.display = 'block';
}

function myAnim() {
    const elemento = document.getElementById("app");
    elemento.classList.remove("app");setTimeout(() => {
        elemento.classList.add("app");
    }, 0);
}

function stylesDefault() {
    const botones = document.querySelectorAll('.btn');
    botones.forEach(boton => {
        boton.style.backgroundColor = "white";
    });
}

function msgCongratulation (myMessage) {
    msgScore.innerText = myMessage;
}

// function PantallaCompleta () {
    
//     const elem = document.documentElement;


//     if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//     } else if (elem.mozRequestFullScreen) { // Firefox
//         elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) { // Chrome, Safari y Opera
//         elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) { // Internet Explorer/Edge
//         elem.msRequestFullscreen();
//     }
// }