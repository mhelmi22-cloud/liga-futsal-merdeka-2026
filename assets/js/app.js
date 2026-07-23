window.onload = async ()=>{

    loadSchedule();

}

async function loadSchedule(){

    const matches = await getSchedule();

    let html="";

    matches.forEach(match=>{

        html += `
        <div style="padding:15px;border-bottom:1px solid #333">

            <b>${match.Home}</b>

            VS

            <b>${match.Away}</b>

            <br>

            ${match.Tarikh} | ${match.Masa}

        </div>
        `;

    });

    document.getElementById("scheduleList").innerHTML=html;

}
