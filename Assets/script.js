document.addEventListener("DOMContentLoaded", () => {
    var startQuiz = document.getElementById("start-button");
    var questionsSection = document.getElementById("questions-section");
    var question = document.getElementById("");
    var answerButton = document.getElementById("answer-button");
    var clock = document.getElementById("clock");
    var submitScoreForm = document.getElementById("submit-score-form");
    var userInitials = document.getElementById("user-initials");
    var feedback = document.getElementById("feedback");
    var finalScore = document.getElementById("final-score");
    var viewHighscores = document.getElementById("view-highscores");
    var highscores = document.getElementById("highscores");
    var highscoresList = document.getElementById("highscores-list");
    var goBackButton = document.getElementById("go-back-button");
    var clearHighscoresButton = document.getElementById("clear-highscores-button");

    let currentQuestionIndex, timer, score, timerInterval;

    startQuiz.addEventListener("click", startQuiz);
    submitScoreForm.addEventListener("submit", saveHighscores);
    highscoresList.addEventListener("click", showHighscores);
    goBackButton.addEventListener("click", goBack);
    clearHighscoresButton.addEventListener("click", clearHighscores);

    var questions = [
        {
            question1: "Commonly used data types DO NOT include: ",
            answers1: [
                { text: "Strings", correct: false},
                { text: "Booleans", correct: false},
                { text: "Alerts", correct: true},
                { text: "Numbers", correct: false},
            ],
        },
        {
            question2: "The condition in an if/else statement is enclosed within ____. ",
            answers2: [
                { text: "Quotes", correct: false},
                { text: "Curly brackets", correct: false},
                { text: "Parenthesis", correct: true},
                { text: "Square brackets", correct: false},
            ],
        },
        {
            question3: "Arrays in JavaScript can be used to store ____. ",
            answers3: [
                { text: "Numbers and strings", correct: false},
                { text: "Other arrays", correct: false},
                { text: "Booleans", correct: false},
                { text: "All of the above", correct: true},
            ],
        },
        {
            question4: "String values must be enclosed within ____ when being assigned to variables. ",
            answers4: [
                { text: "Commas", correct: false},
                { text: "Curly brackets", correct: false},
                { text: "Quotes", correct: true},
                { text: "Parenthesis", correct: false},
            ],
        },
        {
            question5: "A very useful tool used during development and debugging for printing content to the debugger is: ",
            answers5: [
                { text: "JavaScript", correct: false},
                { text: "Terminal / bash", correct: false},
                { text: "For loops", correct: false},
                { text: "Console.log", correct: true},
            ],
        },
    ];
    
    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        startQuiz.classList.add("hide");
        timer = 60;
        clock.innerText = "%{timer} seconds";
        questionsSection.classList.remove("hide");
        // startClock(); Declarar funciones para después
        // setNextQuestion(); Declarar funciones para después
    }

});