const createTaskBtn = document.getElementById("heroButton");
const dialog = document.getElementById("DialogTask");
const helpDialog = document.getElementById("helpDialog");
const cancelBtn = document.getElementById("cancelBtn");
const addTaskBtn = document.getElementById("addTask");
const helpBtn = document.getElementById("helpBtn");
const exitHelpBtn = document.getElementById("exitHelp");
const taskList = document.getElementById("gridTasks");
const checkBox = document.getElementById("checkBox");
let dataList = JSON.parse(localStorage.getItem("data")) || [];
let editFlag = false;
let currentEditContainer = null;

createTaskBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const asignee = document.getElementById("asignee");
  document.getElementById("dialogForm").reset();
});

function isValidEmail(email) {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/;
  return pattern.test(email);
}

function addTask(task) {
  let element = document.createElement("div");
  element.classList.add("taskContainer");

  let iconContainer = document.createElement("div");
  iconContainer.classList.add("iconContainer");

  let titleContainer = document.createElement("div");
  titleContainer.classList.add("titleContainer");

  let title = document.createElement("h2");
  title.textContent = task.title;
  title.classList.add("taskTitle");

  let description = document.createElement("p");
  description.textContent = task.description;
  description.classList.add("taskDescription");

  let asignee = document.createElement("p");
  asignee.textContent = "assigned to " + task.asignee;
  asignee.classList.add("taskEmail");

  let trash = document.createElement("i");
  trash.classList.add("fa-solid");
  trash.classList.add("fa-trash");

  let check = document.createElement("i");
  check.classList.add("fa-solid");
  check.classList.add("fa-check");

  let edit = document.createElement("i");
  edit.classList.add("fa-solid");
  edit.classList.add("fa-file-pen");

  iconContainer.appendChild(check);
  iconContainer.appendChild(edit);
  iconContainer.appendChild(trash);
  titleContainer.appendChild(title);
  titleContainer.appendChild(iconContainer);
  element.appendChild(titleContainer);
  element.appendChild(description);
  element.appendChild(asignee);

  if (task.completed == true) {
    check.style.color = "#018749";
    title.style.textDecoration = "line-through";
  }

  taskList.appendChild(element);
}

document.addEventListener("DOMContentLoaded", () => {
  dataList.forEach(addTask);
});

addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const asignee = document.getElementById("asignee").value;
  const data = {
    title: title,
    description: description,
    asignee: asignee,
    completed: false,
  };

  if (editFlag === false) {
    if (!isValidEmail(asignee)) {
      alert("Please enter a valid email address");
      return;
    }
    dataList.push(data);
    localStorage.setItem("data", JSON.stringify(dataList));
    addTask(data);
  } else {
    let taskIndex = Array.from(taskList.children).indexOf(currentEditContainer);
    let editTitle = currentEditContainer.querySelector(".taskTitle");
    let editDescription = currentEditContainer.querySelector(".taskDescription");
    let editAsignee = currentEditContainer.querySelector(".taskEmail");
    if (title) {
      editTitle.textContent = title;
      dataList[taskIndex].title = title;
    }
    if (description) {
      editDescription.textContent = description;
      dataList[taskIndex].description = description;
    }
    if (asignee) {
      if (!isValidEmail(asignee)) {
        alert("Please enter a valid email address");
        return;
      }
      editAsignee.textContent = asignee;
      dataList[taskIndex].asignee = asignee;
    }
    localStorage.setItem("data", JSON.stringify(dataList));
    editFlag = false;
    addTaskBtn.innerHTML = "Add Task";
  }
  dialog.close();
  document.getElementById("dialogForm").reset();
});

taskList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("fa-trash")) {
    const container = target.closest(".taskContainer");
    const taskIndex = Array.from(taskList.children).indexOf(container);
    dataList.splice(taskIndex, 1);
    localStorage.setItem("data", JSON.stringify(dataList));
    container.remove();
  }
  if (target.classList.contains("fa-check")) {
    const container = target.closest(".taskContainer");
    const taskIndex = Array.from(taskList.children).indexOf(container);
    const check = container.querySelector(".fa-check");
    const title = container.querySelector(".taskTitle");
    if (dataList[taskIndex].completed == true) {
      check.style.color = "#fff7ef";
      title.style.textDecoration = "none";
      dataList[taskIndex].completed = false;
    } else {
      check.style.color = "#018749";
      title.style.textDecoration = "line-through";
      dataList[taskIndex].completed = true;
    }
    localStorage.setItem("data", JSON.stringify(dataList));
  }
  if (target.classList.contains("fa-file-pen")) {
    const container = target.closest(".taskContainer");
    currentEditContainer = container;
    addTaskBtn.innerHTML = "Edit Task";
    editFlag = true;
    dialog.showModal();
  }
});

checkBox.addEventListener("change", (event) => {
  taskList.innerHTML = "";
  for (let i = 0; i < dataList.length; i++) {
    if (event.target.checked) {
      addTask(dataList[i]);
    } else {
      if (dataList[i].completed == false) addTask(dataList[i]);
    }
  }
});

helpBtn.addEventListener("click", (event) => {
  helpDialog.showModal();
});

exitHelpBtn.addEventListener("click", (event) => {
  helpDialog.close();
});
