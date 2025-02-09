chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "countdownTimer") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Timer Finished!",
            message: "Your countdown timer is up!",
            priority: 2
        });
        chrome.storage.local.remove("timerEnd");
    }
});
