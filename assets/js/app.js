window.onload = async () => {

    await loadSchedule();
    await loadStanding();

};

async function loadSchedule() {

    const matches = await getSchedule();

    let html = "";

    matches.forEach(match => {

        html += `
        <div class="match">

            <div class="team">
                <strong>${match.Home}</strong>
                <span>VS</span>
                <strong>${match.Away}</strong>
            </div>

            <div class="info">
                📅 ${match.Hari}, ${match.Tarikh}
                <br>
                🕒 ${match.Masa}
                <br>
                📍 ${match.Venue}
            </div>

        </div>
        `;

    });

    document.getElementById("scheduleList").innerHTML = html;

}

async function loadStanding() {

    const teams = await getStanding();
    
    console.log(teams);

    let groupA = "";
    let groupB = "";

    teams.forEach(team => {

        const row = `
        <tr>
            <td>${team.Team}</td>
            <td>${team.P}</td>
            <td>${team.W}</td>
            <td>${team.D}</td>
            <td>${team.L}</td>
            <td>${team.Pts}</td>
        </tr>
        `;

        if (team.Group == "A") {

            groupA += row;

        } else {

            groupB += row;

        }

    });

    document.getElementById("groupA").innerHTML = `
    <table>
        <tr>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
        </tr>
        ${groupA}
    </table>
    `;

    document.getElementById("groupB").innerHTML = `
    <table>
        <tr>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
        </tr>
        ${groupB}
    </table>
    `;

}