const API =
"https://script.google.com/macros/s/AKfycbwmvYbfD0LQaEE1iFJq1R14W6D-qJg58RhPAwxTuOBXQqVdbE_uzAkQC1RlH4zgiHyR/exec";

async function getSchedule(){

    const res = await fetch(API + "?action=schedule");

    return await res.json();

}

async function getStanding(){

    const res = await fetch(API + "?action=standing");

    return await res.json();

}
