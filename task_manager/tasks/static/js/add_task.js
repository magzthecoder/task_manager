const add_task = document.querySelector("#add-task-form");
const message = document.querySelector("#message");

add_task.addEventListener("submit", async function(event){
    event.preventDefault();
    const form = new FormData(add_task);
    message.textContent = "";
    const response = await fetch("http://127.0.0.1:8000/task/add/",{
        method:"POST",
        body:form,
        headers:{
            "Accept":"application/json"
        }
    });
    const data = await response.json();
    if(response.status === 201 ){
        message.textContent = "Task Saved";
        console.log(data);
         add_task.reset();
    }else{
        message.textContent = "Form is invalid";
        console.log(data);
    }
});