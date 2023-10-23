const questions = [
  {
    question: "What is the first five books of the Bible called?",
    answers: [
      { text: "Pentateuch", correct: true },
      { text: "Torah", correct: false },
      { text: "Mosaic Books", correct: false },
      { text: "The Beginnings", correct: false },
    ],
  },
  {
    question: "Where is the Sermon on the Mount Found?",
    answers: [
      { text: "Mark", correct: false },
      { text: "John", correct: false },
      { text: "Mathew", correct: true },
      { text: "Luke", correct: false },
    ],
  },
  {
    question: "Another name for Nathaniel is?",
    answers: [
      { text: "Batholomew", correct: true },
      { text: "Nate", correct: false },
      { text: "Philip", correct: false },
      { text: "Procorus", correct: false },
    ],
  },
  {
    question: "What is the last book of the Bible?",
    answers: [
      { text: "John", correct: false },
      { text: "Ruth", correct: false },
      { text: "Revelation", correct: true },
      { text: "Roamans", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
    resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; //display the current question

  //code to display the answers
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button); //displaying inside the answerbutton div
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
});
}

function resetState (){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;

    }else{
        selectedBtn.classList.add("incorrect");

        //i dont want more than two attempts
        // Disable the answer button if the answer is incorrect
    selectedBtn.disabled = true;

    // Count the number of attempts
    let attempts = selectedBtn.dataset.attempts;
    attempts++;

    // If the number of attempts is greater than or equal to 2, disable the next button
    if (attempts >= 2) {
      nextButton.disabled = true;
    }
    // Update the answer button's data-attempts attribute
    selectedBtn.dataset.attempts = attempts;
    if (attempts >= 2) {
        alert("You have used up all of your attempts.");
      }
    }


    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML =`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Thanks for the Attempt. See you Next time";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
