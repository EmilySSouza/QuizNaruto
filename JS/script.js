import { showQuestion, nextQuestion } from './quiz.js';

const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-button');
const nextButton = document.getElementById('next-button');

nextButton.onclick = () => nextQuestion(questionElement, answerButtons, nextButton);

showQuestion(questionElement, answerButtons, nextButton);