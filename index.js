const casDisplay = document.querySelector("#casDisplay");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const resetButton = document.querySelector("#resetButton");

let startTime = 0;
let currentTime = 0;
let elapsedTime = 0;

let paused = true;
let intervalId;
let hodiny = 0;
let minuty = 0;
let sekundy = 0;

//nastavenie startu
startButton.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
});

//nastavenie sopnutia
stopButton.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

//nastavenie resetovania
resetButton.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime =0;

    hodiny = 0;
    minuty = 0;
    sekundy = 0;

    casDisplay.textContent = "00:00:00";
});


function updateTime() {
    elapsedTime  = Date.now() - startTime;

    sekundy = Math.floor((elapsedTime /1000)%60);
    minuty = Math.floor((elapsedTime /(1000*60))%60);
    hodiny = Math.floor((elapsedTime /(1000*60*60))%60);

    //formatovanie casu aby sa tam nachadzali 0 a nezobrazovalo sa 0:0:0 ale 00:00:00 ked bezi cas
    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit
    }

    sekundy = pad(sekundy);
    minuty = pad(minuty);
    hodiny = pad(hodiny);

    casDisplay.textContent = `${hodiny}:${minuty}:${sekundy}`;


}