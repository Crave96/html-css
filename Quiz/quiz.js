const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("startBtn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestion = document.getElementById("current-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

const quizQuestion = [
    {
        question: "What is the capital of French?",
        answer:[
            {text:"London", correct : false},
            {text:"Berlin", correct : false},
            {text:"Paris", correct : ture},
            {text:"Madrid", correct : false},

        ],
    },
    {
        question: "Which planet is know as the red Planet?",
        answer:[
            {text:"London", correct : false},
            {text:"Berlin", correct : false},
            {text:"Paris", correct : true},
            {text:"Madrid", correct : false},

        ],

    },
    {
        question: "What is the capital of French?",
        answer:[
            {text:"London", correct : false},
            {text:"Berlin", correct : false},
            {text:"Paris", correct : ture},
            {text:"Madrid", correct : false},

        ],
    },
    {
        question: "What is the capital of French?",
        answer:[
            {text:"London", correct : false},
            {text:"Berlin", correct : false},
            {text:"Paris", correct : ture},
            {text:"Madrid", correct : false},

        ],
    },
    {
        question: "What is the capital of French?",
        answer:[
            {text:"London", correct : false},
            {text:"Berlin", correct : false},
            {text:"Paris", correct : ture},
            {text:"Madrid", correct : false},

        ],
    },
];

let currentQuestionIndex = 0;
let score = 0 ;
let answersDisabled = false;

totalQuestionsSpan.textContent =quizQuestion.length;