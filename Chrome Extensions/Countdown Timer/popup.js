document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startTimer");
    const stopButton = document.getElementById("stopTimer");
    const timeInput = document.getElementById("timeInput");
    const timerDisplay = document.getElementById("timerDisplay");

    let timerInterval;

    startButton.addEventListener("click", () => {
        let time = parseInt(timeInput.value);
        if (isNaN(time) || time <= 0) {
            alert("Please enter a valid time!");
            return;
        }

        let endTime = Date.now() + time * 60 * 1000;
        chrome.storage.local.set({ timerEnd: endTime });

        chrome.alarms.create("countdownTimer", { delayInMinutes: time });
        updateTimerDisplay();
    });

    stopButton.addEventListener("click", () => {
        chrome.alarms.clear("countdownTimer");
        chrome.storage.local.remove("timerEnd", () => {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Timer Stopped";
        });
    });

    function updateTimerDisplay() {
        clearInterval(timerInterval);
        chrome.storage.local.get(["timerEnd"], (data) => {
            if (data.timerEnd) {
                timerInterval = setInterval(() => {
                    let remaining = data.timerEnd - Date.now();
                    if (remaining <= 0) {
                        clearInterval(timerInterval);
                        timerDisplay.textContent = "Time's Up!";
                        return;
                    }

                    let minutes = Math.floor(remaining / 60000);
                    let seconds = Math.floor((remaining % 60000) / 1000);
                    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }, 1000);
            } else {
                timerDisplay.textContent = "Time Left: --:--";
            }
        });
    }

    updateTimerDisplay();
});
