import arrayQuestions from './questions.js';

let questionIndex = 0;

export function showQuestion(questionElement, answerButtons, nextButton) {
    const questionList = arrayQuestions[questionIndex];

    questionElement.innerHTML = `<h3>${questionIndex + 1}. ${questionList.question}</h3>`;

    answerButtons.forEach((button, index) => {
        if (index < questionList.answers.length) {
            button.innerText = questionList.answers[index].option;
            button.onclick = () => selectAnswer(questionList.answers[index].value, nextButton);
        } 
    });
}

export function selectAnswer(answerValue, nextButton) {
    console.log(`Resposta ${answerValue} selecionada`);
    nextButton.disabled = false;
}

export function nextQuestion(questionElement, answerButtons, nextButton) {
    questionIndex++;
    if (questionIndex < arrayQuestions.length) {
        showQuestion(questionElement, answerButtons, nextButton);
    } else {
        questionElement.innerHTML = '<h3>Quiz Finalizado!</h3>';
        answerButtons.forEach(button => button.style.display = 'none');
        nextButton.style.display = 'none'; 

    }
}