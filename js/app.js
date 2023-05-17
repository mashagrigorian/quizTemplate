const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questtionContainerElements= document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answersButtonElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')


let shuffleQusetions,currentQuestionIndex,score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame () {
console.log('Started')
startButton.classList.add('hide')
nextButton.style.display = 'block'
nextButton.classList.remove('hide')
shuffleQusetions = questions.sort(() => Math.random() -0.5)
currentQuestionIndex = 0
score = 0
// scoreElement.innerText = `Score ${score}`
questtionContainerElements.classList.remove('hide')
setNextQuestion()
}

function showQuestion (question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answersButtonElement.appendChild(button)
    })
}
function setNextQuestion () {
    resetState()
    showQuestion(shuffleQusetions[currentQuestionIndex])
}
function resetState () {
    nextButton.classList.add('hide')
    while(answersButtonElement.firstChild) {
        answersButtonElement.removeChild(answersButtonElement.firstChild)
    }
}

function selectAnswer (e) {
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answersButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (correct) {
        score++
        selectButton.style.backgroundColor = 'green'
        // scoreElement.innerText = `Score ${score}`
    } else {
        selectButton.style.backgroundColor = 'red'

    }
    if (shuffleQusetions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')
    }else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        questtionContainerElements.classList.add('hide')
        scoreElement.innerText = `You scored ${score} out of ${questions.length}`
    }
    if (nextButton.addEventListener('click', () => {

    }))
    nextButton.classList.remove('hide')
}
function setStatusClass (element,correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
    {
        question: 'Who is making the Web standards?',
        answers:[
            {text:'Microsoft', correct: false},
            {text: 'Mozilla', correct: false},
            {text: 'Google', correct: false},
            {text: 'The World Wide Web Consortium', correct: true},
        ] 
    },
    {
        question: 'Choose the correct HTML element for the largest heading:',
        answers:[
            {text:'head', correct: false},
            {text: 'heading', correct: false},
            {text: 'h1', correct: true},
            {text: 'p', correct: false},
        ] 
    },
    {
        question: 'Which character is used to indicate an end tag??',
        answers:[
            {text:'.', correct: false},
            {text: '>', correct: false},
            {text: ')', correct: false},
            {text: '/', correct: true},
        ] 
    },
    {
        question: 'Which of these elements are all <table> elements?',
        answers:[
            {text:'table, tr, tt', correct: false},
            {text: 'table, head, tfoot', correct: false},
            {text: 'table, tr, td', correct: true},
            {text: 'thead, body, tr', correct: false},
        ] 
    },
    {
        question: 'console.log(typeof typeof 1);',
        answers:[
            {text:'string', correct: true},
            {text: 'number', correct: false},
            {text: '1', correct: false},
            {text: 'true', correct: false},
        ] 
    },
    {
        question: 'Javascript is an object oriented language?',
        answers:[
            {text:'False', correct: false},
            {text: 'true', correct: true},
        ]
    },
    {
        question: 'What is the alternate name for Java script?',
        answers:[
            {text:'LimeScript', correct: false},
            {text: 'Both a and d', correct: false},
            {text: 'ECMScript', correct: false},
            {text: 'ECMAScript ', correct: true},
        ] 
    },
    {
        question: 'To insert a JavaScript into an HTML page, which tag is used?',
        answers:[
            {text:' < script=â€™javaâ€™>', correct: false},
            {text: '< javascript>', correct: false},
            {text: '< script> ', correct: true},
            {text: '< js> ', correct: false},
        ] 
    },
    {
        question: 'Which of the following type of variable is visible everywhere in your JavaScript code?',
        answers:[
            {text:' global variable', correct: true},
            {text: ' local variable', correct: false},
            {text: 'Both of the above.', correct: false},
            {text: 'None of the above. ', correct: false},
        ] 
    },
    {
        question: 'What language defines the behavior of a web page?',
        answers:[
            {text:'  HTML ', correct: false},
            {text: ' CSS', correct: false},
            {text: ' XML', correct: false},
            {text: 'Java Script ', correct: true},
        ] 
    },
]