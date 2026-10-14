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

            for(let i = 0; i < data.tasks.length;i++){
                const task_card = document.createElement("li");
                const header = document.createElement("h2");
                const category = document.createElement("p");
                const completion = document.createElement("p");

                task_card.classList.add("task-card");
                category.classList.add("category");
                completion.classList.add("status");

                header.textContent = data.tasks[i].title;
                category.textContent = data.tasks[i].category;
                
                if(data.tasks[i].completed === true){
                    completion.classList.add("completed");
                    completion.textContent = "Completed";
                }else{
                    completion.classList.add("not-completed");
                    completion.textContent = "Not completed"
                }

                task_card.append(header);
                task_card.append(category);
                task_card.append(completion)
                task_list.append(task_card)
            }
            
        }else{
            throw new Error(response.status);
        }
    } catch (error) {
        console.error(error);
    }
    
}

loadTasks();