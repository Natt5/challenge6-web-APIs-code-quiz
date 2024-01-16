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
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colourful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTTP method is typically used to retrieve data from a server?",
        choices: ["POST", "GET", "PUT", "DELETE"],
        answer: "GET"
    },
    {
        question: "Which of the following is a valid way to declare a varriable in JavaScript?",
        choices: ["let variableName;", "int variableName;", "var variableName;", "float variableName;"],
        answer: "let variableName;"
    }
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;


document.getElementById('start').addEventListener('click', startQuiz);

// Starting the quiz

// function startQuiz (){
//     currentQuestionIndex = 0;
//     timeLeft= 60;
//     document.getElementById('start-screen').style.display = 'none';
//     document.getElementById('questions').style.display = 'block';
//     showQuestion();
//     timerInterval = setInterval(updateTimer, 1000);
// }

//debugging

function startQuiz() {
    console.log("Quiz started"); // Debugging line
    currentQuestionIndex = 0;
    timeLeft = 60;
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');
    showQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

// Showing questions part

function showQuestion() {
    let question = questions[currentQuestionIndex];
    let questionTitle = document.getElementById('question-title');
    let choicesContainer = document.getElementById('choices');

    questionTitle.textContent = question.question;
    choicesContainer.innerHTML = '';

    question.choices.forEach(function(choice, index) {
        let choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.className = 'choice';
        choiceButton.addEventListener('click', function() {
            checkAnswer(choice);
        });
        choicesContainer.appendChild(choiceButton);
    });
    console.log("Displayed question: " + question.question); //debugging

    }

// Timer update

function checkAnswer(answer) {
    if (answer !== questions[currentQuestionIndex].answer) {
    timeLeft -= 10; // Penalty for answering incorrectly
    // console.log("Wrong answer, time penalty applied."); // Debugging 
    } else {
    // console.log("Correct answer!"); // Debugging 
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
    showQuestion();
    } else {
    endQuiz();
    }
    }

//Timer function

function updateTimer() {
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) {
    endQuiz();
    } else {
    timeLeft--; // Decrease the time
    }
    console.log("Timer updated: " + timeLeft); // Debugging 
    }

//Timer stopper upon quiz end

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('questions').classList.add('hide');
    let endScreen = document.getElementById('end-screen');
    endScreen.classList.remove('hide');
    document.getElementById('final-score').textContent = timeLeft;
    console.log("Quiz ended, final score: " + timeLeft); // Debugging 
    }

//Saving the highscore and initials of the participant

function saveHighScore(initials, score) {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials, score });
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    displayHighScores();
    }

//display the highscore for the user    

function displayHighScores() {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    let highscoresList = document.getElementById('highscores');
    highscoresList.innerHTML = '';
    highscores.forEach(function(scoreEntry) {
    let li = document.createElement('li');
    li.textContent = '${scoreEntry.initials} - ${scoreEntry.score}';
    highscoresList.appendChild(li);
    });
    }

//cleaning the highscores data

document.getElementById('clear').addEventListener('click', function() {
    localStorage.removeItem('highscores');
    displayHighScores();
    console.log("High scores cleared."); // Debugging 
    });

//DOM part

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes
    ('highscores.html')) {
    displayHighScores();
    } else {
    document.getElementById('start').addEventListener('click', startQuiz);
    }
    console.log("DOM fully loaded and parsed"); // Debugging 
    });

//displayng the highscores

if (window.location.pathname.includes('highscores.html')) {
    displayHighScores();
    }
// document.getElementById('start').addEventListener('click', startQuiz);

// document.addEventListener('DOMContentLoaded', function() {
// //initialization code here
// });
