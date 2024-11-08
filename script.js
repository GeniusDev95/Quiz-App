const startQuizButton = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Sample questions
const questions = [
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Module",
            "Document Orientation Model",
            "Data Object Model"
        ],
        answer: 0 // Index of the correct answer
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: [
            "React",
            "Django",
            "Ruby on Rails",
            "Laravel"
        ],
        answer: 0
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = 'red', 'green', 'blue'",
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 'red' + 'green' + 'blue'"
        ],
        answer: 2
    }
];

startQuizButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('homepage').style.display = 'none';
    quizContainer.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });

    nextButton.classList.toggle('hidden', currentQuestionIndex === questions.length - 1);
}

function selectAnswer(index) {
    if (index === questions[currentQuestionIndex].answer) {
        score++;
    }
    
    Array.from(optionsContainer.children).forEach((button, idx) => {
        button.disabled = true; // Disable all options
        if (idx === questions[currentQuestionIndex].answer) {
            button.style.backgroundColor = 'lightgreen'; // Correct answer
        } else {
            button.style.backgroundColor = 'lightcoral'; // Incorrect answers
        }
    });

    nextButton.classList.remove('hidden'); // Show next button
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('result-button').classList.remove('hidden');
        nextButton.classList.add('hidden');
    }
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.innerText = `You scored ${score} out of ${questions.length}`;
    messageElement.innerText = getMessage(score);
}

function getMessage(score) {
    if (score === questions.length) {
        return "Excellent! You're a whiz!";
    } else if (score > questions.length / 2) {
        return "Good job! Keep practicing.";
    } else {
        return "Don't worry, try again!";
    }
}

function restartQuiz() {
    resultContainer.classList.add('hidden');
    document.getElementById('homepage').style.display = 'block';
    document.getElementById('result-button').classList.add('hidden');
}