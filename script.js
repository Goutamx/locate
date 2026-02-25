let stateData = [];

document.addEventListener("DOMContentLoaded", function() {

    // ✅ Load JSON data
    fetch("state_data.json")
        .then(response => response.json())
        .then(data => {
            stateData = data;
            enableMapInteraction();
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });

});

function enableMapInteraction() {

    // ✅ Click for real states
    const states = document.querySelectorAll("#india_states path");

    states.forEach(state => {
        state.addEventListener("click", function() {
            handleStateClick(this.id);
        });
    });

    // ✅ Click for markers
    const markers = document.querySelectorAll("[id$='_marker']");

    markers.forEach(marker => {
        marker.addEventListener("click", function() {

            const realId = this.id.replace("_marker", "");
            handleStateClick(realId);

        });
    });
}

function handleStateClick(stateId) {

    resetColors();

    const stateElement = document.getElementById(stateId);

    if (stateElement) {
        stateElement.style.fill = "#4A90E2";
    }

    // ✅ Find data from JSON
    const stateInfo = stateData.find(item => item.id === stateId);

    if (stateInfo) {
        document.getElementById("stateName").textContent = stateInfo.name;
        document.getElementById("capitalName").textContent =
            "Capital: " + stateInfo.capital;
    }
}

function resetColors() {
    document.querySelectorAll("#india_states path")
        .forEach(state => {
            state.style.fill = "#E0E0E0";
        });
}