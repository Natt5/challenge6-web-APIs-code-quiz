// Tasks
// Create a code quiz that contains the following requirements:

// * A start button that when clicked a timer starts and the first question appears.DONE
 
//   * Questions contain buttons for each answer.DONE
//   * 
//   * When answer is clicked, the next question appears DONE
//   * 
//   * If the answer clicked was incorrect then subtract time from the clock DONE

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
    console.log("Displayed question: " + question.question);

    }

// Timer update

function checkAnswer(answer) {
    if (answer !== questions[currentQuestionIndex].answer) {
    timeLeft -= 10; // Penalty for answering incorrectly
    console.log("Wrong answer, time penalty applied.");
    } else {
    console.log("Correct answer!");
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
    console.log("Timer updated: " + timeLeft);
    }

//Timer stopper upon quiz end

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('questions').classList.add('hide');
    let endScreen = document.getElementById('end-screen');
    endScreen.classList.remove('hide');
    document.getElementById('final-score').textContent = timeLeft;
    
}

document.getElementById('submit').addEventListener('click', function() {
    let initialsInput = document.getElementById('initials');
    let initials = initialsInput.value.trim();
    if (initials) {
        saveHighScore(initials, timeLeft);//fixing needed 
        initialsInput.value = '';
    }
});

//Saving the highscore and initials of the participant

function saveHighScore(initials, score) {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials, score });
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    displayHighScores(); //fixing here needed 
}

//display the highscore for the user    

function displayHighScores() {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    let highscoresList = document.getElementById('highscores');
    highscoresList.innerHTML = ''; //fixing here is needed 
    highscores.forEach(function(scoreEntry) {
    let li = document.createElement('li');
    li.textContent = `${scoreEntry.initials} - ${scoreEntry.score}`;
    highscoresList.appendChild(li);
    });
    }

//cleaning the highscores data

document.getElementById('clear').addEventListener('click', function() {
    localStorage.removeItem('highscores');
    displayHighScores();
    console.log("High scores cleared.");
    });

//DOM part

document.addEventListener('DOMContentLoaded', function() {
    // For the start button
    let startButton = document.getElementById('start');
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }

    // For the submit button
    let submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            let initialsInput = document.getElementById('initials');
            let initials = initialsInput.value.trim();
            if (initials) {
                saveHighScore(initials, timeLeft);
            }
        });
    }

    // For the clear high scores button
    let clearButton = document.getElementById('clear');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            localStorage.removeItem('highscores');
            displayHighScores();
        });
    }

    if (document.getElementById('highscores')) {
        displayHighScores();
    }
});
