let user_name = document.querySelector("#studentName");
let task_name = document.querySelector("#taskName");
let choice = document.querySelector("#priority");
let btn = document.querySelector("#addTask");
let search = document.querySelector("#search");
let sortBtn = document.querySelector("#sortBtn");
let clear_btn = document.querySelector("#clearBtn");
let empty_text = document.querySelector(".empty");
let task_coin = document.querySelector("#taskContainer");
let time = document.querySelector("#time_date");
let clearPopup = document.querySelector("#clearPopup");
let yesBtn = document.querySelector("#yesBtn");
let noBtn = document.querySelector("#noBtn");
let dark_button = document.querySelector("#dark_mode");
let body = document.querySelector("body");

let complete_task = 0;
let pending=0;

let total_h2 = document.querySelector("#total_h2");
let comp_h2 = document.querySelector("#complete_h2");
let pending_h2 = document.querySelector("#pending_h2");
let priority = document.querySelector("#priority_h2");
let due = document.querySelector("#due_h2");
let button_search = document.querySelector(".button-search");
let high_prio = 0;


// ======================================
//  Clock quweries
// =========================================


let hourHand = document.querySelector(".hour");
let minuteHand = document.querySelector(".minute");
let secondHand = document.querySelector(".second");
let calender_time = document.querySelector("#time");
    let calender_date = document.querySelector("#date")



// ==========================================================
// LOCAL STORAGE
// ==========================================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 let dark_theam  = JSON.parse(localStorage.getItem("dark"));
let logout  = document.querySelector(".log-out")

logout.addEventListener("click" , ()=>{
    window.location.href = "index.html";
});

function formatDateTime(dateTime) {

    if (!dateTime) {
        return "Not Scheduled";
    }

    let date = new Date(dateTime);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}




// ==========================================================
// ADD NEW TASK
// ==========================================================

btn.addEventListener("click", () => {

    if (user_name.value.trim() === "" || task_name.value.trim() === "") {
        alert("Fields must be field");
    }

    else {

        let user_tasks = document.createElement("div");
        user_tasks.classList.add("all-tasks");

        // Create unique ID for this task
        let taskId = Date.now();

        user_tasks.dataset.id = taskId;


        let info_name = document.createElement("div");
        info_name.classList.add("user-name");
        info_name.textContent = user_name.value;


        let img = document.createElement("div");
        img.classList.add("complete-task");

        img.innerHTML = `
            <svg 
                id="conform-tick" 
                data-name="Layer 1" 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 122.88"
                width="30"
                height="30"
            >
                <defs>
                    <style>
                        .cls-1 {
                            fill: #00a912;
                        }

                        .cls-1,
                        .cls-2 {
                            fill-rule: evenodd;
                        }

                        .cls-2 {
                            fill: #fff;
                        }
                    </style>
                </defs>

                <title>confirm</title>

                <path
                    class="cls-1"
                    d="M61.44,0A61.44,61.44,1,1,1,0,61.44,
                    61.44,61.44,0,0,1,61.44,0Z"
                />

                <path
                    class="cls-2"
                    d="M42.37,51.68,53.26,62,79,35.87c2.13-2.16,
                    3.47-3.9,6.1-1.19l8.53,8.74c2.8,2.77,
                    2.66,4.4,0,7L58.14,85.34c-5.58,5.46,
                    -4.61,5.79-10.26.19L28,65.77c-1.18-1.28,
                    -1.05-2.57.24-3.84l9.9-10.27c1.5-1.58,2.7-1.44,4.22,0Z"
                />
            </svg>
        `;


        let svg = document.createElement("div");
        svg.classList.add("in-svg");

        svg.innerHTML = `
            <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                class="delete-icon"
            >
                <path d="M3 6h18"/>
                <path d="M8 6V4h8v2"/>
                <path d="M6 6l1 14h10l1-14"/>
                <path d="M10 10v6"/>
                <path d="M14 10v6"/>
            </svg>
        `;


        let action = document.createElement("div");
        action.classList.add("user_action");

        action.append(img, svg);


        let info_task = document.createElement("div");
        info_task.classList.add("task-name");
        info_task.textContent = task_name.value;


        let user_choice = document.createElement("div");
        user_choice.classList.add("user_choice");
        user_choice.textContent = choice.value;
        if (choice.value == "High") {
            high_prio++
        }
    
        let info_time = document.createElement("div");
        info_time.classList.add("task-time");


       info_time.textContent = formatDateTime(time.value);


        user_tasks.append(
            info_name,
            info_task,
            user_choice,
            info_time,
            action
        );


        // ==================================================
        // SAVE TASK TO LOCAL STORAGE
        // ==================================================

        tasks.push({
            id: taskId,
            name: user_name.value,
            task: task_name.value,
            priority: choice.value,
            time: time.value,
            completed: false
        });

        saveTasks();


        task_coin.append(user_tasks);

        user_name.value = "";
        task_name.value = "";


        if (task_coin.querySelectorAll(".all-tasks").length != 0) {
            if (empty_text.parentElement) {
                empty_text.remove();
            }
        }

        else {
            task_coin.append(empty_text);
        }


        applyPriorityFilter();
        update_head();

    }
});


