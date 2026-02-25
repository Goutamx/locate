let stateData = [];
let currentQuestion = null;
let score = 0;
let quizActive = false;

document.addEventListener("DOMContentLoaded", function () {

    fetch("state_data.json")
        .then(response => response.json())
        .then(data => {
            stateData = data;
            enableMap();
        });

    document.getElementById("startBtn").addEventListener("click", startQuiz);
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);

});

function enableMap() {

    const states = document.querySelectorAll("#features path");

    states.forEach(state => {
        state.addEventListener("click", function () {
            handleClick(this.id);
        });
    });

}

function handleClick(stateId) {

    if (!quizActive) {
        showStateInfo(stateId);
        return;
    }

    if (stateId === currentQuestion.id) {
        highlightState(stateId, "#2ECC71"); // Green
        score++;
        document.getElementById("question").textContent = "Correct ✅";
    } else {
        highlightState(stateId, "#E74C3C"); // Red
        highlightState(currentQuestion.id, "#2ECC71");
        document.getElementById("question").textContent = "Wrong ❌";
    }

    updateScore();
    quizActive = false;
    document.getElementById("nextBtn").style.display = "inline-block";
}

function showStateInfo(stateId) {

    resetColors();
    highlightState(stateId, "#4A90E2");

    const stateInfo = stateData.find(item => item.id === stateId);

    if (stateInfo) {
        document.getElementById("stateName").textContent = stateInfo.name;
        document.getElementById("capitalName").textContent =
            "Capital: " + stateInfo.capital;
    }
}

function startQuiz() {
    score = 0;
    updateScore();
    nextQuestion();
}

function nextQuestion() {

    resetColors();
    document.getElementById("nextBtn").style.display = "none";

    const randomIndex = Math.floor(Math.random() * stateData.length);
    currentQuestion = stateData[randomIndex];

    document.getElementById("question").textContent =
        "Click on: " + currentQuestion.name;

    quizActive = true;
}

function highlightState(stateId, color) {
    const state = document.getElementById(stateId);
    if (state) {
        state.style.fill = color;
    }
}

function resetColors() {
    const states = document.querySelectorAll("#features path");
    states.forEach(state => {
        state.style.fill = "#E0E0E0";
    });
}

function updateScore() {
    document.getElementById("score").textContent =
        "Score: " + score;
}
