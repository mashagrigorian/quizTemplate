const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElements = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersButtonElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");

const restartButton = document.getElementById("restart-btn");
const resultsContainer = document.getElementById("results-container");

const trueSound = document.getElementById('trueSound')
const falseSound = document.getElementById('falseSound')
const audioElements = document.querySelectorAll('audio')



let shuffleQuestions, currentQuestionIndex, score
let answerSelected = false; // Track if an answer has been selected
let isQuizFinished = false;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", function() {
  if(!answerSelected) {
    showMessage("Please select an answer."); // Display message if no answer is selected
    return; // Exit the function if an answer has not been selected
  }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffleQuestions.length) {
      setNextQuestion();
    } else {
      showScore();
      isQuizFinished = true;
      nextButton.style.display = "none";
    }
})

function restartGame() {
  // Reset all variables and elements to their initial state
  currentQuestionIndex = 0;
  score = 0;

  resultsContainer.innerHTML = ""; // Clear the result section

  // Reset the UI and start the game again
  resetState();
  hideScore();
  startButton.classList.remove("hide");
  nextButton.classList.remove("hide");
  nextButton.disabled = false;
  isQuizFinished = false;
  setNextQuestion();
}


function startGame () {
startButton.classList.add("hide");
nextButton.style.display = "block";
nextButton.classList.remove("hide");
nextButton.disabled = false; // Enable the Next button
shuffleQuestions = questions.sort(() => Math.random() - 0.5);
currentQuestionIndex = 0;
score = 0;
questionContainerElements.classList.remove("hide");
setNextQuestion();
hideScore();
}

function showQuestion (questions) {
  questionElement.innerText = questions.question;
  questions.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)
    answersButtonElement.appendChild(button);
})
}

function setNextQuestion () {
 
  resetState();
  answerSelected = false;
  messageElement.innerText = "";
  showQuestion(shuffleQuestions[currentQuestionIndex])
  let currentTime = 0 

}

function resetState () {
  nextButton.classList.add("hide");
  while (answersButtonElement.firstChild) {
    answersButtonElement.removeChild(answersButtonElement.firstChild)
  }
}

function selectAnswer (e) {
  
  if (answerSelected) {
    return; // Exit the function if an answer has already been selected
  }

  answerSelected = true; // Set the answer selection tracker to true
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  showMessage("");
  setStatusClass(document.body, correct);
  Array.from(answersButtonElement.children).forEach(button => {
    button.disabled = true; // Disable all answer buttons
    setStatusClass(button, button.dataset.correct);
  })

  userResponses[currentQuestionIndex] = Array.from(answersButtonElement.children).indexOf(selectButton);


  
  if (!audioElements.paused) {
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

  if (correct) {
    score++;
    selectButton.style.backgroundColor = "green";
    trueSound.play()
  } 
  else {
    selectButton.style.backgroundColor = "red";
    falseSound.play()
  }


    nextButton.classList.remove("hide");
}





function showScore () {
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  nextButton.classList.add("hide");
  questionContainerElements.classList.add("hide");
  scoreElement.innerText = `You scored ${score} out of ${questions.length}`
  nextButton.disabled = true; // Disable the Next button
}

function hideScore() {
  scoreElement.innerText = ""; // Clear the score message
}

function showMessage(text) {
  messageElement.innerText = text;
}


function setStatusClass (element,correct) {
  clearStatusClass(element)
  if (correct) {
      element.classList.add("correct");
  } else {
      element.classList.add("wrong");
  }
}

function clearStatusClass (element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const userResponses = [];

function displayAllQuestions() {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  const heading = document.createElement("h2");
  heading.innerText = "Quiz Results:";
  resultsContainer.appendChild(heading);

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const userAnswerIndex = userResponses[i];
    const correctAnswerIndex = question.answers.findIndex(answer => answer.correct);

    const questionResult = document.createElement("div");
    questionResult.classList.add("question-result");

    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionResult.appendChild(questionText);

    const userAnswer = document.createElement("p");
    if (userAnswerIndex !== undefined && question.answers[userAnswerIndex]) {
      userAnswer.innerText = "Your Answer: " + question.answers[userAnswerIndex].text;
    } else {
      userAnswer.innerText = "Your Answer: N/A";
    }
    questionResult.appendChild(userAnswer);

    const correctAnswer = document.createElement("p");
    if (correctAnswerIndex !== -1) {
      correctAnswer.innerText = "Correct Answer: " + question.answers[correctAnswerIndex].text;
    } else {
      correctAnswer.innerText = "Correct Answer: N/A";
    }
    questionResult.appendChild(correctAnswer);

    resultsContainer.appendChild(questionResult);
  }

  const restartButton = document.createElement("button");
  restartButton.innerText = "Restart";
  restartButton.classList.add("btn");
  restartButton.addEventListener("click", restartGame);
  resultsContainer.appendChild(restartButton);

  // Show the restart button after displaying the quiz results
  restartButton.classList.remove("hide");
}


function showScore () {
  questionContainerElements.classList.add("hide");
  scoreElement.innerText = `You scored ${score} out of ${questions.length}`
  nextButton.disabled = true; // Disable the Next button
  displayAllQuestions();   
}


const questions = [
    {
      question: "Which one is not array method?",
      answers: [
        { text: "toString", correct: false },
        { text: "splice", correct: false },
        { text: "hasOwnProperty", correct: true },
        { text: "delete", correct: false }
      ]
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      answers: [
        { text: "onmouseover", correct: false },
        { text: "onclick", correct: true },
        { text: "onchange", correct: false },
        { text: "onmouseover", correct: false }
      ]
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: [
        { text: "function myFunction()", correct: true },
        { text: "function:myFunction()", correct: false },
        { text: "function = myFunction()", correct: false },
        { text: "function myFunction = ()", correct: false }
      ]
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      answers: [
          { text: 'rnd(7.25)', correct: false },
          { text: 'round(7.25)', correct: false },
          { text: 'Math.rnd(7.25)', correct: false },
          { text: 'Math.round(7.25)', correct: true }
      ]
    },
    {
      question: "Javascript is an object oriented language.",
      answers:[
          {text: "False", correct: true},
          {text: "True", correct: false},
      ]
  },
  {
    question: "What language defines the behavior of a web page?",
    answers:[
        {text: "HTML", correct: true},
        {text: "CSS", correct: false},
        {text: "XML", correct: false},
        {text: "JavaScript", correct: false},
    ] 
},
{
  question: "console.log(typeof typeof 1);",
  answers:[
      {text: "string", correct: true},
      {text: "number", correct: false},
      {text: "1", correct: false},
      {text: "true", correct: false},
  ] 
},
{
  question: "What is the alternate name for Java script?",
  answers:[
      {text: "LimeScript", correct: false},
      {text: 'Both a and d', correct: false},
      {text: "ECMScript", correct: false},
      {text: "ECMAScript", correct: true},
  ] 
},
]
