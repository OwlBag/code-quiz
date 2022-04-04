const timerLength = 1;

highScores = [];

startContainer = document.createElement("div");
resultsContainer = document.createElement("div");
questionContainer = document.createElement("div");

var timer = timerLength;
var timerVar

var currentQuestion = 0;

const siteContent = document.querySelector("#site-content")

var questionsArray = [];
const questions = [ 
    "Commonly used data types DO Not Include:", 
    "The condition in an if / else is enclosed with ____.", 
    "Arrays in JavaScript can be used to store ____.", 
    "String variables must be enclosed in ____ when being assigned to variables.", 
    "A very useful tool used during development and debugging for printing content to the debugger is:"
];

const answers = [
    [
        "strings",
        "booleans",
        "alerts",
        "numbers"
    ],
    [
        "quotes",
        "curly brackets",
        "parenthesis",
        "square brackets"
    ],
    [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
    ],
    [
        "commas",
        "curly brackets",
        "quotes",
        "parenthesis"
    ],
    [
        "JavaScript",
        "terminal/bash",
        "for loops",
        "console.log" 
    ]

];

const correctAnswers = [2, 2, 3, 2, 3];

// packs the questions into objects
const fillQuestionsArray = function(){
    for (var i = 0; i < questions.length; i++){
        const question = {
            "question": questions[i],
            "answers" : answers[i],
            "correctAnswer": correctAnswers[i] 
        };
        questionsArray.push(question)
    }    
}

fillQuestionsArray();

function highScoreSort(a, b){
    score1 = parseInt(a.score)
    score2 = parseInt(b.score)

    if (score1 > score2){
        return -1;
    }
    if (score1 < score2){
        return 1;
    }

    return 0;
};

// loads the high scores from localStorage
const loadHighScores = function() {
    highScores = localStorage.getItem("highScores");
    console.log("Got high scores:")
    console.log(highScores);
    
    if (!highScores){
        return false;
    }

    highScores = JSON.parse(highScores);
    highScores = highScores.sort(highScoreSort);
    console.log(highScores.sort(highScoreSort))
}

// removes all container elements on the screen so that new things can be drawn
const resetSiteContent = function() {
    startContainer.remove();
    resultsContainer.remove();
    questionContainer.remove();
}

// generates the screen that is shown upon opening the app
const displayStartScreen = function() {
    resetSiteContent();

    startContainer = document.createElement("div");
    startContainer.className = "start-screen";
    startContainer.innerHTML = "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!</p>"

    startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.className = "btn start-btn";

    startContainer.appendChild(startButton);

    siteContent.appendChild(startContainer);
}

// displays the initials input screen
const displayResultsScreen = function() {
    resetSiteContent();

    resultsContainer = document.createElement("div");
    resultsContainer.className = "results-screen";

    resultsContent = document.createElement("div");
    resultsContent.className = "results-content"
    resultsContent.innerHTML = "<h2>All done!</h2><h3>Your final score is " + timer + ".</h3>";

    resultsSubmit = document.createElement("div");
    resultsSubmit.className = "results-submit";
    resultsSubmit.innerHTML = "<h3>Enter initials:</h3>"

    initialsInput = document.createElement("input");
    initialsInput.className = "initials-input";
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("name", "initials-input")

    initialsSubmit = document.createElement("button");
    initialsSubmit.className = "btn initials-btn";
    initialsSubmit.textContent = "Submit"
    
    resultsSubmit.appendChild(initialsInput);
    resultsSubmit.appendChild(initialsSubmit);
    resultsContent.appendChild(resultsSubmit);
    resultsContainer.appendChild(resultsContent);

    siteContent.appendChild(resultsContainer);
}

// displays high score page
const displayHighScores = function() {
    resetSiteContent();

    highScoreContainers = document.createElement("div");

}

// displays a question
const displayQuestion = function() {
    resetSiteContent();
    
}

//handles the action of clicking the start button, the high score submit button, the "go back" and "clear high scores" buttons, and each answer button
const handleButtonClick = function(event) {
    event.preventDefault();

    if (event.target.matches(".start-btn")){
        console.log("Start button pressed")
        timer = timerLength;
        currentQuestion = 0;
        clearInterval(timerVar);
        timerVar = setInterval(timerCountdown, 1000);
        displayQuestion();
    }
    else if (event.target.matches(".initials-btn")){
        parentTarget = event.target.parentElement;
        initialsValue = parentTarget.querySelector(".initials-input").value
        if (initialsValue){   
            console.log("initials submitted")
            const stats = {
                "initials": initialsValue,
                "score": timer
            }
            loadHighScores();
            highScores.push(stats);
            localStorage.setItem("highScores", JSON.stringify(highScores))
            displayHighScores();
        } else {
            alert("No initials input!")
        }
        
    }
    else if (event.target.matches(".go-back-btn")){
        displayStartScreen();
    }
    else if (event.target.matches(".reset-score-btn")){
        highScores = [];
        localStorage.setItem("highScores", "");
    }
    else if (event.target.matches(".answer-btn")){

    }
}

siteContent.addEventListener("click", handleButtonClick);

const timerCountdown = function() {
    if (timer > 0){
        console.log(timer);
        timer--;
    } else {
        clearInterval(timerVar);
        console.log("Time's Up!");
        displayResultsScreen();
    }
}

displayResultsScreen();

