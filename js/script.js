const CreateTaskBtn = document.getElementById("heroButton");
const Dialog = document.getElementById("DialogTask");
const CancelBtn = document.getElementById("cancelBtn");
const AddTaskBtn = document.getElementById("addTask");
const TaskList = document.getElementById("gridTasks");
let dataList = JSON.parse(localStorage.getItem('data')) || [];

CreateTaskBtn.addEventListener("click", () => {
    Dialog.showModal();
});

CancelBtn.addEventListener("click", () => {
    Dialog.close();
});

function isValidEmail(email){
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
}

function addTask(task){
    let element = document.createElement('div');
    element.classList.add('taskContainer');

    let iconContainer = document.createElement('div');
    iconContainer.classList.add('iconContainer');

    let titleContainer = document.createElement('div');
    titleContainer.classList.add("titleContainer");

    let title = document.createElement('h2');
    title.textContent = task.title;
    title.classList.add('taskTitle');

    let description = document.createElement('p');
    description.textContent = task.description;
    description.classList.add('taskDescription');

    let asignee = document.createElement('p');
    asignee.textContent = "assigned to " + task.asignee;
    asignee.classList.add('taskEmail');

    let trash = document.createElement('i');
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash");

    let check = document.createElement("i");
    check.classList.add("fa-solid");
    check.classList.add("fa-check");

    iconContainer.appendChild(check);
    iconContainer.appendChild(trash);
    titleContainer.appendChild(title);
    titleContainer.appendChild(iconContainer);
    element.appendChild(titleContainer);
    element.appendChild(description);
    element.appendChild(asignee);

    if(task.completed==true){
        check.style.color = "#018749";
        title.style.textDecoration = "line-through";
    }

    TaskList.appendChild(element);
}

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < dataList.length; i++) {
        addTask(dataList[i]);
    }
});

AddTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const asignee = document.getElementById("asignee").value;
    const data = {
        title: title,
        description: description,
        asignee: asignee,
        completed: false
    };
    if (!isValidEmail(asignee)) {
        alert("Please enter a valid email address")
        return;
    }
    dataList.push(data);
    localStorage.setItem("data", JSON.stringify(dataList));
    addTask(data);
});

TaskList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("fa-trash")) {
        const container = target.closest(".taskContainer");
        const taskIndex = Array.from(TaskList.children).indexOf(container);
        dataList.splice(taskIndex, 1);
        localStorage.setItem("data", JSON.stringify(dataList));
        container.remove();
    }
    if(target.classList.contains("fa-check")){
        const container = target.closest(".taskContainer");
        const taskIndex = Array.from(TaskList.children).indexOf(container);
        const check = container.querySelector(".fa-check");
        const title = container.querySelector(".taskTitle");
        if (dataList[taskIndex].completed==true) {
            check.style.color = "#fff7ef"; 
            title.style.textDecoration = "none";
            dataList[taskIndex].completed=false;
          } else {
            check.style.color = "#018749";
            title.style.textDecoration = "line-through";
            dataList[taskIndex].completed=true;
          }
        localStorage.setItem("data", JSON.stringify(dataList));
    }
});
