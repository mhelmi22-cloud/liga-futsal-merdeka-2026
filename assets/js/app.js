window.onload = async () => {

    await loadSchedule();
    await loadStanding();
    await loadResult();
    await loadNextMatch();

};

async function loadSchedule() {

    const matches = await getSchedule();

    let html = "";

    matches.forEach(match => {

        html += `
        <div class="match schedule-card">

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
        <td class="team-name">⚽ ${team.Team}</td>

        <td>${team.P}</td>
        <td>${team.W}</td>
        <td>${team.D}</td>
        <td>${team.L}</td>

        <td>${team.GF}</td>
        <td>${team.GA}</td>
        <td>${team.GD}</td>

        <td class="pts">${team.Pts}</td>
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
    <thead>
        <tr>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
        </tr>
        </thead>
<tbody>
        ${groupA}
        </tbody>
    </table>
    `;

    document.getElementById("groupB").innerHTML = `
    <table>
    <thead>
        <tr>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Pts</th>
        </tr>
        </thead>
<tbody>
        ${groupB}
        </tbody>
    </table>
    `;

}

async function loadResult() {

    const matches = await getResult();

    let html = "";

    matches.forEach(match => {

        html += `
        <div class="result-card">

            <div class="ft">
                FULL TIME
            </div>

            <div class="result-teams">

    <div class="team-name">
    ${match.Home}
    </div>

    <div class="scoreline">
    ${match.HomeScore} – ${match.AwayScore}
    </div>

    <div class="team-name">
    ${match.Away}
    </div>

</div>

            <div class="date">

    📅 ${match.Hari}, ${match.Tarikh}

    <br>

    🕒 ${match.Masa}

</div>

        </div>
        `;

    });

    document.getElementById("resultList").innerHTML = html;

}

async function loadNextMatch() {

    const matches = await getSchedule();

    const nextMatches = matches
        .filter(match => match.Status != "FT")
        .slice(0,5);

    if(nextMatches.length === 0){

        document.getElementById("nextMatch").innerHTML = `
            <div class="next-card">
                <h2>🏆 Semua Perlawanan Selesai</h2>
            </div>
        `;

        return;

    }

    let html = "";

    nextMatches.forEach(match => {

        html += `

        <div class="schedule-card">

            <div class="next-group">
                Group ${match.Kumpulan}
            </div>

            <div class="next-info">

                <span>🕒 ${match.Masa}</span>

                <span>•</span>

                 <span>📅 ${match.Hari}, ${match.Tarikh}</span>

            </div>

            <div class="next-match">

                <div class="home-team">
                    ${match.Home}
                </div>

                <div class="vs-center">
                    VS
                </div>

                <div class="away-team">
                    ${match.Away}
                </div>

            </div>

        </div>

        `;

    });

    document.getElementById("nextMatch").innerHTML = html;

}