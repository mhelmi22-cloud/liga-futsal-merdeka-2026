const API_URL = "https://script.google.com/macros/s/AKfycbwmvYbfD0LQaEE1iFJq1R14W6D-qJg58RhPAwxTuOBXQqVdbE_uzAkQC1RlH4zgiHyR/exec";

async function getSchedule() {
    const response = await fetch(API_URL + "?action=schedule");
    return await response.json();
}

async function getStanding() {
    const response = await fetch(API_URL + "?action=standing");
    return await response.json();
}

async function getPlayers() {
    const response = await fetch(API_URL + "?action=players");
    return await response.json();
}

async function getTopScorer() {
    const response = await fetch(API_URL + "?action=topscorer");
    return await response.json();
}

async function getMVP() {
    const response = await fetch(API_URL + "?action=mvp");
    return await response.json();
}

async function getResult() {

    const response = await fetch(API_URL + "?action=result");

    return await response.json();

}