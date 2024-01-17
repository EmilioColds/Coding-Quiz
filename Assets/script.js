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

});