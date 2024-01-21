// We wait for the DOM tree to be fully loaded before declaring the variables that are taken from the HTML ID's
document.addEventListener("DOMContentLoaded", () => {
    var startQuizButton = document.getElementById("start-button");
    var quizIntro = document.getElementById("intro-quiz") 
    var questionsSection = document.getElementById("questions-section");
    var questionElement = document.getElementById("question");
    var answerButton = document.getElementById("answer-button");
    var clock = document.getElementById("clock"); 
    var submitScoreSection = document.getElementById("submit-score");
    var submitScoreForm = document.getElementById("submit-score-form"); 
    var userInitials = document.getElementById("user-initials"); 
    var feedback = document.getElementById("feedback"); 
    var finalScore = document.getElementById("final-score"); 
    var viewHighscores = document.getElementById("view-highscores"); 
    var highscoresContainer = document.getElementById("highscores-section"); 
    var highscoresList = document.getElementById("highscores-list"); 
    var goBackButton = document.getElementById("go-back-button");
    var clearHighscoresButton = document.getElementById("clear-highscores-button");
    // Used to hide the submit score section
    hideSubmitScoreSection();

    // The variables that will keep track of the question, time, score and interval
    let currentQuestionIndex, timer, score, timerInterval;

    // The event listeners for buttons and forms
    startQuizButton.addEventListener("click", startQuiz);
    submitScoreForm.addEventListener("submit", saveHighscores);
    highscoresList.addEventListener("click", showHighscores);
    viewHighscores.addEventListener("click", showHighscores);
    goBackButton.addEventListener("click", goBack);
    clearHighscoresButton.addEventListener("click", clearHighscores);
    
    // The function for the button that starts the quiz
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

    // The function that starts the timer/clock
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

    // The function to keep track of the current question and set the next one
    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    // The function to keep track of the current question and show the right one in the specific format
    function showQuestion(question) {
        questionElement.innerText = questions[currentQuestionIndex].question;
        questions[currentQuestionIndex].answers.forEach(answer => {
            var list = document.createElement("li");
            var button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("button");
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener ("click", selectAnswer);
            list.appendChild(button);
            answerButton.appendChild(list);
        });
    }

    // The function that clears the previous answers so that the new ones appear
    function resetState() {
        while (answerButton.firstChild) {
            answerButton.removeChild(answerButton.firstChild);
        }
    }

    // The function that determines the selected anwers and punish the wrong answers
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

    // The function that shows the selected answer feedback
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

    // The function that ends the quiz 
    function endQuiz() {
        clearInterval(timerInterval);
        questionsSection.classList.add("hide");
        submitScoreSection.classList.remove("hide");
        submitScoreSection.classList.add("center-content")
        finalScore.innerText = score;
    }

    // The function that creates the local storage to save the scores
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

    // The function that displays the scores section
    function showHighscores() {
        loadHighscores();
        startQuizButton.classList.add("hide");
        highscoresContainer.classList.remove("hide");
        quizIntro.classList.add("hide");
    }

    // The function that retrieves the scores from the local storage
    function loadHighscores() {
        var storedHighscores = JSON.parse(localStorage.getItem("highscores")) || [];
        highscoresList.innerHTML = storedHighscores
        .map(score => `<li>${score.initials} - ${score.score}</li>`)
        .join(" ");
    }

    // The funtion that "resets" the quiz to the home page
    function goBack() {
        highscoresContainer.classList.add("hide");
        quizIntro.classList.remove("hide");
        startQuizButton.classList.remove("hide");
        resetState();
    }

    // The function that clears the highscores
    function clearHighscores() {
        localStorage.removeItem("highscores");
        highscoresList.innerText = " ";
    }

    // The funtion to hide the form section
    function hideSubmitScoreSection() {
        submitScoreSection.classList.add("hide");
        submitScoreSection.classList.remove("center-content");
    }

    // The questions presented with each individual question and answers
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