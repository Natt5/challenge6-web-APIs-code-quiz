
//Creating a new quiz wed dev related questions/answers (basic)

let questions = [
    {
        question: "What does CSS stand for?",
        choices: ["1. Computer Style Sheets", "2. Creative Style Sheets", "3. Cascading Style Sheets", "4. Colourful Style Sheets"],
        answer: "3"
    },
    {
        question: "Which HTTP method is typically used to retrieve data from a server?",
        choices: ["1. POST", "2. GET", "3. PUT", "4. DELETE"],
        answer: "2"
    },
    {
        question: "Which of the following is a valid way to declare a varriable in JavaScript?",
        choices: ["1. let variableName", "2. int variableName", "3. var variableName", "4. float variableName"],
        answer: "1"
    }
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;


// Event listener start button

let startButton = document.getElementById('start');
if (startButton) {
    startButton.addEventListener('click', startQuiz);
}

// Starting the quiz

function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');
    showQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

// Showing questions

function showQuestion() {
    let question = questions[currentQuestionIndex];
    let questionTitle = document.getElementById('question-title');
    let choicesContainer = document.getElementById('choices');

    choicesContainer.innerHTML = '';

    questionTitle.textContent = question.question;

    question.choices.forEach(function(choice, index) {
        let choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.className = 'choice';

        choiceButton.dataset.number = index + 1;
        choiceButton.addEventListener('click', function() {
            checkAnswer(this.dataset.number);
        });
        choicesContainer.appendChild(choiceButton);
    });
}

// Sound feedback for answered questions

function checkAnswer(selectedChoice) {
    let feedback = document.getElementById('feedback');
    let correctSound = document.getElementById('correct-sound');
    let wrongSound = document.getElementById('wrong-sound');
let correctAnswer = questions[currentQuestionIndex].answer;

if (selectedChoice !== correctAnswer) {
    timeLeft -= 10; //penalty
    feedback.textContent = "Wrong!";
    wrongSound.play(); // Wrong answer sound
} else {
    feedback.textContent = "Correct!";
    correctSound.play(); // Correct answer sound
}

// Show feedback and hide it after a short duration

feedback.classList.remove('hide');
setTimeout(function() {
    feedback.classList.add('hide');

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}, 1000);
}

//Timer function

function updateTimer() {
    let timeElement = document.getElementById('time');
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
    endQuiz();
    } else {
    timeLeft--; // Decrease the time
    }
    }

//Ending quiz

function endQuiz() {
    clearInterval(timerInterval);
    let questionsElement = document.getElementById('questions');
    questionsElement.classList.add('hide');
    let endScreen = document.getElementById('end-screen');
    endScreen.classList.remove('hide');
    let finalScoreElement = document.getElementById('final-score');
    finalScoreElement.textContent = timeLeft;
    }

    // Submit button

    document.getElementById('submit').addEventListener('click', function() {
        let initialsInput = document.getElementById('initials');
        let initials = initialsInput.value.trim();
        if (initials) {
        saveHighScore(initials, timeLeft);
        initialsInput.value = '';

        window.location.href = 'highscores.html';
        } else {
        alert('Please enter your initials!');
        }
        });

//Saving the highscore and initials of the user

function saveHighScore(initials, score) {

    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    highscores.push({ initials, score });

    highscores.sort((a, b) =>
b.score - a.score);

localStorage.setItem('highscores', JSON.stringify(highscores));

}

//display the highscore for the user 

function displayHighScores() {

    let highscoresList = document.getElementById('highscores');
    if (highscoresList) {

    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    highscoresList.innerHTML = '';

    highscores.forEach(function(scoreEntry) {
    let li = document.createElement('li');
    li.textContent = `${scoreEntry.initials} - ${scoreEntry.score}`;
    highscoresList.appendChild(li);
    });
    }
    }

//cleaning the highscores data

document.getElementById('clear').addEventListener('click', function() {

    localStorage.removeItem('highscores');

    displayHighScores();

    console.log("High scores cleared.");
    });

//DOM part

document.addEventListener('DOMContentLoaded', function() {

    let startButton = document.getElementById('start');
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }

    let submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener('click', submitHighScore);
    }

    let clearButton = document.getElementById('clear');
    if (clearButton) {
        clearButton.addEventListener('click', clearHighScores);
    }

    if (document.getElementById('highscores')) {
        displayHighScores();
    }
});

function submitHighScore() {
    let initialsInput = document.getElementById('initials');
    let initials = initialsInput.value.trim();
    if (initials) {
        saveHighScore(initials, timeLeft);
        initialsInput.value = '';

        window.location.href = 'highscores.html';
    } else {
        alert("Please enter your initials!");
    }
}

function clearHighScores() {
    localStorage.removeItem('highscores');
    displayHighScores();
}

function saveHighScore(initials, score) {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    let newScore = { initials, score };
    highscores.push(newScore);
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highscores', JSON.stringify (highscores));
}

function displayHighScores() {
    let highscoresList = document.getElementById('highscores');
    if (highscoresList) {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscoresList.innerHTML = '';
    highscores.forEach(function(scoreEntry) {
    let li = document.createElement('li');
    li.textContent = `${scoreEntry.initials} - ${scoreEntry.score}`;
    highscoresList.appendChild(li);
    });
    }
    }
    if(window.location.pathname.includes('highscores.html')) {
    displayHighScores();
    }