const CreateTaskBtn = document.getElementById("heroButton");
const Dialog = document.getElementById("DialogTask");
const CancelBtn = document.getElementById("cancelBtn")
const AddTaskBtn = document.getElementById("addTask");
var i = 0;


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

AddTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const asignee = document.getElementById("asignee").value;
    let data = [title, description, asignee];
    if (!isValidEmail(asignee)) {
        alert("Please enter a valid email address")
        return;
    }
    localStorage.setItem(i,JSON.stringify(data));
    let test = localStorage.getItem(i);
    i = i + 1;
    console.log(test); 
});

