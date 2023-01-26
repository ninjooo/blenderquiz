const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'Blender е програма за правене на:',
        choice1: 'Игри',
        choice2: '3D проекти',
        choice3: 'Презентаций',
        choice4: 'Кодове',
        answer: 2,
    },
    {
        question: "От колко места може да се инсталира Blender:",
        choice1: "4",
        choice2: "3",
        choice3: "1",
        choice4: "2",
        answer: 4,
    },
    {
        question: "За какво служи менюто Sculpting",
        choice1: "За рисуване",
        choice2: "За преглеждане на проекта",
        choice3: "За скулпториране на фигури",
        choice4: "За моделиране на фигури",
        answer: 3,
    },
    {
        question: "Как можеш да запазиш проекта си като снимка",
        choice1: "Чрез бутона save",
        choice2: "Чрез рендиране",
        choice3: "Чрез заснемане на екрана",
        choice4: "Чрез отваряне на файла",
        answer: 2,
    },
    {
        question: "Кой от тези компоненти не се появява при създаването на нов проект",
        choice1: "Light",
        choice2: "Camera",
        choice3: "Cube",
        choice4: "Circle",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.href = "end.html"
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()