// ==========================================================
// OPEN CLEAR POPUP
// ==========================================================

clear_btn.addEventListener("click", () => {
    clearPopup.classList.add("show");
});


// ==========================================================
// CLOSE CLEAR POPUP
// ==========================================================

noBtn.addEventListener("click", () => {
    clearPopup.classList.remove("show");
});


// ==========================================================
// CLEAR ALL TASKS
// ==========================================================

yesBtn.addEventListener("click", () => {

    task_coin.innerHTML = "";
    task_coin.append(empty_text);

    clearPopup.classList.remove("show");

    user_name.focus();

    complete_task = 0;
    pending = 0;
    high_prio = 0

    // Clear Local Storage
    tasks = [];
    localStorage.removeItem("tasks");

    update_head();
});


// ==========================================================
// DELETE AND COMPLETE TASK
// ==========================================================

task_coin.addEventListener("click", (e) => {

    // ======================================================
    // DELETE
    // ======================================================

    if (e.target.closest(".delete-icon")) {

        let remove_item = e.target.closest(".all-tasks");

        // Get ID from HTML card
        let id = Number(remove_item.dataset.id);
           // Find the task before deleting it
        let task = tasks.find(task => task.id === id);

    // If deleted task was High priority
    if (task && task.priority === "High") {
        high_prio--;
    }

        // Remove from tasks array
        tasks = tasks.filter(task => task.id !== id);
       
        // Save updated array
        saveTasks();

        // Remove from page
        remove_item.remove();

        update_head();

        let card_len = task_coin.querySelector(".all-tasks");

        console.log(card_len);

        if (card_len === null) {
            task_coin.append(empty_text);
        }
    }


    // ======================================================
    // COMPLETE
    // ======================================================

    if (e.target.closest(".complete-task")) {

        let card = e.target.closest(".all-tasks");

        card.classList.toggle("completed");

        // Get task ID
        let id = Number(card.dataset.id);

        // Find task in Local Storage array
        let task = tasks.find(task => task.id === id);

        if (task) {

            task.completed = card.classList.contains("completed");

            saveTasks();

        }


        if (card.classList.contains("completed")) {
            complete_task++;
        }

        else {
            complete_task--;
        }

        update_head();ā
    }

});


// ==========================================================
// SEARCH LOGIC
// ==========================================================

button_search.addEventListener("click", () => {

    let addtasks = task_coin.querySelectorAll(".all-tasks");

    let searchValue = search.value.toLowerCase().trim();

    addtasks.forEach(task => {

        let all_userName = task
            .querySelector(".user-name")
            .textContent
            .toLowerCase();

        let all_usertask = task
            .querySelector(".task-name")
            .textContent
            .toLowerCase();


        if (
            all_userName.includes(searchValue) ||
            all_usertask.includes(searchValue)
        ) {

            task.style.display = "";

        }

        else {

            task.style.display = "none";
            empty_text.textContent = "No Task Found"
            task_coin.append(empty_text)

        }

    });

});


