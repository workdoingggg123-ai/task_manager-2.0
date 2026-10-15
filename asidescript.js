let all_task = document.querySelector("#ALL_TASK");
let complete_aside = document.querySelector("#COMPLETED");
let priority_aside = document.querySelector("#PRIORITY");
let dashboard= document.querySelector("#DASHBOARD")

let aside2 = document.querySelector("#aside")

dashboard.addEventListener("click" , ()=>{
      aside2.classList.toggle("hide");
    window.location.href = "main.html";
})

all_task.addEventListener("click", () => {

    window.location.href = "all-tasks.html";
});


complete_aside.addEventListener("click", () => {
    window.location.href = "completed.html";
  

});



priority_aside.addEventListener("click", () => {
    window.location.href = "priority.html";
});

