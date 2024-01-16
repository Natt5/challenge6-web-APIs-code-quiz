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
    document.getElementbyId('questions').style.display = 'block';
    showQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}


