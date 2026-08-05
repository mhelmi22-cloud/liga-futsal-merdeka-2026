window.onload = async () => {
    await loadSchedule();
    await loadStanding();
    await loadResult();
    await loadNextMatch();
};

async function loadSchedule() {
    const matches = await getSchedule();

    let html = "";

    matches.forEach((match) => {
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
                </div>

            </div>
        `;
    });

    document.getElementById("scheduleList").innerHTML = html;
}

async function loadStanding() {
    const teams = await getStanding();

    let groupA = "";
    let groupB = "";

    teams.forEach((team) => {
        let rankDisplay = team.Rank;

        if (Number(team.Rank) === 1) {
            rankDisplay = '<span class="medal gold">🥇</span>';
        } else if (Number(team.Rank) === 2) {
            rankDisplay = '<span class="medal silver">🥈</span>';
        } else if (Number(team.Rank) === 3) {
            rankDisplay = '<span class="medal bronze">🥉</span>';
        }

        const row = `
            <tr>
                <td class="rank">${rankDisplay}</td>

                <td class="team-name">⚽ ${team.Team}</td>

                <td>${team.P}</td>
                <td>${team.W}</td>
                <td>${team.D}</td>
                <td class="stat-divider">${team.L}</td>

                <td>${team.GF}</td>
                <td>${team.GA}</td>
                <td class="stat-divider">${team.GD}</td>

                <td class="pts">${team.Pts}</td>
            </tr>
        `;

        if (team.Group === "A") {
            groupA += row;
        } else if (team.Group === "B") {
            groupB += row;
        }
    });

    const buildTable = (rows) => `
        <table class="standing-table">
            <thead>
                <tr>
                    <th class="rank-header">🏅</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th class="stat-divider">L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th class="stat-divider">GD</th>
                    <th class="pts-header">Pts</th>
                </tr>
            </thead>

            <tbody>
                ${rows}
            </tbody>
        </table>
    `;

    document.getElementById("groupA").innerHTML = buildTable(groupA);
    document.getElementById("groupB").innerHTML = buildTable(groupB);
}

async function loadResult() {
    const matches = await getResult();

    let html = "";

    matches.forEach((match) => {
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
        .filter((match) => match.Status !== "FT")
        .slice(0, 5);

    if (nextMatches.length === 0) {
        document.getElementById("nextMatch").innerHTML = `
            <div class="next-card">
                <h2>🏆 Semua Perlawanan Selesai</h2>
            </div>
        `;

        return;
    }

    let html = "";

    nextMatches.forEach((match) => {
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