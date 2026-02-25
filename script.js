let stateData = [];

document.addEventListener("DOMContentLoaded", function () {

    // ✅ Load JSON file
    fetch("state_data.json")
        .then(response => response.json())
        .then(data => {
            stateData = data;
            enableMap();
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });

});

function enableMap() {

    // ✅ Select all state paths inside your SVG group
    const states = document.querySelectorAll("#features path");

    states.forEach(state => {
        state.addEventListener("click", function () {
            handleClick(this.id);
        });
    });

    // ✅ Handle markers (if you added circles with _marker)
    const markers = document.querySelectorAll("[id$='_marker']");

    markers.forEach(marker => {
        marker.addEventListener("click", function () {
            const realId = this.id.replace("_marker", "");
            handleClick(realId);
        });
    });

}

function handleClick(stateId) {

    resetColors();

    const stateElement = document.getElementById(stateId);

    if (stateElement) {
        stateElement.style.fill = "#4A90E2"; // highlight color
    }

    // ✅ Find state in JSON
    const stateInfo = stateData.find(item => item.id === stateId);

    if (stateInfo) {
        document.getElementById("stateName").textContent = stateInfo.name;
        document.getElementById("capitalName").textContent =
            "Capital: " + stateInfo.capital;
    } else {
        document.getElementById("stateName").textContent = stateId;
        document.getElementById("capitalName").textContent = "";
    }
}

function resetColors() {

    const states = document.querySelectorAll("#features path");

    states.forEach(state => {
        state.style.fill = "#E0E0E0"; // default map color
    });

}
