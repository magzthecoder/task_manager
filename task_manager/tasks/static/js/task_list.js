const task_list = document.querySelector("#task-list");

async function loadTasks(){
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

                    task_card.classList.add("task-card");
                    category.classList.add("category");
                    completion.classList.add("status");
                    view_container.classList.add("view-container");
                    view_link.classList.add("view-link");

                    header.textContent = data.tasks[i].title;
                    category.textContent = data.tasks[i].category;
                    view_link.textContent = "View";
                    view_link.href = `/task/${data.tasks[i].id}/detail/`;

                    if(data.tasks[i].completed === true){
                        completion.classList.add("completed");
                        completion.textContent = "Completed";
                    }else{
                        completion.classList.add("not-completed");
                        completion.textContent = "Not completed"
                    }

                    view_container.append(view_link);

                    task_card.append(view_container);
                    task_card.append(header);
                    task_card.append(category);
                    task_card.append(completion)
                    task_list.append(task_card)
                }
            }
 
        }else{
            throw new Error(response.status);
        }
    } catch (error) {
        const error_message = document.createElement("li");
        error_message.textContent = "Unable to load tasks.Please try again.";
        task_list.append(error_message);
        console.error(error);
    }
    
}

loadTasks();