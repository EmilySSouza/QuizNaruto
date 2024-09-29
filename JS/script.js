import arrayQuestions from "./questions.js";

let currentQuestionIndex = 0;
let score = 0;
let userName = prompt("Digite seu nome");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-button");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const modal = document.getElementById("error-modal");
const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", restartQuiz);

window.restartQuiz = restartQuiz;

function showQuestion(index) {
    const currentQuestion = arrayQuestions[index];
    questionElement.textContent = currentQuestion.question;
    answerButtons.forEach((button, i) => {
        button.textContent = currentQuestion.answers[i].option;
        button.dataset.value = currentQuestion.answers[i].value;
        button.disabled = false;
    });
    nextButton.disabled = true;
}

function handleAnswerClick(event) {
    const selectedValue = parseInt(event.target.dataset.value);
    const selectedAnswerIndex = Array.from(answerButtons).indexOf(event.target);
    const correct = arrayQuestions[currentQuestionIndex].answers[selectedAnswerIndex].correct;

    if (correct) {
        score += selectedValue;
        nextButton.disabled = false;
    } else {
        showErrorModal();
    }

    answerButtons.forEach(button => (button.disabled = true));
}

function showErrorModal() {
    modal.style.display = "flex";
    const errorMessage = `Você errou, ${userName}! O quiz será reiniciado.`;
    modal.querySelector(".modal-content p").textContent = errorMessage;
}

function showWinModal() {
    const winMessage = `${userName}, você ganhou o quiz!`;
    modal.querySelector(".modal-content p").textContent = winMessage;
    modal.style.display = "flex"; 
}

function closeModal() {
    modal.style.display = "none"; 
}

function restartQuiz() {
    closeModal();
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(currentQuestionIndex);
    resultElement.textContent = "";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < arrayQuestions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showWinModal();
    }
}

nextButton.addEventListener("click", nextQuestion);
answerButtons.forEach(button => button.addEventListener("click", handleAnswerClick));

showQuestion(currentQuestionIndex);