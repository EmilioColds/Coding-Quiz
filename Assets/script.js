document.addEventListener("DOMContentLoaded", () => {
    var startQuizButton = document.getElementById("start-button"); //startButton
    var quizIntro = document.getElementById("intro-quiz") 
    var questionsSection = document.getElementById("questions-section"); //questionContainerElement
    var questionElement = document.getElementById("question"); //questionElement
    var answerButton = document.getElementById("answer-button"); //answerButtonsElement
    var clock = document.getElementById("clock"); //timerElement
    var submitScoreSection = document.getElementById("submit-score"); //submitScore
    var submitScoreForm = document.getElementById("submit-score-form"); //submitScoreForm
    var userInitials = document.getElementById("user-initials"); //userInitialsInput
    var feedback = document.getElementById("feedback"); //Added the ID
    var finalScore = document.getElementById("final-score"); //finalScoreElement
    var viewHighscores = document.getElementById("view-highscores"); //highscoresLink
    var highscoresContainer = document.getElementById("highscores-section"); //highscoresContainer
    var highscoresList = document.getElementById("highscores-list"); //highscoresList
    var goBackButton = document.getElementById("go-back-button");
    var clearHighscoresButton = document.getElementById("clear-highscores-button");
    hideSubmitScoreSection();

    let currentQuestionIndex, timer, score, timerInterval;

    startQuizButton.addEventListener("click", startQuiz);
    submitScoreForm.addEventListener("submit", saveHighscores);
    highscoresList.addEventListener("click", showHighscores);
    viewHighscores.addEventListener("click", showHighscores);
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
        var correct = selectedButton.dataset.correct === "true";
        displayFeedback(correct);
        if (!correct) {
            timer -= 10;
            if (timer < 0) timer = 0;
            clock.innerText = `${timer}`;
        } else {
            score++;
        }
        
        setTimeout(() => {
            feedback.classList.add("hide");
        }, 1000);
        
        if(currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                currentQuestionIndex++;
                setNextQuestion();
            }, 1000);
        } else {
            setTimeout(endQuiz, 1000);
        }
    }

    function displayFeedback(correct) {
        if (correct) {
            feedback.innerText = "Correct!";
        } else {
            feedback.innerText = "Wrong!";
        }
        feedback.classList.remove("hide");
        setTimeout(() => {
            feedback.classList.add("hide");
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timerInterval);
        questionsSection.classList.add("hide");
        submitScoreSection.classList.remove("hide");
        submitScoreSection.classList.add("center-content")
        finalScore.innerText = score;
    }

    function saveHighscores(event) {
        event.preventDefault();
        var initials = userInitials.value.trim();
        if (initials) {
            var storedHighscores = JSON.parse(localStorage.getItem("highscores")) || [];
            var newScore = { initials, score };
            storedHighscores.push(newScore);
            storedHighscores.sort((a, b) => b.score - a.score);
            localStorage.setItem("highscores", JSON.stringify(storedHighscores));
            loadHighscores();
            submitScoreSection.classList.add("hide");
            highscoresContainer.classList.remove("hide");
        } else {
            feedback.innerText = "Please enter your initials."
            feedback.classList.remove("hide");
        }
    }

    function showHighscores() {
        loadHighscores();
        startQuizButton.classList.add("hide");
        highscoresContainer.classList.remove("hide");
        quizIntro.classList.add("hide");
    }

    function loadHighscores() {
        var storedHighscores = JSON.parse(localStorage.getItem("highscores")) || [];
        highscoresList.innerHTML = storedHighscores
        .map(score => `<li>${score.initials} - ${score.score}</li>`)
        .join(" ");
    }

    function goBack() {
        highscoresContainer.classList.add("hide");
        quizIntro.classList.remove("hide");
        startQuizButton.classList.remove("hide");
        resetState();
    }

    function clearHighscores() {
        localStorage.removeItem("highscores");
        highscoresList.innerText = " ";
    }

    function hideSubmitScoreSection() {
        submitScoreSection.classList.add("hide");
        submitScoreSection.classList.remove("center-content");
    }

    var questions = [
        {
            question: "Commonly used data types DO NOT include: ",
            answers: [
                { text: "1. Strings", correct: false},
                { text: "2. Booleans", correct: false},
                { text: "3. Alerts", correct: true},
                { text: "4. Numbers", correct: false},
            ],
        },
        {
            question: "The condition in an if/else statement is enclosed within ____. ",
            answers: [
                { text: "1. Quotes", correct: false},
                { text: "2. Curly brackets", correct: false},
                { text: "3. Parenthesis", correct: true},
                { text: "4. Square brackets", correct: false},
            ],
        },
        {
            question: "Arrays in JavaScript can be used to store ____. ",
            answers: [
                { text: "1. Numbers and strings", correct: false},
                { text: "2. Other arrays", correct: false},
                { text: "3. Booleans", correct: false},
                { text: "4. All of the above", correct: true},
            ],
        },
        {
            question: "String values must be enclosed within ____ when being assigned to variables. ",
            answers: [
                { text: "1. Commas", correct: false},
                { text: "2. Curly brackets", correct: false},
                { text: "3. Quotes", correct: true},
                { text: "4. Parenthesis", correct: false},
            ],
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
            answers: [
                { text: "1. JavaScript", correct: false},
                { text: "2. Terminal / bash", correct: false},
                { text: "3. For loops", correct: false},
                { text: "4. Console.log", correct: true},
            ],
        },
    ];
});