search.addEventListener("input", () => {

    if (search.value.trim() === "") {

        let addtasks = task_coin.querySelectorAll(".all-tasks");

        addtasks.forEach(task => {

            task.style.display = "";

        });

    }

});


// ==========================================================
// PRIORITY FILTER
// ==========================================================

function applyPriorityFilter() {

    let sort = sortBtn.value.toLowerCase();

    let task_parent = document.querySelectorAll(".all-tasks");


    task_parent.forEach(task => {

        let priority = task
            .querySelector(".user_choice")
            .childNodes[0]
            .textContent
            .trim()
            .toLowerCase();


        if (sort === "" || priority === sort) {

            task.style.display = "";

        }

        else {

            task.style.display = "none";
            empty_text.textContent = "No Task Found"
            task_coin.append(empty_text)

        }

    });

}


// ==========================================================
// PRIORITY FILTER EVENT
// ==========================================================

sortBtn.addEventListener("change", applyPriorityFilter);




// ==========================================================
// DARK MODE EVENT
// ==========================================================

dark_button.addEventListener("click", ()=>{
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark" , true);
       dark_button.setAttribute("src", "https://www.svgrepo.com/show/532889/sun.svg")

    } else {
        localStorage.setItem("dark" , false);
          dark_button.setAttribute("src", "https://www.svgrepo.com/show/532875/moon.svg")
    }
    
    
});

function applydark() {
    let dark_choice = localStorage.getItem("dark");
   
    if(dark_choice === "true"){
         body.classList.add("dark-mode");
         hourHand.classList.add("dark_clock")
         secondHand.classList.add("dark_clock");
         minuteHand.classList.add("dark_clock")

    }
    

}


// ==========================================================
// SIDEBAR TOGGLE
// ==========================================================

let open_close = document.querySelectorAll(".open-close");

let welcome_sec = document.querySelector(".Welcome");

let task_sec = document.querySelector(".display-task");

let aside = document.querySelector("aside");

let new_tasks = document.querySelector(".new-tasks");


open_close.forEach(button => {

    button.addEventListener("click", () => {

        aside.classList.toggle("hide");

        welcome_sec.classList.toggle("hide");

        task_sec.classList.toggle("hide");

        new_tasks.classList.toggle("hide");

    });

});


// ==========================================================
// UPDATE DASHBOARD
// ==========================================================

function update_head() {

    let card_len = task_coin.querySelectorAll(".all-tasks");

   

    const progress_comp = document.querySelector("#progress-complete")
    const p_comp = document.querySelector("#comp_p")
    const progress_pending = document.querySelector("#progress-pending")
  
    const priot = document.querySelector("#progress-priority")

   p_comp.textContent = card_len.length === 0 ? "0%" : Math.floor((complete_task / card_len.length) * 100) + "%";
    if (p_comp.textContent === "100%") {
        p_comp.innerHTML = "100%✌️🙌 <b>Keep Doing Great</b>"
    }
    
    

    let total = tasks.length;
     localStorage.setItem("total_tasks" ,total)
   

let completed = tasks.filter(task => task.completed).length;

let pending = total - completed;
    
    progress_comp.style.setProperty("--progress-colour" , `${((complete_task/card_len.length)*100)}%`)
    progress_pending.style.setProperty("--progress-colour" , `${(pending/card_len.length)*100}%`)
    
    priot.style.setProperty("--progress-colour" , `${(high_prio/card_len.length)*100}%`)
    priority.textContent = high_prio;
    comp_h2.textContent = completed;
 total_h2.textContent = total;
    pending_h2.textContent = pending

}


