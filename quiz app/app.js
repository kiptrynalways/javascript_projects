//there are three different things to do. 1, to build the start the quiz
// set next question
//select answer

const startButton = document.getElementById('start-btn');

const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');


let shuffledQuestions, currentQuestionIndex; // we dont want our questions to show in the exact order, we want it to shuffle 


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})



function startGame() {
startButton.classList.add('hide');
shuffledQuestions = questions.sort(() => Math.random() - .5);// shuufles all our questions for us
currentQuestionIndex = 0;
currentQuestionIndex = 0;
questionContainerElement.classList.remove('hide');
setNextQuestion();
}

function setNextQuestion() {
    resetState();//reset anytime we set the question
showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText =question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}
function selectAnswer(e) {
const selectedButton = e.target
const correct = selectedButton.dataset.correct
setStatusClass(document.body, correct)
Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})
if(shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
}
else{
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}

}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
    question: 'What is 2 + 2?',
    answers: [
        {text: '4', correct: true},
        {text: '22', correct: false} 
    ]
},
{
    question: 'What is the best way to learn?',
    answers: [
        {text: 'practicing', correct: true},
        {text: 'sleeping', correct: true},
        {text: 'playing', correct: true},
        {text: 'gossiping', correct: true} 
    ]
}
]