const add_task = document.querySelector("#add-task-form");
const message = document.querySelector("#message");
const submitButton = document.querySelector(".submit-btn");
const original = submitButton.textContent;

add_task.addEventListener("submit", async function(event){
    event.preventDefault();
    const form = new FormData(add_task);
    message.textContent = "";
    submitButton.disabled = true;
    submitButton.textContent = "Saving....";
    try {
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
        }else if (response.status === 400){
            message.textContent = "Form is invalid";
            console.log(data);
        }else{
            message.textContent = "Unexpected error!!";
            console.error(data);
        }
            
    } catch (error) {
        message.textContent = "Unable to add tasks. Please try again";
        console.log(error);
    }finally{
        submitButton.disabled = false;
        submitButton.textContent = original;
    }
});