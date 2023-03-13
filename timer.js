const BalkenInnen = document.querySelector(".BalkenInnen");
const StundenAnzeige = document.querySelector("#Stunden");
const MinutenAnzeige = document.querySelector("#Minuten");
const SekundenAnzeige = document.querySelector("#Sekunden");
const timeInput = document.querySelector("#Time");
const container = document.querySelectorAll(".container");
let TimerBenutzung = false;
document.addEventListener("keydown", (e) => {
    console.log("event")
    switch (e.key) {
        case "x":
            TimerBenutzung = false;
            break;
        case "Enter":
            console.log("enter");
            if (TimerBenutzung === false) {
                for (const i of container) {
                    i.classList.toggle("nichtSichtbar");
                }
                definieren({Hours: Number(timeInput.value.slice(0,2)), Minuten: Number(timeInput.value.slice(3,5)), Sekunden: Number(timeInput.value.slice(6))});
                console.log("false")
            }
            break;
    }
});

let Ende;
let Anfang;

function animation () {
    let Time = Timer({anfang: Anfang, ende: Ende});
    console.log(Time.Prozent);
    if (Time.Prozent <= 100 && TimerBenutzung) {
        let HoursNumber;
        let MinutenNumber;
        let SekundenNumber;
        if (Time.Hours.toString().length === 1) {
            HoursNumber = `0${Time.Hours.toString()}`
        }else {
            HoursNumber = Time.Hours;
        }
        if (Time.Minuten.toString().length === 1) {
            MinutenNumber = `0${Time.Minuten.toString()}`
        }else {
            MinutenNumber = Time.Minuten;
        }
        if (Time.Sekunden.toString().length === 1) {
            SekundenNumber = `0${Time.Sekunden.toString()}`
        }else {
            SekundenNumber = Time.Sekunden;
        }
        StundenAnzeige.textContent = HoursNumber;
        MinutenAnzeige.textContent = MinutenNumber;
        SekundenAnzeige.textContent = SekundenNumber;
        BalkenInnen.style.width = `${Time.Prozent}%`;
        setTimeout(animation, 50);
    }else {
        StundenAnzeige.textContent = "00";
        MinutenAnzeige.textContent = "00";
        SekundenAnzeige.textContent = "00";
        BalkenInnen.style.width = "100%";
        TimerBenutzung = false;
        setTimeout(() => {
            for (const i of container) {
                i.classList.toggle("nichtSichtbar");
            }
            console.log("erledigt")
        }, 500);
    }
}
function Timer(Time) {
    let anfang = Time.anfang;
    let jetzt = new Date(Date.now())
    let ende = Time.ende;
    let differenz = ende.getTime() - jetzt.getTime();
    let Zeit = new Date(differenz - new Date(1970, 0, 1, 2, 0, 0, 0).getTime());
    return {Hours: Zeit.getHours(), Minuten: Zeit.getMinutes(), Sekunden: Zeit.getSeconds(), Prozent: (jetzt.getTime() - anfang.getTime()) / (ende.getTime() - anfang.getTime()) * 100};
}
function definieren(differenz) {
    TimerBenutzung = true;
    let now = new Date(Date.now());
    let differnzinZeit = new Date(1970, 0, 1, 1, 0, 0, 0);
    differnzinZeit.setHours(differenz.Hours + 1);
    differnzinZeit.setMinutes(differenz.Minuten);
    differnzinZeit.setSeconds(differenz.Sekunden);
    let ende = new Date(now.getTime() + differnzinZeit.getTime());
    console.log(ende);
    Ende = ende;
    Anfang = now;
    animation();
}
