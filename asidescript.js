let all_task = document.querySelector("#ALL_TASK");
let complete_aside = document.querySelector("#COMPLETED");
let priority_aside = document.querySelector("#PRIORITY");
let calender = document.querySelector("#CALENDER");
let statistic = document.querySelector("#STATICS");


all_task.addEventListener("click", () => {
    window.location.href = "all-tasks.html";
});


complete_aside.addEventListener("click", () => {
    window.location.href = "completed.html";
});


priority_aside.addEventListener("click", () => {
    window.location.href = "priority.html";
});


calender.addEventListener("click", () => {
    window.location.href = "calendar.html";
});


statistic.addEventListener("click", () => {
    window.location.href = "statistics.html";
});