// ==========================================================
// LOAD TASKS FROM LOCAL STORAGE
// ==========================================================

 function loadTasks() {

    let User_name_acc = localStorage.getItem("user_name")
    let set_user_name = document.querySelector(".msg-h2")
    let user_acc_icon = document.querySelector(".user-icon")

    user_acc_icon.firstChild.textContent = User_name_acc.slice(0,2);
    set_user_name.textContent ="Welcome Back"+" "+" "+  User_name_acc+"✌️"

    tasks.forEach(task => {

        let user_tasks = document.createElement("div");

        user_tasks.classList.add("all-tasks");

        // Restore ID
        user_tasks.dataset.id = task.id;


        // Restore completed state
        if (task.completed) {

            user_tasks.classList.add("completed");

            complete_task++;

        }


        let info_name = document.createElement("div");

        info_name.classList.add("user-name");

        info_name.textContent = task.name;


        let img = document.createElement("div");

        img.classList.add("complete-task");

        img.innerHTML = `
            <svg
                id="conform-tick"
                viewBox="0 0 122.88 122.88"
                width="30"
                height="30"
            >
                <defs>
                    <style>
                        .cls-1 {
                            fill: #00a912;
                        }

                        .cls-1,
                        .cls-2 {
                            fill-rule: evenodd;
                        }

                        .cls-2 {
                            fill: #fff;
                        }
                    </style>
                </defs>

                <path
                    class="cls-1"
                    d="M61.44,0A61.44,61.44,1,1,1,0,61.44,
                    61.44,61.44,0,0,1,61.44,0Z"
                />

                <path
                    class="cls-2"
                    d="M42.37,51.68,53.26,62,79,35.87c2.13-2.16,
                    3.47-3.9,6.1-1.19l8.53,8.74c2.8,2.77,
                    2.66,4.4,0,7L58.14,85.34c-5.58,5.46,
                    -4.61,5.79-10.26.19L28,65.77c-1.18-1.28,
                    -1.05-2.57.24-3.84l9.9-10.27c1.5-1.58,
                    2.7-1.44,4.22,0Z"
                />
            </svg>
        `;


        let svg = document.createElement("div");

        svg.classList.add("in-svg");

        svg.innerHTML = `
            <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                class="delete-icon"
            >
                <path d="M3 6h18"/>
                <path d="M8 6V4h8v2"/>
                <path d="M6 6l1 14h10l1-14"/>
                <path d="M10 10v6"/>
                <path d="M14 10v6"/>
            </svg>
        `;


        let action = document.createElement("div");

        action.classList.add("user_action");

        action.append(img, svg);


        let info_task = document.createElement("div");

        info_task.classList.add("task-name");

        info_task.textContent = task.task;


        let user_choice = document.createElement("div");

        user_choice.classList.add("user_choice");

        user_choice.textContent = task.priority;

        if (task.priority =="High") {
            high_prio++
        }



        let info_time = document.createElement("div");

        info_time.classList.add("task-time");

    info_time.textContent = formatDateTime(task.time);

        user_tasks.append(
            info_name,
            info_task,
            user_choice,
            info_time,
            action
        );


        task_coin.append(user_tasks);

    });


    // Remove empty message if tasks exist
    if (tasks.length > 0) {

        if (empty_text.parentElement) {

            empty_text.remove();

        }

    }

    else {

        task_coin.append(empty_text);

    }
  

    update_head();

    applyPriorityFilter();

    applydark();
  

}

function clock() {

    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let hourDegree = (hours % 12) * 30 + minutes * 0.5;
    let minuteDegree = minutes * 6;
    let secondDegree = seconds * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDegree}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegree}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDegree}deg)`;
    
    calender_time.textContent = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
}).toUpperCase();


  calender_date.textContent = now.toDateString()
 
    
}

clock();
setInterval(clock, 1000);
// ==========================================================
// RUN LOCAL STORAGE LOAD
// ==========================================================

loadTasks()