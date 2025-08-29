// Question bank: array of question objects
const quizQuestions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France."
    },
    {
        question: "Which language runs in a web browser?",
        choices: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: 3,
        explanation: "JavaScript is the primary language that runs in web browsers."
    },
    {
        question: "What does CSS stand for?",
        choices: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats"
        ],
        correctAnswer: 1,
        explanation: "CSS stands for Cascading Style Sheets, used for styling web pages."
    },
    {
        question: "What year was JavaScript launched?",
        choices: ["1996", "1995", "1994", "None of the above"],
        correctAnswer: 1,
        explanation: "JavaScript was created by Brendan Eich in 1995 while working at Netscape."
    },
    {
        question: "Which company developed the React library?",
        choices: ["Google", "Facebook", "Microsoft", "Apple"],
        correctAnswer: 1,
        explanation: "React was developed by Facebook (now Meta) for building user interfaces.",
        image: "https://placehold.co/300x200?text=React+Logo"
    }
];

// Reference to DOM elements
const quizContainer = document.getElementById('quiz-questions');
const quizForm = document.getElementById('quiz-form');
const resultContainer = document.getElementById('result');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const quizArea = document.getElementById('quiz-area');

// Quiz state variables
let currentQuestion = 0;
let userAnswers = [];
let quizTimer;
let timeLeft = 0;
const questionTimeLimit = 30; // 30 seconds per question

// Function to build the quiz UI dynamically
function buildQuiz() {
    const output = [];
    userAnswers = new Array(quizQuestions.length).fill(null);

    quizQuestions.forEach((currentQuestion, questionIndex) => {
        const answers = [];

        currentQuestion.choices.forEach((choice, choiceIndex) => {
            answers.push(
                `<li>
                    <input type="radio" name="question${questionIndex}" id="q${questionIndex}choice${choiceIndex}" value="${choiceIndex}" />
                    <label for="q${questionIndex}choice${choiceIndex}">${choice}</label>
                </li>`
            );
        });

        let questionContent = `<h3>Q${questionIndex + 1}. ${currentQuestion.question}</h3>`;
        
        // Add image if available
        if (currentQuestion.image) {
            questionContent += `<div class="question-image">
                <img src="${currentQuestion.image}" alt="Illustration for question ${questionIndex + 1}" onerror="this.style.display='none'" />
            </div>`;
        }

        output.push(
            `<div class="question" id="question-${questionIndex}" ${questionIndex > 0 ? 'style="display: none;"' : ''}>
                <div class="question-content">${questionContent}</div>
                <ul class="answers">${answers.join('')}</ul>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
    setupEventListeners();
}

// Function to setup event listeners
function setupEventListeners() {
    // Radio button selection
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const questionIndex = parseInt(this.name.replace('question', ''));
            userAnswers[questionIndex] = parseInt(this.value);
            
            // Auto-advance to next question after selection
            setTimeout(() => {
                if (questionIndex < quizQuestions.length - 1) {
                    showNextQuestion();
                }
            }, 500);
        });
    });

    // Show/hide navigation buttons based on current question
    updateNavigationButtons();
}

// Function to update navigation buttons
function updateNavigationButtons() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (currentQuestion < quizQuestions.length - 1) {
        if (!nextBtn) {
            const submitBtn = document.querySelector('#submit-btn');
            const nextButton = document.createElement('button');
            nextButton.type = 'button';
            nextButton.id = 'next-btn';
            nextButton.textContent = 'Next Question →';
            nextButton.addEventListener('click', showNextQuestion);
            quizForm.insertBefore(nextButton, submitBtn);
        }
    } else if (nextBtn) {
        nextBtn.remove();
    }

    if (currentQuestion > 0) {
        if (!prevBtn) {
            const firstButton = quizForm.querySelector('button');
            const prevButton = document.createElement('button');
            prevButton.type = 'button';
            prevButton.id = 'prev-btn';
            prevButton.textContent = '← Previous Question';
            prevButton.addEventListener('click', showPreviousQuestion);
            quizForm.insertBefore(prevButton, firstButton);
        }
    } else if (prevBtn) {
        prevBtn.remove();
    }
}

// Function to show next question
function showNextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        document.getElementById(`question-${currentQuestion}`).style.display = 'none';
        currentQuestion++;
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        updateNavigationButtons();
        
        // Restart timer for new question
        if (quizTimer) clearInterval(quizTimer);
        startQuestionTimer();
    }
}

// Function to show previous question
function showPreviousQuestion() {
    if (currentQuestion > 0) {
        document.getElementById(`question-${currentQuestion}`).style.display = 'none';
        currentQuestion--;
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        updateNavigationButtons();
        
        // Restart timer for previous question
        if (quizTimer) clearInterval(quizTimer);
        startQuestionTimer();
    }
}

// Function to start question timer
function startQuestionTimer() {
    timeLeft = questionTimeLimit;
    updateTimerDisplay();
    
    quizTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            if (currentQuestion < quizQuestions.length - 1) {
                showNextQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

// Function to update timer display
function updateTimerDisplay() {
    if (timerDisplay) {
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        timerDisplay.className = timeLeft <= 10 ? 'timer warning' : 'timer';
    }
}

// Function to show results and explanations
function showResults() {
    clearInterval(quizTimer);
    
    let score = 0;
    const results = [];

    quizQuestions.forEach((currentQuestion, questionIndex) => {
        const userAnswer = userAnswers[questionIndex];
        const isCorrect = userAnswer === currentQuestion.correctAnswer;
        
        if (isCorrect) {
            score++;
        }

        results.push(`
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <h4>Q${questionIndex + 1}: ${currentQuestion.question}</h4>
                <p>Your answer: ${currentQuestion.choices[userAnswer] || 'Not answered'}</p>
                <p>Correct answer: ${currentQuestion.choices[currentQuestion.correctAnswer]}</p>
                ${currentQuestion.explanation ? `<p class="explanation">${currentQuestion.explanation}</p>` : ''}
            </div>
        `);
    });

    const scorePercentage = (score / quizQuestions.length) * 100;
    let message = '';
    
    if (scorePercentage >= 80) message = 'Excellent work! 🎉';
    else if (scorePercentage >= 60) message = 'Good job! 👍';
    else if (scorePercentage >= 40) message = 'Not bad! Keep practicing. 💪';
    else message = 'Keep learning! 📚';

    resultContainer.innerHTML = `
        <div class="score-card">
            <h2>${message}</h2>
            <p class="score">You scored ${score} out of ${quizQuestions.length} questions correctly (${scorePercentage.toFixed(1)}%)</p>
            <div class="results-list">
                ${results.join('')}
            </div>
        </div>
    `;

    // Show reset button
    resetBtn.style.display = 'block';
    
    // Animate results
    setTimeout(() => {
        resultContainer.classList.add('show');
    }, 100);
}

// Function to reset quiz and show start screen
function resetQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    resultContainer.innerHTML = '';
    resultContainer.classList.remove('show');
    resetBtn.style.display = 'none';
    quizArea.style.display = 'none';
    startScreen.style.display = 'block';
    if (quizTimer) clearInterval(quizTimer);
}

// Function to start quiz on button click
function startQuiz() {
    startScreen.style.display = 'none';
    quizArea.style.display = 'block';
    buildQuiz();
    startQuestionTimer();
}

// Event listeners
quizForm.addEventListener('submit', function(event) {
    event.preventDefault();
    showResults();
});

resetBtn.addEventListener('click', resetQuiz);
startBtn.addEventListener('click', startQuiz);

// Initially hide quiz area, show start screen
quizArea.style.display = 'none';
startScreen.style.display = 'block';
