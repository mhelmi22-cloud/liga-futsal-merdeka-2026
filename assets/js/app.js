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
            <td>⚽ ${team.Team}</td>
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

    const next = matches.find(match => match.Status != "FT");

    if (!next) {

        document.getElementById("nextMatch").innerHTML = `
        <div class="next-card">
            <h2>🏆 Semua Perlawanan Selesai</h2>
        </div>
        `;

        return;

    }

    document.getElementById("nextMatch").innerHTML = `

    <div class="next-card">

        <div class="next-group">
            Group ${next.Kumpulan}
        </div>

        <div class="next-date">
            📅 ${next.Hari}, ${next.Tarikh}
        </div>

        <div class="next-time">
            🕒 ${next.Masa}
        </div>

        <div class="next-teams">

            <div>${next.Home}</div>

            <div class="vs">VS</div>

            <div>${next.Away}</div>

        </div>

        <div class="next-status">

            ⏳ Menunggu Sepakan Mula

        </div>

    </div>

    `;

}