// Tasks
// Create a code quiz that contains the following requirements:

// * A start button that when clicked a timer starts and the first question appears.
 
//   * Questions contain buttons for each answer.
//   * 
//   * When answer is clicked, the next question appears
//   * 
//   * If the answer clicked was incorrect then subtract time from the clock

// * The quiz should end when all questions are answered or the timer reaches 0.

//   * When the game ends, it should display their score and give the user the ability to save their initials and their score

// 1. Creating a new quiz wed dev related questions/answers (basic)
let questions = [
    {
        question: "What does CSS stand  for?",
        choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colourful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTTP method is typically used to retrieve data from a server?",
        choices: ["POST", "GET", "PUT", "DELETE"],
        answer: "GET"
    },
    {
        question: "Which of th efollowing is a valid way to declare a varriable in JavaScript?",
        choices: ["let variableName;", "int variableName;", "var variableName;", "float variableName;"],
        answer: "let variableName;"
    }
];

// Starting the quiz

function startQuiz (){
    currentQuestionIndex = 0;
    timeLeft= 60;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
    showQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

// Showing questions part

function showQuestion(){
    let question = questions[currentQuestionIndex];
    let questionTitle = document.getElementById('question-title');
    let choicesContainer = document.getElementById('choices');

    questionTitle.textContent = question.question;
    choicesContainer.innerHTML = '';

    question.choices.forEach(function(choice, i) {
        let choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.className = 'choice';
        choiceButton.addEventListener('click', function() {
            checkAnswer (choice);
        });
        choicesContainer.appendChild(choiceButton);
    });

    }

// Timer update

function checkAnswer(answer) {
    if (answer !==questions[currentQuestionIndex].answer){
        timeLeft -= 10; //penalty for answering incorrectly
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        endQuiz();
    }
}

//Timer function

function updateTimer() {
    if (timeLeft <= 0) {
        endQuiz();
        return; //the quiz will end when the time runs out
    }
    document.getElementById('time').textContent = timeLeft;
    timeLeft--; //lessens the time
}

//Timer stopper upon quiz end

function endQuiz () {
    clearInterval(timerInterval);
    document.getElementById('questions').style.display = 'none';
    let endScreen = document.getElementById('end-screen');
    endScreen.style.display = 'block';
    document.getElementById('final-score').textContent = timeLeft; //displaying the score
    document.getElementById('submit').addEventListener('click', function(){
        let initials = document.getElementById('initials').ariaValueMax;
        if (initials) {
            saveHighScore(inititals, timeLeft);
        }
    });
}

//Saving the highscore and initials of the participant

function saveHighScore(initials, score){
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials, score });
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    displayingHighScores();
}

function displayHighScores() {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    let highscoresList = document.getElementById('highscores');
    highscoresList.innerHTML = ''; //clearing scores that existed before
    highscores.forEach(function(scoreEntry) {
        let li = document.createElement('li');
        li.textContent = '${scoreEntry.initials} - ${scoreEntry.score}' ;
        highscoresList.appendChild(li);
    });
}

document.getElementById('clear').addEventListener('click', function() {
    localStorage.removeItem('highscores');
    displayHighScores();
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('highscores.html')) {
        displayHighScores();
    }
});
document.getElementById('start').addEventListener('click', startQuiz);

document.addEventListener('DOMContentLoaded', function() {
//initialization code here
});
