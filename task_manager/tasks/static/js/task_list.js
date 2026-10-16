const task_list = document.querySelector("#task-list");
const loader = document.createElement("li");
loader.textContent = "Loading tasks....";
loader.classList.add("hidden");
task_list.append(loader);

async function loadTasks(){
    loader.classList.remove("hidden")
    try {
        const response = await fetch("http://127.0.0.1:8000/task/",{
        method:"GET",
        headers:{
            "Accept":"application/json"
        }
        });
         if(response.ok){
            const data = await response.json();
            console.log(data);

            const message = document.createElement("li");
            
            if(data.tasks.length === 0){
                message.textContent = "No tasks added yet!"
                task_list.append(message);
            }else{   
                for(let i = 0; i < data.tasks.length;i++){
                    const task_card = document.createElement("li");
                    const header = document.createElement("h2");
                    const category = document.createElement("p");
                    const completion = document.createElement("p");
                    const view_container = document.createElement("p");
                    const view_link = document.createElement("a");
                    const button = document.createElement("button");

                    task_card.classList.add("task-card");
                    category.classList.add("category");
                    completion.classList.add("status");
                    view_container.classList.add("view-container");
                    view_link.classList.add("view-link");
                    button.classList.add("toggle-completion");

                    header.textContent = data.tasks[i].title;
                    category.textContent = data.tasks[i].category;
                    view_link.textContent = "View";
                    view_link.href = `/task/${data.tasks[i].id}/detail/`;

                    if(data.tasks[i].completed === true){
                        completion.classList.add("completed");
                        completion.textContent = "Completed";
                        button.dataset.taskId = data.tasks[i].id;
                    }else{
                        completion.classList.add("not-completed");
                        completion.textContent = "Not completed";
                        button.dataset.taskId = data.tasks[i].id;
                    }

                    if(data.tasks[i].completed === true){
                        button.textContent = "Mark incomplete";
                    }else{
                        button.textContent = "Mark complete";
                    }

                    view_container.append(view_link);

                    task_card.append(view_container);
                    task_card.append(header);
                    task_card.append(category);
                    task_card.append(completion);
                    task_card.append(button);
                    task_list.append(task_card);
                }
            }
 
        }else{
            throw new Error(response.status);
        }
    } catch (error) {
        const error_message = document.createElement("li");
        error_message.textContent = "Unable to load tasks. Please try again.";
        task_list.append(error_message);
        console.error(error);
    }finally{
        loader.classList.add("hidden");
    }
    
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

task_list.addEventListener("click", async function(event){
    if(event.target.matches(".toggle-completion")){
        const task_id = event.target.dataset.taskId;
        const message = document.createElement("li");

        console.log(task_id)
        let newStatus;
        const check = event.target.textContent;
        if(check === "Mark complete"){
            newStatus = true;
        }else if (check === "Mark incomplete"){
            newStatus = false;
        }

        const params = new URLSearchParams();
        params.append('completed', String(newStatus));
        
        console.log(newStatus);
        try {
            const response = await fetch(`http://127.0.0.1:8000/task/${task_id}/toggle/`,{
            method:"POST",
            body:params,
            headers:{
                "Accept":"application/json",
                "X-CSRFToken": csrftoken, 
            }
            });
            const data = await response.json();
            if(response.status === 200 ){
                console.log(data);
                const taskCard = event.target.closest(".task-card");
                const completion = taskCard.querySelector(".status");

                completion.textContent = data.completed ? "Completed":"Not completed";
                if(data.completed === true){
                    completion.classList.remove("not-completed");
                    completion.classList.add("completed");
                    event.target.textContent = "Mark incomplete"
                }else{
                    completion.classList.remove("completed");
                    completion.classList.add("not-completed");
                    event.target.textContent = "Mark complete"
                }

            }else if (response.status === 400){
                message.textContent = "Form is invalid";
                console.log(data);
                task_list.append(message);
            }else{
                message.textContent = "Unexpected error!!";
                console.error(data);
                task_list.append(message);
            }
        } catch (error) {
            const error_message = document.createElement("li");
            error_message.textContent = "Invalid. Please try again.";
            task_list.append(error_message);
            console.error(error);
        }
    }
})

loadTasks();