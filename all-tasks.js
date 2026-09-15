
 let all_user_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskContainer = document.querySelector("#taskContainer");
    let empty_text = document.querySelector(".empty")
let back_btn = document.querySelector(".back-btn")
let all_tasks = document.querySelector("#total_h2")
back_btn.addEventListener("click" , ()=>{
    window.location.href = "index.html"
})

    
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

   function sort_tasks() {
    all_user_tasks.sort((a, b) => b.completed - a.completed);
}

sort_tasks();



function loadTasks(){
  all_user_tasks.forEach(task => {

        let user_tasks = document.createElement("div");

        user_tasks.classList.add("task");

        // Restore ID
        user_tasks.dataset.id = task.id;

      let action = document.createElement("div");
      action.classList.add("user_action")
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
            </svg> `


        let img_que = document.createElement("img")
        img_que.classList.add("img_que")
        img_que.setAttribute("src" ,"https://www.svgrepo.com/show/308149/waiting-wait-pause-delay.svg")    

   
       if (task.completed) {
    user_tasks.classList.add("completed");
    action.innerHTML = "Completed";
    action.append(img);

    taskContainer.append(user_tasks);
}else {
    user_tasks.classList.add("Not-completed");
    action.innerHTML = "In Queue";
    action.append(img_que);

        taskContainer.append(user_tasks);
}

        let info_name = document.createElement("div");

        info_name.classList.add("user-name");

        info_name.textContent = task.name;


        let info_task = document.createElement("div");

        info_task.classList.add("task-name");

        info_task.textContent = task.task;


        let user_choice = document.createElement("div");

        user_choice.classList.add("user_choice");

        user_choice.textContent = task.priority;




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



    });
   
   all_tasks.innerHTML = localStorage.getItem("total_tasks")
   
 

    // Remove empty message if tasks exist
    if (all_user_tasks.length > 0) {

        if (empty_text.parentElement) {

            empty_text.remove();

        }

    }

    else {

        taskContainer.append(empty_text);

    }



    }
   


// ==========================================================
// RUN LOCAL STORAGE LOAD
// ==========================================================

loadTasks();

