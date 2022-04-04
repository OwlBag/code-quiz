const timerLength = 75;

highScores = [];

startContainer = document.createElement("div");
resultsContainer = document.createElement("div");
highScoreContainer = document.createElement("div");
questionContainer = document.createElement("div");

var timer = timerLength;
var timerVar

var currentQuestion = 0;

const siteContent = document.querySelector("#site-content")

var lastAnswerCorrect = "";

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
        highScores = [];
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
    highScoreContainer.remove();
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

    highScoreContainer = document.createElement("div");
    highScoreContainer.className = "score-container";
    highScoreContainer.innerHTML = "<h2>High scores</h2>"

    scoreList = document.createElement("ul");
    scoreList.className = "score-list";

    loadHighScores();
    for (var i = 0; i < highScores.length; i++){
        scoreEl = document.createElement("li");
        scoreEl.innerHTML = "<h3 class='score'>" + (i+1) + ": " + highScores[i].initials.toUpperCase() + " - " + highScores[i].score + "</h3>"

        scoreList.appendChild(scoreEl);
    }

    scoreButtons = document.createElement("div");
    scoreButtons.className = "score-buttons"

    resetBtn = document.createElement("button");
    resetBtn.className = "btn reset-btn";
    resetBtn.textContent = "Reset High Scores"

    backBtn = document.createElement("button")
    backBtn.className = "btn back-btn";
    backBtn.textContent = "Go Back"

    scoreButtons.appendChild(resetBtn);
    scoreButtons.appendChild(backBtn);

    highScoreContainer.appendChild(scoreList);
    highScoreContainer.appendChild(scoreButtons);

    siteContent.appendChild(highScoreContainer);
}

// displays a question
const displayQuestion = function() {
    resetSiteContent();

    var curQ = questionsArray[currentQuestion];

    questionContainer = document.createElement("div");
    questionContainer.className = "question-content";

    questionContainer.innerHTML = "<h2>" + curQ.question + "</h2>"

    answersDiv = document.createElement("div");
    answersDiv.className = "answers-div"

    answersContainer = document.createElement("ul");
    answersContainer.className = "answers-list"

    for (var i = 0; i < curQ.answers.length; i++){
        ansEl = document.createElement("button")
        ansEl.className = "btn answer-btn"
        ansEl.setAttribute("answer-id", i);
        ansEl.textContent = (i+1) + ". " + curQ.answers[i];

        answersContainer.appendChild(ansEl);
    }
    
    dummyDiv = document.createElement("div")
    dummyDiv.className = "dummy"

    answersDiv.appendChild(answersContainer);
    answersDiv.appendChild(dummyDiv);

    questionContainer.appendChild(answersDiv);

    if (lastAnswerCorrect){
        answerCorrectEl = document.createElement("div");
        answerCorrectEl.className = "answer-correct";
        answerCorrectEl.textContent = lastAnswerCorrect;

        questionContainer.appendChild(answerCorrectEl)
    }

    siteContent.appendChild(questionContainer);
}

//handles the action of clicking the start button, the high score submit button, the "go back" and "clear high scores" buttons, and each answer button
const handleButtonClick = function(event) {
    event.preventDefault();

    if (event.target.matches(".start-btn")){
        console.log("Start button pressed")
        timer = timerLength;
        currentQuestion = 0;
        lastAnswerCorrect = "";
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
                "initials": initialsValue.toLowerCase(),
                "score": timer
            }
            loadHighScores();
            console.log(highScores)
            highScores.push(stats);
            localStorage.setItem("highScores", JSON.stringify(highScores))
            displayHighScores();
        } else {
            alert("No initials input!")
        }
        
    }
    else if (event.target.matches(".back-btn")){
        displayStartScreen();
    }
    else if (event.target.matches(".reset-btn")){
        highScores = [];
        localStorage.setItem("highScores", "");
        displayHighScores();
    }
    else if (event.target.matches(".answer-btn")){
        console.log(event.target.getAttribute("answer-id"))
        console.log(questionsArray[currentQuestion].correctAnswer)
        if (parseInt(event.target.getAttribute("answer-id")) !== questionsArray[currentQuestion].correctAnswer){
            timer = timer - 10;
            lastAnswerCorrect = "Wrong!"
        } else {
            lastAnswerCorrect = "Correct!"
        }
        currentQuestion++;
        if (currentQuestion >= questionsArray.length){
            clearInterval(timerVar);
            displayResultsScreen();
        } else {
            displayQuestion();
        }
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

displayStartScreen();

