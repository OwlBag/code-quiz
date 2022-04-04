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

const displayStartScreen = function() {
    startContainer = document.createElement("div")
    startContainer.className = "start-screen"

    startContainer.innerHTML = "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!</p>"

    startButton = document.createElement("button")
    startButton.textContent = "Start Quiz"
    startButton.className = "btn start-btn"

    startContainer.appendChild(startButton)

    siteContent.appendChild(startContainer)
}

displayStartScreen();

const handleButtonClick = function(event) {
    if (event.target.matches(".start-btn")){
        console.log("Start button pressed")
    }
}

siteContent.addEventListener("click", handleButtonClick);