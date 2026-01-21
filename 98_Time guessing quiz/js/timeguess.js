"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const body = document.body;

let startTime;
let timeoutid;
let stopTime = 0;

// サウンドファイル
const soundFiles = {
    start: "sound/start.mp3",
    stop: "sound/stop1.mp3",
    reset: "sound/reset.mp3",
    stop10: "sound/stop2.mp3" // 10秒台で止めた時
};

// サウンドコントロール関数
let music;
function soundControl(status, w_sound) {
    if (status === "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end" && music) {
        music.pause();
        music.currentTime = 0;
    }
}

// 初期化
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click", function () {
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
    soundControl("start", soundFiles.start); // start音
}, false);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click", function () {
    setButtonStateStopped();
    clearTimeout(timeoutid);
    stopTime += Date.now() - startTime;

    const seconds = stopTime / 1000;
    // stop音
    if (seconds >= 10.0 && seconds < 11.0) {
        soundControl("start", soundFiles.stop10);
        body.style.backgroundColor = "transparent";
        body.style.backgroundImage = "url('img/fireworks.gif')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
        return;

    }
    soundControl("start", soundFiles.stop);
}, false);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click", function () {
    setButtonStateInitial();
    timer.textContent = "00:00.000";
    stopTime = 0;
    soundControl("start", soundFiles.reset); // reset音
    body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "rgba(233, 168, 227, 0.6)"; // 花火背景を消す
});

////////////////////////
// カウントアップ
////////////////////////
function countUp() {
    const d = new Date(Date.now() - startTime + stopTime);
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    timer.textContent = `${m}:${s}.${ms}`;
    timeoutid = setTimeout(countUp, 10);
}

// 初期ボタン状態
function setButtonStateInitial() {
    start.classList.remove("js-inactive");
    stop.classList.add("js-inactive");
    reset.classList.add("js-inactive");
    start.classList.remove("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.add("js-unclickable");
}

// 動作中
function setButtonStateRunning() {
    timer.classList.add("timer-fontColor_hidden");
    start.classList.add("js-inactive");
    stop.classList.remove("js-inactive");
    reset.classList.add("js-inactive");
    start.classList.add("js-unclickable");
    stop.classList.remove("js-unclickable");
    reset.classList.add("js-unclickable");
}

// 停止中
function setButtonStateStopped() {
    timer.classList.remove("timer-fontColor_hidden");
    timer.classList.add("timer_appear");
    start.classList.add("js-inactive");
    stop.classList.add("js-inactive");
    reset.classList.remove("js-inactive");
    start.classList.add("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.remove("js-unclickable");
}
