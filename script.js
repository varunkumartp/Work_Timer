// HTML Elements
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const meetingButton = document.getElementById("meeting");
const timerTotal = document.getElementById("timer total");
const timerMeeting = document.getElementById("timer meeting");

// Program Variables
let stopTime = true;
let pauseTime = false;
let meetingTime = false;
let hr = 0;
let min = 0;
let sec = 0;
let mhr = 0;
let mmin = 0;
let msec = 0;
let interval;

// Change button elememts
const changeButtonElements = () => {
  startButton.textContent = stopTime ? "Start" : "Stop";
  pauseButton.disabled = stopTime;
  meetingButton.disabled = stopTime;
};

// Main Timer Function
const timer = () => {
  if (!stopTime & !pauseTime) {
    // Normal Timer
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    if (min >= 60) {
      min = 0;
      hr++;
    }
    if (hr >= 24) {
      hr = 0;
    }
    // meeting timer
    if (meetingTime) {
      msec++;
      if (msec >= 60) {
        msec = 0;
        mmin++;
      }
      if (mmin >= 60) {
        mmin = 0;
        mhr++;
      }
      if (mhr >= 24) {
        mhr = 0;
      }
    }
    timerTotal.innerHTML =
      hr.toString().padStart(2, "0") +
      ":" +
      min.toString().padStart(2, "0") +
      ":" +
      sec.toString().padStart(2, "0");
    timerMeeting.innerHTML = 
      mhr.toString().padStart(2, "0") +
      ":" +
      mmin.toString().padStart(2, "0") +
      ":" +
      msec.toString().padStart(2, "0");
  }
};

// DOM Manipulation
startButton.addEventListener("click", function () {
  //Start Timer
  if (stopTime) {
    stopTime = false;
    changeButtonElements();
    clearInterval(interval);
    interval = setInterval("timer()", 1000);
  }
  // Stop Timer
  else {
    stopTime = true;
    pauseTime = false;
    meetingTime = false;
    hr = 0;
    min = 0;
    sec = 0;
    mhr = 0;
    mmin = 0;
    msec = 0;
    changeButtonElements();
    pauseButton.textContent = "Pause";
    meetingButton.textContent = "Start Meeting";
    timerTotal.innerHTML = "00:00:00";
    timerMeeting.innerHTML = "00:00:00";
  }
});

pauseButton.addEventListener("click", function () {
  pauseTime = !pauseTime;
  pauseButton.textContent = pauseTime ? "Resume" : "Pause";
  meetingButton.disabled = pauseTime;
});

meetingButton.addEventListener("click", function () {
  meetingTime = !meetingTime;
  meetingButton.textContent = meetingTime ? "Stop Meeting" : "Start Meeting";
});
