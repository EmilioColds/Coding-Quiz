document.addEventListener("DOMContentLoaded", () => {
    var startQuizButton = document.getElementById("start-button"); //startButton
    var quizIntro = document.getElementById("intro-quiz") 
    var questionsSection = document.getElementById("questions-section"); //questionContainerElement
    var questionElement = document.getElementById("question"); //questionElement
    var answerButton = document.getElementById("answer-button"); //answerButtonsElement
    var clock = document.getElementById("clock"); //timerElement

    var submitScoreForm = document.getElementById("submit-score-form"); //submitScoreForm
    var userInitials = document.getElementById("user-initials"); //userInitialsInput
    var feedback = document.getElementById("feedback"); //Added
    var finalScore = document.getElementById("final-score"); //finalScoreElement
    var viewHighscores = document.getElementById("view-highscores"); //highscoresLink
    var highscores = document.getElementById("highscores"); //highscoresContainer
    var highscoresList = document.getElementById("highscores-list"); //highscoresList
    var goBackButton = document.getElementById("go-back-button");
    var clearHighscoresButton = document.getElementById("clear-highscores-button");

    let currentQuestionIndex, timer, score, timerInterval;

    startQuizButton.addEventListener("click", startQuiz);
    submitScoreForm.addEventListener("submit", saveHighscores);
    highscoresList.addEventListener("click", showHighscores);
    goBackButton.addEventListener("click", goBack);
    clearHighscoresButton.addEventListener("click", clearHighscores);
    
    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        startQuizButton.classList.add("hide");
        timer = 60;
        clock.innerText = `%{timer}`;
        questionsSection.classList.remove("hide");
        quizIntro.classList.add("hide");
        startClock();
        setNextQuestion();
    }

    function startClock() {
        timerInterval = setInterval(() => {
            timer--;
            clock.innerText = `${timer}`;
            if (timer <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = questions[currentQuestionIndex].question;
        questions[currentQuestionIndex].answers.forEach(answer => {
            var button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("button");
            button.dataset.correct = answer.correct
            // if (answer.correct) {
                // button.dataset.correct = answer.correct;
            // }
            button.addEventListener ("click", selectAnswer);
            answerButton.appendChild(button);
        });
    }

    function resetState() {
        while (answerButton.firstChild) {
            answerButton.removeChild(answerButton.firstChild);
        }
    }

    function selectAnswer(e) {
        var selectedButton = e.target;
        var correctAnswer = selectedButton.dataset.correct;
        if (correctAnswer) {
            score++;
        } else {
            timer -= 10;
            if (timer < 0) timer = 0;
            clock.innerText = `${timer}`;
        }
        if (currentQuestionIndex < questions.length - 1){
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timerInterval);
        questionsSection.classList.add("hide");
        submitScoreForm.classList.remove("hide");
        finalScore.innerText = score;
    }

    function saveHighscores(event) {
        event.preventDefault();
        var initials = userInitials.value;
        var highscores = JSON.parse(localStorage.getItem("oldHighscores")) || [];
        var newScore = { initials, score };
        highscores.push(newScore);
        highscores.sort((a, b) => b.score - a.score);
        localStorage.setItem("oldHighscores", JSON.stringify(highscores));
        loadHighscores();
        userInitials.value = " ";
        submitScoreForm.classList.add("hide");
        highscores.classList.remove("hide");
    }

    function showHighscores() {
        loadHighscores();
        startQuiz.classList.add("hide");
        highscores.classList.remove("hide");
    }

    function loadHighscores() {
        var oldHighscores = JSON.parse(localStorage.getItem("oldHighscores")) || [];
        highscoresList.innerText = oldHighscores
            .map(score => `<li>${score.initials} - ${score.score}}</li>`)
            .join(" ");
    }

    function goBack() {
        highscores.classList.add("hide");
        startQuiz.classList.remove("hide");
        resetState();
    }

    function clearHighscores() {
        localStorage.removeItem("oldHighscores");
        highscoresList.innerText = " ";
    }

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
});