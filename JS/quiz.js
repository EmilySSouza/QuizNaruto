import arrayQuestions from "./questions.js";

// Variáveis globais
let currentQuestionIndex = 0;
let score = 0;
let userName = localStorage.getItem("userName") || "";

const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-button");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const modal = document.getElementById("error-modal");
const restartButton = document.getElementById("restart-button");
const startBtn = document.getElementById("start-btn");
const toGoBack = document.getElementById("to-go-back");

if (startBtn) {
    startBtn.addEventListener("click", startQuiz);
}

function isTipo(pVal) { 
    const reTipo = /^[A-Za-z]+$/;
    return reTipo.test(pVal); 
}

function startQuiz() {
    userName = prompt("Digite seu nome para iniciar o quiz (Apenas seu primeiro nome): ");

    while (userName.length <= 3 || !isTipo(userName)) {
        userName = prompt("Nome inválido. Digite um nome válido (Apenas seu primeiro nome)");
    }

    localStorage.setItem('userName', userName);

    window.location.href = './Pages/questions.html';
}

// Função para mostrar a pergunta
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

// Função para lidar com o clique na resposta
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

// Função para mostrar modal de erro
function showErrorModal() {
    modal.style.display = "flex";
    const errorMessage = `Você errou, ${userName}! O quiz será reiniciado.`;
    modal.querySelector(".modal-content p").textContent = errorMessage;
}

// Função para mostrar modal de vitória
function showWinModal() {
    const winMessage = `${userName}, você ganhou o quiz! Parabéns! Você provou ser um expert em Naruto.`;
    modal.querySelector(".modal-content p").textContent = winMessage;
    modal.style.display = "flex"; 
}

// Função para fechar o modal
function closeModal() {
    modal.style.display = "none"; 
}

// Função para reiniciar o quiz
function restartQuiz() {
    closeModal();
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(currentQuestionIndex);
    resultElement.textContent = "";
}

toGoBack.addEventListener("click", () => {
    window.location = "../index.html";
})

// Função para ir para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < arrayQuestions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showWinModal();
    }
}

// Adicionar eventos aos botões
nextButton.addEventListener("click", nextQuestion);
answerButtons.forEach(button => button.addEventListener("click", handleAnswerClick));
restartButton.addEventListener("click", restartQuiz);  // Adicione esta linha

// Mostrar a primeira pergunta
showQuestion(currentQuestionIndex);
