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
