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
            question: "Commonly used data types DO NOT include: ",
            answers: [
                { text: "Strings", correct: false},
                { text: "Booleans", correct: false},
                { text: "Alerts", correct: true},
                { text: "Numbers", correct: false},
            ],
        },
        {
            question: "The condition in an if/else statement is enclosed within ____. ",
            answers: [
                { text: "Quotes", correct: false},
                { text: "Curly brackets", correct: false},
                { text: "Parenthesis", correct: true},
                { text: "Square brackets", correct: false},
            ],
        },
        {
            question: "Arrays in JavaScript can be used to store ____. ",
            answers: [
                { text: "Numbers and strings", correct: false},
                { text: "Other arrays", correct: false},
                { text: "Booleans", correct: false},
                { text: "All of the above", correct: true},
            ],
        },
        {
            question: "String values must be enclosed within ____ when being assigned to variables. ",
            answers: [
                { text: "Commas", correct: false},
                { text: "Curly brackets", correct: false},
                { text: "Quotes", correct: true},
                { text: "Parenthesis", correct: false},
            ],
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
            answers: [
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
        startClock();
        setNextQuestion();
    }

    function startClock() {
        timerInterval = setInterval(() => {
            timer--;
            clock.innerText = "${timer} seconds";
            if (timer <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion() {
        questionsSection.innerText = question.question;
        question.answers.forEach(answer => {
            var button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("button");
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener ("click", selectAnswer);
            answerButton.appendChild(button);
        });
    }

});