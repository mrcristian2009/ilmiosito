const inputCelsius = document.getElementById("celsius");
const bottone = document.getElementById("btn-converti");
const testoRisultato = document.getElementById("risultato");

function calcola() {
    let valoreInput = inputCelsius.value;
    let gradiC = parseFloat(valoreInput);

    if (valoreInput === "" || isNaN(gradiC)) {
        testoRisultato.innerText = "Inserisci un numero!";
        testoRisultato.style.color = "orange";
        return;
    }

    let gradiF = (gradiC * 9 / 5) + 32;
    let stato = "";
    let colore = "";

    if (gradiC <= 0) {
        stato = "Ghiaccio ❄️";
        colore = "blue";
    } else if (gradiC >= 100) {
        stato = "Vapore ♨️";
        colore = "red";
    } else {
        stato = "Liquida 💧";
        colore = "green";
    }

    testoRisultato.innerText = gradiC + "°C = " + gradiF.toFixed(1) + "°F (" + stato + ")";
    testoRisultato.style.color = colore;
}

inputCelsius.addEventListener("input", calcola);
bottone.addEventListener("click", calcola);

